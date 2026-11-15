// Scope rules for the scoped check: which packages, the core, or the full check
import { describe, expect, it } from 'vitest';
import { coreRootsOf, packageTestFiles, scopeOf, sharedRootsOf } from './scope.ts';

const PACKAGES = ['echarts', 'mermaid', 'three', 'three-js', 'vizzu'];
const CORE = ['src', 'scripts', 'test', 'vite.config.ts'];

describe('scopeOf', () => {
  it('maps package files, docs included, to their package', () => {
    const scope = scopeOf(
      ['packages/vizzu/examples/a/main.ts', 'packages/vizzu/docs/MANIFEST.json', 'packages/mermaid/package.ts'],
      PACKAGES,
      CORE,
    );
    expect(scope).toEqual({ packages: ['mermaid', 'vizzu'], core: false, full: false });
  });

  it('marks the core for any core root, file or directory', () => {
    expect(scopeOf(['src/router.ts'], PACKAGES, CORE).core).toBe(true);
    expect(scopeOf(['vite.config.ts'], PACKAGES, CORE).core).toBe(true);
    expect(scopeOf(['test/tree.ts'], PACKAGES, CORE).core).toBe(true);
    expect(scopeOf(['srcfoo/x.ts'], PACKAGES, CORE).core).toBe(false);
  });

  it('needs the whole-repo tsc when a root the packages import from changes', () => {
    expect(scopeOf(['src/types.ts'], PACKAGES, CORE, ['src'])).toEqual({ packages: [], core: true, full: true });
    expect(scopeOf(['scripts/new-example.ts'], PACKAGES, CORE, ['src']).full).toBe(false);
  });

  it('needs the full check when the root tsconfig changes', () => {
    expect(scopeOf(['tsconfig.json'], PACKAGES, CORE)).toEqual({ packages: [], core: false, full: true });
  });

  it('ignores paths no type-check reads', () => {
    expect(scopeOf(['CLAUDE.md', 'package.json', 'pnpm-lock.yaml', 'docs/pattern.md'], PACKAGES, CORE)).toEqual({
      packages: [],
      core: false,
      full: false,
    });
  });

  it('skips a package that no longer exists', () => {
    expect(scopeOf(['packages/gone/package.ts'], PACKAGES, CORE).packages).toEqual([]);
  });
});

describe('packageTestFiles', () => {
  const files = ['test/mermaid-definitions.test.ts', 'test/three-js-x.test.ts', 'test/three-y.test.ts', 'test/integrity.test.ts'];

  it('picks the files named after a package in scope', () => {
    expect(packageTestFiles(files, ['mermaid'], PACKAGES)).toEqual(['test/mermaid-definitions.test.ts']);
  });

  it('gives a file to the longest matching slug', () => {
    expect(packageTestFiles(files, ['three'], PACKAGES)).toEqual(['test/three-y.test.ts']);
    expect(packageTestFiles(files, ['three-js'], PACKAGES)).toEqual(['test/three-js-x.test.ts']);
  });
});

describe('sharedRootsOf', () => {
  it('takes the first directory of every paths target outside packages and node_modules', () => {
    const paths = { '@/*': ['./src/*'], vizzu: ['./packages/vizzu/shared/vizzu-types.d.ts'], x: ['node_modules/x'] };
    expect(sharedRootsOf(paths)).toEqual(['src']);
  });
});

describe('coreRootsOf', () => {
  it('drops packages and trailing slashes', () => {
    expect(coreRootsOf(['src/', 'packages', 'scripts', 'vite.config.ts'])).toEqual(['src', 'scripts', 'vite.config.ts']);
  });
});
