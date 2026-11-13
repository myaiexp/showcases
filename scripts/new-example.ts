// Scaffolds packages/<pkg>/examples/<slug>/ with meta, mount and scoped CSS
// Usage: pnpm new-example <pkg> <slug> "<Title>" "<Section>"
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function main(): void {
  const [pkg, slug, title, section] = process.argv.slice(2);
  if (!pkg || !slug || !title || !section) {
    throw new Error('usage: pnpm new-example <pkg> <slug> "<Title>" "<Section>"');
  }
  for (const s of [pkg, slug]) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(s)) throw new Error(`slugs must be kebab-case: ${s}`);
  }
  if (/[\n\r]|\*\//.test(title)) throw new Error('title must be one line without */');
  const quoted = JSON.stringify(title);
  const pkgDir = join(import.meta.dirname, '..', 'packages', pkg);
  if (!existsSync(join(pkgDir, 'package.ts'))) throw new Error(`no package ${pkg}: run pnpm new-package first`);
  const dir = join(pkgDir, 'examples', slug);
  if (existsSync(dir)) throw new Error(`${dir} already exists`);
  mkdirSync(dir, { recursive: true });
  rmSync(join(pkgDir, 'examples', '.gitkeep'), { force: true });
  const today = new Date().toISOString().slice(0, 10);

  writeFileSync(
    join(dir, 'meta.ts'),
    `// ${pkg} example: ${title}
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ${JSON.stringify(title)},
  summary: '',
  section: ${JSON.stringify(section)},
  tags: [],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [],
  provenance: 'pure',
  added: '${today}',
});
`,
  );
  writeFileSync(
    join(dir, 'main.ts'),
    `// ${title}
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = preview ? ${quoted} : ${JSON.stringify(`${title} (full view)`)};
  el.append(box);

  return () => {
    // Stop every loop, timer, animation, sound and listener started above.
  };
};

export default mount;
`,
  );
  writeFileSync(
    join(dir, 'style.css'),
    `/* ${title}: styles, all nested under this example's own selector */
[data-example='${pkg}/${slug}'] {
  .box {
    color: var(--fg-1);
  }
}
`,
  );
  console.log(`Created packages/${pkg}/examples/${slug}/ (meta.ts, main.ts, style.css).
Fill summary, tags and docs in meta.ts; the integrity test fails until docs names a vendored file.`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
