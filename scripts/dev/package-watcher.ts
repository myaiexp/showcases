// Dev server plugin: watches packages/ per directory, skipping vendored docs
import { watch, readdirSync, statSync, type FSWatcher } from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

/**
 * Why this exists: chokidar (Vite's watcher) takes one inotify watch per file AND per
 * directory, about 42k for this repo, and inotify watches are a per-user budget on the
 * VPS (fs.inotify.max_user_watches, ~124k). Three builders' dev servers used it up, after
 * which chokidar stops watching new paths and the server keeps serving the old version
 * of an edited file. On Linux a watch on a directory already reports changes to the files
 * in it, so this watches directories only (~11k) and leaves packages/ out of chokidar.
 *
 * Vendored docs (packages/<pkg>/docs) are not watched at all: they change only when
 * re-vendored, which needs a dev server restart to show.
 *
 * Events go out through `server.watcher.emit`, the same events chokidar emits and the ones
 * Vite's HMR and import.meta.glob invalidation listen to.
 */

/** Rapid inotify events for one path (a write is often several) collapse into one. */
const DEBOUNCE_MS = 50;
const SKIP_NAMES = new Set(['node_modules', '.git']);

type Event = 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir';

export function packageWatcher(): Plugin {
  let stop = () => {};
  return {
    name: 'package-watcher',
    apply: 'serve',
    config(config) {
      const dir = path.resolve(config.root ?? process.cwd(), 'packages');
      const inside = (p: string) => p === dir || p.startsWith(dir + path.sep);
      return { server: { watch: { ignored: [inside] } } };
    },
    configureServer(server) {
      // vitest runs without a watcher (server.watch: null); so does any server that opts out.
      if (server.config.server.watch === null) return;
      const limit = limitReporter(server);
      // Chokidar's own ENOSPC, for paths outside packages/, gets the same warning.
      server.watcher.on('error', (error) => {
        if ((error as NodeJS.ErrnoException).code === 'ENOSPC') limit(new Set());
      });
      stop = watchPackages(server, limit);
    },
    closeBundle() {
      stop();
    },
  };
}

function watchPackages(server: ViteDevServer, limit: (unwatched: Set<string>) => void): () => void {
  const pkgRoot = path.join(server.config.root, 'packages');
  const dirs = new Map<string, FSWatcher>();
  /** Known files, with the mtime last reported (undefined until the first change). */
  const files = new Map<string, number | undefined>();
  const pending = new Map<string, NodeJS.Timeout>();
  const unwatched = new Set<string>();
  let closed = false;

  const emit = (event: Event, file: string) => {
    server.watcher.emit(event, file);
    server.watcher.emit('all', event, file);
  };

  const skip = (dir: string) => {
    if (SKIP_NAMES.has(path.basename(dir))) return true;
    const rel = path.relative(pkgRoot, dir).split(path.sep);
    return rel.length === 2 && rel[1] === 'docs';
  };

  const failed = (dir: string, error: NodeJS.ErrnoException) => {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return;
    unwatched.add(dir);
    if (error.code === 'ENOSPC') limit(unwatched);
    else server.config.logger.error(`package-watcher: cannot watch ${dir}: ${error.message}`);
  };

  const addDir = (dir: string, announce: boolean) => {
    if (closed || dirs.has(dir) || skip(dir)) return;
    let watcher: FSWatcher;
    try {
      // Watch before listing, so a file created in between is listed or reported.
      watcher = watch(dir, (_type, name) => name && queue(path.join(dir, name.toString())));
    } catch (error) {
      failed(dir, error as NodeJS.ErrnoException);
      return;
    }
    watcher.on('error', (error) => failed(dir, error as NodeJS.ErrnoException));
    dirs.set(dir, watcher);
    unwatched.delete(dir);
    if (announce) emit('addDir', dir);
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch (error) {
      failed(dir, error as NodeJS.ErrnoException);
      return;
    }
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) addDir(p, announce);
      else if (entry.isFile() && !files.has(p)) {
        files.set(p, undefined);
        if (announce) emit('add', p);
      }
    }
  };

  const removeDir = (dir: string) => {
    const prefix = dir + path.sep;
    for (const file of [...files.keys()]) {
      if (!file.startsWith(prefix)) continue;
      files.delete(file);
      emit('unlink', file);
    }
    for (const [d, watcher] of [...dirs]) {
      if (d !== dir && !d.startsWith(prefix)) continue;
      watcher.close();
      dirs.delete(d);
      emit('unlinkDir', d);
    }
  };

  const settle = (p: string) => {
    pending.delete(p);
    if (closed) return;
    let stats;
    try {
      stats = statSync(p);
    } catch {
      if (dirs.has(p)) removeDir(p);
      else if (files.delete(p)) emit('unlink', p);
      return;
    }
    if (stats.isDirectory()) {
      if (files.delete(p)) emit('unlink', p);
      addDir(p, true);
    } else if (stats.isFile()) {
      if (dirs.has(p)) removeDir(p);
      if (!files.has(p)) {
        files.set(p, stats.mtimeMs);
        emit('add', p);
      } else if (files.get(p) !== stats.mtimeMs) {
        files.set(p, stats.mtimeMs);
        emit('change', p);
      }
    }
  };

  const queue = (p: string) => {
    clearTimeout(pending.get(p));
    pending.set(p, setTimeout(settle, DEBOUNCE_MS, p));
  };

  addDir(pkgRoot, false);
  return () => {
    closed = true;
    for (const timer of pending.values()) clearTimeout(timer);
    for (const watcher of dirs.values()) watcher.close();
    pending.clear();
    dirs.clear();
  };
}

/**
 * Out of inotify watches, some edits are never seen and the old file keeps being served.
 * Say so once in the terminal and as Vite's error overlay in the browser, where a builder
 * checking a page will see it.
 */
function limitReporter(server: ViteDevServer): (unwatched: Set<string>) => void {
  let reported = false;
  return (unwatched) => {
    if (reported) return;
    reported = true;
    const message =
      'File watch limit reached (ENOSPC, fs.inotify.max_user_watches). Some files are not ' +
      'watched, so edits to them are NOT reloaded and the old version keeps being served. ' +
      'Stop dev servers you no longer need, then restart this one.';
    // Let the rest of this pass's failures land in `unwatched` before counting them.
    setTimeout(() => {
      const count = unwatched.size ? ` (${unwatched.size} folders under packages/ unwatched)` : '';
      server.config.logger.error(`\n${message}${count}\n`);
      const send = () => server.ws.send({ type: 'error', err: { message, stack: '' } });
      send();
      server.ws.on('connection', send);
    }, 0);
  };
}
