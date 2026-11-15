// Works out what a scoped check covers from a list of changed paths (pure, no I/O)

/** What `pnpm check:pkg` type-checks and tests. */
export interface Scope {
  /** Package slugs whose own files changed. */
  packages: string[];
  /** The app shell and tooling (every root tsconfig include except `packages`) changed. */
  core: boolean;
  /**
   * A change that can break files in any package (the root tsconfig, or the app shell the
   * packages import through `paths`): only the whole-repo tsc covers it.
   */
  full: boolean;
}

/** Root files whose change can alter how every file type-checks. */
const EVERYWHERE = new Set(['tsconfig.json']);

/**
 * The scope a set of changed repo-relative paths needs. `coreRoots` are the root tsconfig's
 * include entries other than `packages` (src, scripts, test, vite.config.ts), so a new
 * top-level entry there is covered without editing this file. Paths outside every root
 * (docs, package.json, the lockfile, workflows) are not type-checked here: CI and deploy's
 * whole-repo gate see them. `sharedRoots` are the roots packages import from
 * (`sharedRootsOf`); a change there needs the whole-repo tsc.
 */
export function scopeOf(
  paths: readonly string[],
  packages: readonly string[],
  coreRoots: readonly string[],
  sharedRoots: readonly string[] = [],
): Scope {
  const known = new Set(packages);
  const touched = new Set<string>();
  let core = false;
  let full = false;
  for (const raw of paths) {
    const path = raw.replace(/\\/g, '/').replace(/^\.\//, '');
    if (EVERYWHERE.has(path)) full = true;
    const pkg = /^packages\/([^/]+)\//.exec(path)?.[1];
    if (pkg !== undefined) {
      // A deleted package has no files left to check; the integrity test sees the rest.
      if (known.has(pkg)) touched.add(pkg);
      continue;
    }
    const under = (root: string): boolean => path === root || path.startsWith(`${root}/`);
    if (coreRoots.some(under)) core = true;
    // Every package imports the shell (`@/types.ts`): a change there can break any of them.
    if (sharedRoots.some(under)) full = true;
  }
  return { packages: [...touched].sort(), core, full };
}

/**
 * The test files that belong to the given packages: `test/<pkg>-*.test.ts`. A file belongs
 * to the longest slug it starts with, so `three-js-x.test.ts` is three-js's even when a
 * package named `three` exists.
 */
export function packageTestFiles(testFiles: readonly string[], inScope: readonly string[], packages: readonly string[]): string[] {
  const bySlugLength = [...packages].sort((a, b) => b.length - a.length);
  const wanted = new Set(inScope);
  return testFiles.filter((file) => {
    const name = file.slice(file.lastIndexOf('/') + 1);
    const owner = bySlugLength.find((slug) => name.startsWith(`${slug}-`));
    return owner !== undefined && wanted.has(owner);
  });
}

/** The root tsconfig's include entries other than `packages`: what the core check covers. */
export function coreRootsOf(include: readonly string[]): string[] {
  return include.map((entry) => entry.replace(/\/+$/, '')).filter((entry) => entry !== 'packages');
}

/**
 * The top-level directories the root tsconfig's `paths` point into, other than packages
 * and node_modules: the code every package imports through an alias (`@/*` → `src`).
 */
export function sharedRootsOf(paths: Readonly<Record<string, readonly string[]>>): string[] {
  const roots = Object.values(paths)
    .flat()
    .map((target) => target.replace(/^\.\//, '').split('/')[0] ?? '')
    .filter((root) => root && root !== 'packages' && root !== 'node_modules' && !root.includes('*'));
  return [...new Set(roots)].sort();
}
