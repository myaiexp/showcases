// Scoped per-package check, or the full check run one worktree at a time
// Usage: pnpm check:pkg [<pkg>...]   (no packages: the scope this branch's changes need)
//        pnpm check                  (whole repo: types, every test, the build)
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { changedPaths, onPath, sharedLock, step, type StepResult } from './check/run.ts';
import { coreRootsOf, packageTestFiles, scopeOf, sharedRootsOf, type Scope } from './check/scope.ts';
import { packageInclude, rootInclude, rootPaths, writeScopedTsconfig } from './check/tsconfig.ts';

const ROOT = join(import.meta.dirname, '..');
const BIN = join(ROOT, 'node_modules', '.bin');
const tsc = join(BIN, 'tsc');
const vitest = join(BIN, 'vitest');

/** Every directory under packages/, as the integrity test sees them (test/tree.ts). */
const packageSlugs = (): string[] =>
  readdirSync(join(ROOT, 'packages'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

/** Changed paths no step here reads: dependencies reach their importers only in the full check. */
const DEPENDENCY_FILES = new Set(['package.json', 'pnpm-lock.yaml']);

const testFiles = (): string[] =>
  readdirSync(join(ROOT, 'test'))
    .filter((f) => f.endsWith('.test.ts'))
    .map((f) => `test/${f}`);

/**
 * The whole-repo type-check. It peaks around 4 GB, so it goes through helm's build-lock
 * where that exists (it runs it on another machine, or here one at a time); elsewhere it
 * waits for the repo-wide lock like every other heavy step.
 */
function fullTypeCheck(lock: string | null): StepResult {
  if (onPath('build-lock')) return step('types: whole repo (build-lock)', 'build-lock', ['tsc', '--noEmit']);
  return step('types: whole repo', tsc, ['--noEmit'], { lock });
}

function fullCheck(lock: string | null): StepResult[] {
  return [
    fullTypeCheck(lock),
    step('tests: every test', vitest, ['run'], { lock }),
    // vite build peaks near 6 GB: never two at once on one machine.
    step('build', join(BIN, 'vite'), ['build'], { lock }),
  ];
}

function scopedCheck(scope: Scope, lock: string | null): StepResult[] {
  const results: StepResult[] = [];
  const all = packageSlugs();
  if (scope.full) {
    results.push(fullTypeCheck(lock));
  } else {
    for (const slug of scope.packages) {
      const config = writeScopedTsconfig(ROOT, slug, packageInclude(slug));
      results.push(step(`types: ${slug}`, tsc, ['--noEmit', '-p', config]));
    }
    if (scope.core) {
      const config = writeScopedTsconfig(ROOT, 'core', coreRootsOf(rootInclude(ROOT)));
      results.push(step('types: app shell and tooling', tsc, ['--noEmit', '-p', config]));
    }
  }
  if (scope.core || scope.full) {
    // A change to the shell, the tests or the tsconfig can break any package's integrity check.
    results.push(step('tests: every test', vitest, ['run'], { lock }));
  } else if (scope.packages.length > 0) {
    const files = ['test/integrity.test.ts', ...packageTestFiles(testFiles(), scope.packages, all)];
    results.push(
      step(`tests: ${scope.packages.join(', ')}`, vitest, ['run', ...files], {
        env: { SHOWCASES_PACKAGES: scope.packages.join(',') },
      }),
    );
  }
  return results;
}

function scopeFromArgs(args: readonly string[], notes: string[]): Scope {
  const all = packageSlugs();
  if (args.length > 0) {
    const unknown = args.filter((slug) => !all.includes(slug));
    if (unknown.length > 0) throw new Error(`no such package: ${unknown.join(', ')} (no packages/<slug>/)`);
    return { packages: [...new Set(args)].sort(), core: false, full: false };
  }
  const paths = changedPaths(ROOT);
  // An empty diff is master itself or an already-landed branch: passing would check nothing.
  if (paths.length === 0) throw new Error('nothing changed since master: name the packages, e.g. pnpm check:pkg vizzu');
  const scope = scopeOf(paths, all, coreRootsOf(rootInclude(ROOT)), sharedRootsOf(rootPaths(ROOT)));
  console.log(`Scope from ${paths.length} changed path(s) since master: ${describe(scope)}`);
  if (paths.some((p) => DEPENDENCY_FILES.has(p))) {
    notes.push('Dependencies changed: only the whole-repo check (pnpm check, CI, deploy) sees every importer.');
  }
  return scope;
}

const describe = (scope: Scope): string =>
  [
    scope.full ? 'whole-repo types and every test (tsconfig or app shell changed)' : '',
    scope.packages.length > 0 ? `packages ${scope.packages.join(', ')}` : '',
    scope.core ? 'app shell and tooling' : '',
  ]
    .filter(Boolean)
    .join(' + ') || 'nothing to check';

function main(): void {
  // Every step, build-lock's tsc included, reads the tsconfig and node_modules of the root.
  process.chdir(ROOT);
  const args = process.argv.slice(2);
  const lock = sharedLock(ROOT);
  if (!lock) console.log('No flock or git here: heavy steps run without the cross-worktree lock.');
  const full = args.includes('--all');
  if (full && args.length > 1) throw new Error('--all checks the whole repo and takes no packages');
  const notes: string[] = [];
  const results = full ? fullCheck(lock) : scopedCheck(scopeFromArgs(args, notes), lock);

  console.log('\nCheck summary:');
  for (const r of results) console.log(`  ${r.ok ? 'ok  ' : 'FAIL'}  ${r.label} (${r.seconds.toFixed(1)}s)`);
  if (!full) notes.push('The build is not part of a scoped check: pnpm check and CI run it.');
  for (const note of notes) console.log(`  ${note}`);
  if (results.some((r) => !r.ok)) process.exit(1);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(2);
}
