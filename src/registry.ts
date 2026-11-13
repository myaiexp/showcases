// Discovers packages and examples from the packages/ tree (no hand-kept list)
import type { ComparisonDef, DocsManifest, ExampleMeta, Mount, PackageDef } from './types.ts';

export interface PackageEntry extends PackageDef {
  slug: string;
  exampleCount: number;
}

export interface ExampleEntry extends ExampleMeta {
  pkg: string;
  slug: string;
}

export interface SourceFile {
  name: string;
  code: string;
}

// Globs must be literal for Vite. Paths are absolute from the project root.
const packageModules = import.meta.glob<PackageDef>('/packages/*/package.ts', {
  eager: true,
  import: 'default',
});
// Lazy: home only needs the keys (counts); vite.config groups each package's metas
// into one chunk so opening a package is one request.
const metaLoaders = import.meta.glob<ExampleMeta>('/packages/*/examples/*/meta.ts', {
  import: 'default',
});
const mountLoaders = import.meta.glob<Mount>('/packages/*/examples/*/main.ts', {
  import: 'default',
});
const sourceLoaders = import.meta.glob<string>(
  ['/packages/*/examples/*/*.ts', '/packages/*/examples/*/*.css'],
  { query: '?raw', import: 'default' },
);

/** `/packages/<pkg>/…` → `<pkg>`; `/packages/<pkg>/examples/<ex>/…` → `[pkg, ex]`. */
export function slugsOf(path: string): { pkg: string; example: string | undefined } {
  const parts = path.split('/');
  const pkg = parts[2] ?? '';
  return { pkg, example: parts[3] === 'examples' ? parts[4] : undefined };
}

function countExamples(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const path of Object.keys(metaLoaders)) {
    const { pkg } = slugsOf(path);
    counts.set(pkg, (counts.get(pkg) ?? 0) + 1);
  }
  return counts;
}

const counts = countExamples();

export const packages: readonly PackageEntry[] = Object.entries(packageModules).map(
  ([path, def]) => {
    const slug = slugsOf(path).pkg;
    return { ...def, slug, exampleCount: counts.get(slug) ?? 0 };
  },
);

export function findPackage(slug: string): PackageEntry | undefined {
  return packages.find((p) => p.slug === slug);
}

/** Loads every example's metadata for one package, ordered by docs section, then title. */
export async function loadExamples(pkg: PackageEntry): Promise<ExampleEntry[]> {
  const prefix = `/packages/${pkg.slug}/examples/`;
  const entries = await Promise.all(
    Object.entries(metaLoaders)
      .filter(([path]) => path.startsWith(prefix))
      .map(async ([path, load]) => {
        const meta = await load();
        return { ...meta, pkg: pkg.slug, slug: slugsOf(path).example ?? '' };
      }),
  );
  const order = (section: string): number => {
    const i = pkg.sections.indexOf(section);
    return i === -1 ? pkg.sections.length : i;
  };
  return entries.sort(
    (a, b) => order(a.section) - order(b.section) || a.title.localeCompare(b.title),
  );
}

export function loadMount(pkg: string, example: string): Promise<Mount> {
  const load = mountLoaders[`/packages/${pkg}/examples/${example}/main.ts`];
  if (!load) return Promise.reject(new Error(`No example ${pkg}/${example}`));
  return load();
}

const manifestLoaders = import.meta.glob<DocsManifest>('/packages/*/docs/MANIFEST.json', {
  import: 'default',
});
const comparisonLoaders = import.meta.glob<ComparisonDef>('/packages/*/comparisons/*.ts', {
  import: 'default',
});

/** The package's vendored-docs manifest, or an empty one if docs are not vendored yet. */
export async function loadManifest(pkg: string): Promise<DocsManifest> {
  const load = manifestLoaders[`/packages/${pkg}/docs/MANIFEST.json`];
  return load ? load() : { fetched: null, sources: [], files: {} };
}

export async function loadComparisons(pkg: string): Promise<ComparisonDef[]> {
  const prefix = `/packages/${pkg}/comparisons/`;
  const defs = await Promise.all(
    Object.entries(comparisonLoaders)
      .filter(([path]) => path.startsWith(prefix))
      .map(([, load]) => load()),
  );
  return defs.sort((a, b) => a.title.localeCompare(b.title));
}

/** Every source file of one example, main.ts first. */
export async function loadSources(pkg: string, example: string): Promise<SourceFile[]> {
  const prefix = `/packages/${pkg}/examples/${example}/`;
  const files = await Promise.all(
    Object.entries(sourceLoaders)
      .filter(([path]) => path.startsWith(prefix))
      .map(async ([path, load]) => ({ name: path.slice(prefix.length), code: await load() })),
  );
  const rank = (name: string): number => (name === 'main.ts' ? 0 : name === 'meta.ts' ? 2 : 1);
  return files.sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));
}
