// Reads the packages/ tree from disk for the integrity tests
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ComparisonDef, DocsManifest, DocsSourceFile, ExampleMeta, PackageDef } from '../src/types.ts';

export const ROOT = join(import.meta.dirname, '..');
export const PACKAGES = join(ROOT, 'packages');

const dirs = (path: string): string[] =>
  existsSync(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
    : [];

const files = (path: string, ext: string): string[] =>
  existsSync(path) ? readdirSync(path).filter((f) => f.endsWith(ext)).sort() : [];

export interface ExampleOnDisk {
  slug: string;
  dir: string;
  meta: ExampleMeta;
  cssFiles: string[];
}

export interface PackageOnDisk {
  slug: string;
  dir: string;
  def: PackageDef;
  source: DocsSourceFile;
  manifest: DocsManifest;
  examples: ExampleOnDisk[];
  comparisons: { file: string; def: ComparisonDef }[];
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

async function importDefault<T>(path: string): Promise<T> {
  const mod = (await import(path)) as { default: T };
  return mod.default;
}

/**
 * Every package on disk, or only the comma-separated ones in `only`. `pnpm check:pkg`
 * passes its scope through SHOWCASES_PACKAGES, so the integrity test checks just those.
 */
export function packageSlugs(only: string = process.env['SHOWCASES_PACKAGES'] ?? ''): string[] {
  const all = dirs(PACKAGES);
  const wanted = only.split(',').map((s) => s.trim()).filter(Boolean);
  if (wanted.length === 0) return all;
  const missing = wanted.filter((slug) => !all.includes(slug));
  if (missing.length > 0) throw new Error(`SHOWCASES_PACKAGES names no such package: ${missing.join(', ')}`);
  return all.filter((slug) => wanted.includes(slug));
}

export async function loadPackage(slug: string): Promise<PackageOnDisk> {
  const dir = join(PACKAGES, slug);
  const examples: ExampleOnDisk[] = [];
  for (const ex of dirs(join(dir, 'examples'))) {
    const exDir = join(dir, 'examples', ex);
    examples.push({
      slug: ex,
      dir: exDir,
      meta: await importDefault<ExampleMeta>(join(exDir, 'meta.ts')),
      cssFiles: files(exDir, '.css'),
    });
  }
  const comparisons: PackageOnDisk['comparisons'] = [];
  for (const file of files(join(dir, 'comparisons'), '.ts')) {
    comparisons.push({ file, def: await importDefault<ComparisonDef>(join(dir, 'comparisons', file)) });
  }
  return {
    slug,
    dir,
    def: await importDefault<PackageDef>(join(dir, 'package.ts')),
    source: readJson<DocsSourceFile>(join(dir, 'docs', 'SOURCE.json')),
    manifest: readJson<DocsManifest>(join(dir, 'docs', 'MANIFEST.json')),
    examples,
    comparisons,
  };
}

/** True when the stylesheet is one block under the example's own data-example selector. */
export function isScopedCss(css: string, id: string): boolean {
  const body = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const open = new RegExp(`^\\[data-example=(['"])${id.replace(/[/-]/g, '\\$&')}\\1\\]\\s*\\{`);
  if (!open.test(body)) return false;
  let depth = 0;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '{') depth++;
    else if (body[i] === '}' && --depth === 0) return i === body.length - 1;
  }
  return false;
}

/** Every URL a SOURCE.json names. */
export function sourceUrls(source: DocsSourceFile): string[] {
  return source.sources.flatMap((s) =>
    s.kind === 'git' ? [s.repo] : s.kind === 'pages' ? [...s.urls] : [s.start, s.prefix],
  );
}
