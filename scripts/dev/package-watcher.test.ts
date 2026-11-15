// Dev server file watching: packages/ costs one watch per directory and skips vendored docs
import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const CONFIG = fileURLToPath(new URL('../../vite.config.ts', import.meta.url));

type Ev = { event: string; file: string };

let root: string;
let server: ViteDevServer;
let events: Ev[];

function write(rel: string, text: string): string {
  const file = path.join(root, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, text);
  return file;
}

/** Resolves once an event matching `want` has been seen, or rejects after `ms`. */
async function seen(want: Ev, ms = 3000): Promise<void> {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    if (events.some((e) => e.event === want.event && e.file === want.file)) return;
    await new Promise((r) => setTimeout(r, 20));
  }
  throw new Error(`no ${want.event} for ${want.file}; saw ${JSON.stringify(events)}`);
}

const settle = () => new Promise((r) => setTimeout(r, 400));

beforeEach(async () => {
  root = mkdtempSync(path.join(tmpdir(), 'showcases-watch-'));
  write('index.html', '<!doctype html>');
  write('packages/p/package.ts', 'export default {};');
  write('packages/p/shared/stage.ts', 'export const a = 1;');
  write('packages/p/examples/one/main.ts', 'export default () => () => {};');
  write('packages/p/examples/one/meta.ts', 'export default {};');
  write('packages/p/docs/repo/guide.md', '# guide');
  write('packages/p/docs/MANIFEST.json', '{}');
  server = await createServer({
    configFile: CONFIG,
    root,
    logLevel: 'silent',
    server: { watch: {} },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  events = [];
  server.watcher.on('all', (event: string, file: string) => events.push({ event, file }));
  await settle();
});

afterEach(async () => {
  await server.close();
  rmSync(root, { recursive: true, force: true });
});

describe('dev server watching under packages/', () => {
  it('leaves packages/ out of chokidar, which watches every file on its own', () => {
    const watched = Object.keys(server.watcher.getWatched());
    expect(watched.filter((dir) => dir.startsWith(path.join(root, 'packages')))).toEqual([]);
  });

  it('reports an edit to an example file once, as a change', async () => {
    const file = write('packages/p/examples/one/main.ts', 'export default () => () => { /* edited */ };');
    await seen({ event: 'change', file });
    await settle();
    expect(events.filter((e) => e.file === file)).toEqual([{ event: 'change', file }]);
  });

  it('reports an atomic save (write elsewhere, rename over) as a change', async () => {
    const file = path.join(root, 'packages/p/examples/one/meta.ts');
    const tmp = write('packages/p/examples/one/.meta.ts.tmp', 'export default { edited: true };');
    renameSync(tmp, file);
    await seen({ event: 'change', file });
    expect(events.some((e) => e.file === file && e.event !== 'change')).toBe(false);
  });

  it('reports files in a new example folder and in a new package as adds', async () => {
    const example = write('packages/p/examples/two/main.ts', 'export default () => () => {};');
    const pkg = write('packages/q/examples/first/meta.ts', 'export default {};');
    await seen({ event: 'add', file: example });
    await seen({ event: 'add', file: pkg });
  });

  it('reports deleted files and every file of a deleted folder as unlinks', async () => {
    const shared = path.join(root, 'packages/p/shared/stage.ts');
    rmSync(shared);
    await seen({ event: 'unlink', file: shared });
    rmSync(path.join(root, 'packages/p/examples/one'), { recursive: true });
    await seen({ event: 'unlink', file: path.join(root, 'packages/p/examples/one/main.ts') });
    await seen({ event: 'unlink', file: path.join(root, 'packages/p/examples/one/meta.ts') });
  });

  it('ignores vendored docs', async () => {
    write('packages/p/docs/repo/guide.md', '# edited');
    write('packages/p/docs/repo/new/page.md', '# new');
    write('packages/p/docs/MANIFEST.json', '{"edited":true}');
    await settle();
    expect(events.filter((e) => e.file.includes(`${path.sep}docs${path.sep}`))).toEqual([]);
  });
});
