// Scaffolds packages/<slug>/ from npm registry metadata
// Usage: pnpm new-package <slug> <npm-name> <Category>
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES, type Category } from '../src/types.ts';

interface Registry {
  description?: string;
  homepage?: string;
  repository?: { url?: string } | string;
}

const repoUrl = (r: Registry['repository']): string => {
  const raw = typeof r === 'string' ? r : (r?.url ?? '');
  return raw
    .replace(/^git\+/, '')
    .replace(/^git:\/\//, 'https://')
    .replace(/^git@github\.com:/, 'https://github.com/')
    .replace(/\.git$/, '');
};

async function main(): Promise<void> {
  const [slug, npm, category] = process.argv.slice(2);
  if (!slug || !npm || !category) throw new Error('usage: pnpm new-package <slug> <npm-name> <Category>');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`slug must be kebab-case: ${slug}`);
  if (!(CATEGORIES as readonly string[]).includes(category)) {
    throw new Error(`category must be one of: ${CATEGORIES.join(', ')}`);
  }
  const dir = join(import.meta.dirname, '..', 'packages', slug);
  if (existsSync(dir)) throw new Error(`${dir} already exists`);

  const res = await fetch(`https://registry.npmjs.org/${npm}/latest`);
  if (!res.ok) throw new Error(`npm registry: ${npm} → HTTP ${res.status}`);
  const meta = (await res.json()) as Registry;
  const repo = repoUrl(meta.repository);
  const homepage = meta.homepage?.replace(/#readme$/, '') || repo;
  const today = new Date().toISOString().slice(0, 10);

  for (const sub of ['docs', 'examples', 'comparisons']) mkdirSync(join(dir, sub), { recursive: true });
  writeFileSync(
    join(dir, 'package.ts'),
    `// ${npm}: ${(meta.description ?? '').slice(0, 70)}
import { definePackage } from '@/types.ts';

export default definePackage({
  name: ${JSON.stringify(npm)},
  npm: ${JSON.stringify(npm)},
  tagline: ${JSON.stringify(meta.description ?? '')},
  category: ${JSON.stringify(category as Category)},
  homepage: ${JSON.stringify(homepage)},
  docsUrl: ${JSON.stringify(homepage)},
  repo: ${JSON.stringify(repo)},
  added: '${today}',
  // The official docs' own chapter order, filled in after vendoring.
  sections: ['Basics'],
});
`,
  );
  writeFileSync(
    join(dir, 'docs', 'SOURCE.json'),
    `${JSON.stringify({ license: 'unchecked', redistribute: false, sources: [] }, null, 2)}\n`,
  );
  writeFileSync(
    join(dir, 'docs', 'MANIFEST.json'),
    `${JSON.stringify({ fetched: null, sources: [], files: {} }, null, 2)}\n`,
  );
  writeFileSync(join(dir, 'comparisons', '.gitkeep'), '');
  writeFileSync(join(dir, 'examples', '.gitkeep'), '');

  console.log(`Created packages/${slug}/. Next:
  1. pnpm add ${npm}
  2. Check name, tagline, docsUrl in package.ts
  3. Fill docs/SOURCE.json (docs licence, redistribute, sources), then: pnpm vendor-docs ${slug}
  4. Set package.ts sections to the docs' chapter order
  5. pnpm new-example ${slug} <example-slug> "<Title>" <Section>`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
