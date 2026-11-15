// Contracts every package, example and comparison file is written against

export const CATEGORIES = [
  'Animation',
  'Graphics',
  'Text',
  'Data/Viz',
  'Audio',
  'Interaction',
  'Layout/UI',
  'State/Data',
  'Parsing',
  'Networking',
  'Utilities',
] as const;
export type Category = (typeof CATEGORIES)[number];

/** ISO date, YYYY-MM-DD. */
export type IsoDate = `${number}-${number}-${number}`;

export interface PackageDef {
  /** Display name, e.g. "anime.js". */
  name: string;
  /** npm package name the examples import, e.g. "animejs". */
  npm: string;
  /** One line: what the package is for. */
  tagline: string;
  /** Optional paragraph for the package page: what sets it apart. */
  about?: string;
  category: Category;
  homepage: string;
  /** Root of the official documentation. */
  docsUrl: string;
  /** Source repository URL. */
  repo: string;
  added: IsoDate;
  /**
   * Docs sections in the order the official docs present them. Every example names one;
   * the package gallery groups and orders by this list.
   */
  sections: readonly string[];
  /**
   * Attribution the docs licence requires (CC BY and similar), shown on the package page
   * and under every example's "Built from" list.
   */
  credit?: DocsCredit;
}

export interface DocsCredit {
  /** Who holds the docs' copyright and what the work is, e.g. "Plotly, Inc.: Plotly.js docs". */
  text: string;
  /** Where the original work lives. */
  url: string;
  /** Licence name, e.g. "CC BY 3.0". */
  license: string;
  licenseUrl: string;
}

export type Provenance =
  /** Built only from the vendored official docs; `docs` names the files used. */
  | 'pure'
  /** Migrated from the original single-page showcases, which predate the docs-only rule. */
  | 'legacy';

export interface ExampleMeta {
  title: string;
  /** One or two sentences: what the example shows. */
  summary: string;
  /** One of the package's `sections`. */
  section: string;
  tags: readonly string[];
  /** Vendored docs files this example was built from, as paths in docs/MANIFEST.json. */
  docs: readonly string[];
  provenance: Provenance;
  added: IsoDate;
  /** Makes sound and has no silent preview: cards never mount it, only the example view does. */
  audio?: boolean;
}

export interface MountContext {
  /** True inside a gallery card: render lighter, never start audio. */
  preview: boolean;
  /** Fires when the host unmounts; an async mount should stop work when it does. */
  signal: AbortSignal;
}

export type Cleanup = () => void;
export type Mount = (el: HTMLElement, ctx: MountContext) => Cleanup | Promise<Cleanup>;

export interface ComparisonDef {
  title: string;
  author: string;
  /** Where the community example's source lives. */
  sourceUrl: string;
  /** Where it runs, if hosted. */
  demoUrl?: string;
  license?: string;
  /** How it was found (search query, list, recommendation). */
  foundVia: string;
  /** Slugs of our examples covering the same ground. */
  ours: readonly string[];
  /** What theirs does that ours doesn't, and the other way round. */
  notes: string;
}

/** docs/MANIFEST.json, written by scripts/vendor-docs.ts. */
export interface DocsManifest {
  /** ISO timestamp of the last vendoring run; null before the first. */
  fetched: string | null;
  /** Each source as resolved: git sources gain the commit the ref pointed at. */
  sources: readonly ResolvedSource[];
  /** Vendored files by path relative to docs/, with where each came from. */
  files: Readonly<Record<string, { url: string; sha256: string }>>;
}

export type DocsSource =
  | { kind: 'git'; repo: string; ref: string; paths: readonly string[] }
  | { kind: 'pages'; urls: readonly string[] }
  | { kind: 'crawl'; start: string; prefix: string; max: number };

export type ResolvedSource = DocsSource & { commit?: string };

/** docs/SOURCE.json, hand-written: where the package's official docs come from. */
export interface DocsSourceFile {
  /** Licence of the docs themselves (not the library), or "none found". */
  license: string;
  /** False when the docs licence does not allow republishing: files stay out of git. */
  redistribute: boolean;
  sources: readonly DocsSource[];
}

// Identity helpers: they exist so a file gets type-checked against its contract at the
// definition site, with no `satisfies` boilerplate in hundreds of files.
export const definePackage = (def: PackageDef): PackageDef => def;
export const defineMeta = (meta: ExampleMeta): ExampleMeta => meta;
export const defineComparison = (def: ComparisonDef): ComparisonDef => def;
