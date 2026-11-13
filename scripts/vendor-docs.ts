// Vendors official docs per docs/SOURCE.json and writes docs/MANIFEST.json
// Usage: pnpm vendor-docs <pkg>
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import type { DocsManifest, DocsSourceFile, ResolvedSource } from '../src/types.ts';
import { fetchHtml, fetchPages, vendorGit } from './vendor/fetchers.ts';
import { crawl, extractLinks, pageFile } from './vendor/paths.ts';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

async function main(): Promise<void> {
  const pkg = process.argv[2];
  if (!pkg || !/^[a-z0-9][a-z0-9-]*$/.test(pkg)) throw new Error('usage: pnpm vendor-docs <pkg-slug>');
  const pkgDir = join(import.meta.dirname, '..', 'packages', pkg);
  const target = join(pkgDir, 'docs');
  const sourcePath = join(target, 'SOURCE.json');
  if (!existsSync(sourcePath)) throw new Error(`${sourcePath} not found`);
  const source = JSON.parse(readFileSync(sourcePath, 'utf8')) as DocsSourceFile;

  // Everything is fetched into a staging dir and swapped in only when every source
  // succeeded, so a failed run leaves the previous vendored docs and MANIFEST intact.
  const docs = mkdtempSync(join(pkgDir, '.vendor-'));
  try {
    await vendorInto(docs, source);
    for (const name of readdirSync(target)) {
      if (name !== 'SOURCE.json') rmSync(join(target, name), { recursive: true, force: true });
    }
    for (const name of readdirSync(docs)) renameSync(join(docs, name), join(target, name));
  } finally {
    rmSync(docs, { recursive: true, force: true });
  }
  console.log(`packages/${pkg}/docs updated (redistribute: ${source.redistribute})`);
}

async function vendorInto(docs: string, source: DocsSourceFile): Promise<void> {
  const urlOf = new Map<string, string>();
  const resolved: ResolvedSource[] = [];
  for (const s of source.sources) {
    if (s.kind === 'git') {
      console.log(`git ${s.repo}@${s.ref}`);
      const dest = join(docs, 'repo');
      const commit = vendorGit(s.repo, s.ref, s.paths, dest);
      for (const file of walk(dest)) {
        const rel = relative(dest, file);
        urlOf.set(relative(docs, file), `${s.repo.replace(/\.git$/, '')}/blob/${commit}/${rel}`);
      }
      resolved.push({ ...s, commit });
      continue;
    }
    const urls =
      s.kind === 'pages'
        ? [...s.urls]
        : await crawl(s.start, s.prefix, s.max, async (u) => extractLinks(await fetchHtml(u), u));
    console.log(`${s.kind}: ${urls.length} pages`);
    for (const page of fetchPages(urls)) {
      const file = pageFile(page.url);
      const path = join(docs, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, `<!-- source: ${page.url} -->\n\n${page.markdown}\n`);
      urlOf.set(file, page.url);
    }
    resolved.push(s);
  }

  const files: Record<string, { url: string; sha256: string }> = {};
  for (const [file, url] of [...urlOf].sort(([a], [b]) => a.localeCompare(b))) {
    const sha256 = createHash('sha256').update(readFileSync(join(docs, file))).digest('hex');
    files[file] = { url, sha256 };
  }
  const manifest: DocsManifest = { fetched: new Date().toISOString(), sources: resolved, files };
  writeFileSync(join(docs, 'MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  const ignore = join(docs, '.gitignore');
  if (source.redistribute) rmSync(ignore, { force: true });
  else writeFileSync(ignore, '# Docs licence does not allow republishing: re-run pnpm vendor-docs\n*\n!SOURCE.json\n!MANIFEST.json\n!.gitignore\n');

  console.log(`${Object.keys(files).length} files vendored`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
