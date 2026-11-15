// Writes the scoped tsconfigs a check runs tsc on, each extending the root one
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface RootTsconfig {
  include?: unknown;
  compilerOptions?: { paths?: unknown };
}

/** The root tsconfig. It is JSONC, so comments and trailing commas go first. */
function readRoot(root: string): RootTsconfig {
  const text = readFileSync(join(root, 'tsconfig.json'), 'utf8')
    .replace(/("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (match, str: string | undefined) => str ?? '')
    .replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(text) as RootTsconfig;
}

/** The root tsconfig's `include`. */
export function rootInclude(root: string): string[] {
  const { include } = readRoot(root);
  if (!Array.isArray(include) || !include.every((e) => typeof e === 'string')) {
    throw new Error('tsconfig.json has no include list to scope');
  }
  return include;
}

/** The root tsconfig's `compilerOptions.paths`, or none. */
export function rootPaths(root: string): Record<string, string[]> {
  const paths = readRoot(root).compilerOptions?.paths;
  return paths && typeof paths === 'object' ? (paths as Record<string, string[]>) : {};
}

/**
 * Writes `node_modules/.cache/showcases-check/<name>.json`, a tsconfig that extends the
 * root one and checks only `include` (absolute paths, as the file sits outside the tree).
 * Compiler options, `paths` and the docs exclude all come from the root, so a scoped run
 * is the full check's rules over fewer files. Returns the file's path.
 */
export function writeScopedTsconfig(root: string, name: string, include: readonly string[]): string {
  const dir = join(root, 'node_modules', '.cache', 'showcases-check');
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${name}.json`);
  const config = { extends: join(root, 'tsconfig.json'), include: include.map((entry) => join(root, entry)) };
  writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`);
  return file;
}

/**
 * What a package's scoped check includes: the package, plus the app shell's ambient
 * declarations (`src/**\/*.d.ts`, such as the Prism module stubs), which reach every
 * file in the full program without an import.
 */
export function packageInclude(slug: string): string[] {
  return [`packages/${slug}`, 'src/**/*.d.ts'];
}
