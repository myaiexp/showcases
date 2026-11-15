// Runs check steps as child processes, the heavy ones one worktree at a time
import { spawnSync } from 'node:child_process';
import { accessSync, constants } from 'node:fs';
import { delimiter, join } from 'node:path';

export interface StepResult {
  label: string;
  ok: boolean;
  seconds: number;
}

export interface StepOptions {
  env?: Record<string, string>;
  /** A lock file every worktree of the repo shares; the step waits for it when set. */
  lock?: string | null;
}

/** Seconds a heavy step waits for another worktree's before giving up. */
const LOCK_WAIT_SECONDS = 3600;
/** flock's exit status when the wait ran out (-E), distinct from the command's own. */
const LOCK_TIMEOUT_STATUS = 75;

/** True when an executable `name` is on PATH. */
export function onPath(name: string): boolean {
  for (const dir of (process.env['PATH'] ?? '').split(delimiter)) {
    if (!dir) continue;
    try {
      accessSync(join(dir, name), constants.X_OK);
      return true;
    } catch {
      // Not in this PATH entry: a probe, the next one may have it.
    }
  }
  return false;
}

/**
 * The lock file shared by every worktree of this repo: it lives in the git common dir,
 * which all linked worktrees point at. Null outside git or where `flock` is missing,
 * and the caller then runs unlocked.
 */
export function sharedLock(root: string): string | null {
  if (!onPath('flock')) return null;
  const res = spawnSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], { cwd: root, encoding: 'utf8' });
  const dir = res.status === 0 ? res.stdout.trim() : '';
  return dir ? join(dir, 'showcases-check.lock') : null;
}

/** Runs `cmd args` with inherited output and reports how it went. */
export function step(label: string, cmd: string, args: readonly string[], opts: StepOptions = {}): StepResult {
  const env = { ...process.env, ...opts.env };
  const started = performance.now();
  let argv: [string, string[]] = [cmd, [...args]];
  if (opts.lock) {
    const free = spawnSync('flock', ['-n', opts.lock, 'true']).status === 0;
    if (!free) console.log(`\n… ${label}: waiting for another worktree's heavy check (${opts.lock})`);
    argv = ['flock', ['-w', String(LOCK_WAIT_SECONDS), '-E', String(LOCK_TIMEOUT_STATUS), opts.lock, cmd, ...args]];
  }
  console.log(`\n▶ ${label}`);
  const res = spawnSync(argv[0], argv[1], { stdio: 'inherit', env });
  const seconds = (performance.now() - started) / 1000;
  if (res.error) console.error(`${label}: could not start ${argv[0]}: ${res.error.message}`);
  if (opts.lock && res.status === LOCK_TIMEOUT_STATUS) {
    console.error(`${label}: gave up after ${LOCK_WAIT_SECONDS}s waiting for ${opts.lock}`);
  }
  return { label, ok: res.status === 0, seconds };
}

/** Repo-relative paths changed on this branch since it left master: commits, edits, new files. */
export function changedPaths(root: string): string[] {
  const git = (...args: string[]): string | null => {
    const res = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    return res.status === 0 ? res.stdout : null;
  };
  const base = ['master', 'origin/master'].map((ref) => git('merge-base', 'HEAD', ref)?.trim()).find(Boolean);
  if (!base) throw new Error('no master branch to compare with: name the packages, e.g. pnpm check:pkg vizzu');
  const diff = git('diff', '--name-only', '--no-renames', base) ?? '';
  const untracked = git('ls-files', '--others', '--exclude-standard') ?? '';
  return [...new Set(`${diff}\n${untracked}`.split('\n').filter(Boolean))];
}
