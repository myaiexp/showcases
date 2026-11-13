// Checks every package, example and comparison on disk against the repo's contracts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CATEGORIES } from '../src/types.ts';
import { isScopedCss, loadPackage, packageSlugs, sourceUrls } from './tree.ts';

const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const hostOf = (url: string): string => new URL(url).host.replace(/^www\./, '');

describe.each(packageSlugs())('package %s', async (slug) => {
  const pkg = await loadPackage(slug);
  const { def } = pkg;

  it('has a valid slug, category, date and docs sections', () => {
    expect(slug).toMatch(SLUG);
    expect(CATEGORIES).toContain(def.category);
    expect(def.added).toMatch(DATE);
    expect(def.sections.length).toBeGreaterThan(0);
    expect(new Set(def.sections).size).toBe(def.sections.length);
  });

  it('vendors docs only from official hosts', () => {
    const official = new Set([def.homepage, def.docsUrl, def.repo].map(hostOf));
    for (const url of sourceUrls(pkg.source)) {
      expect(official, `${url} is not on ${[...official].join(', ')}`).toContain(hostOf(url));
    }
  });

  it('keeps vendored files present, or out of git when the licence forbids republishing', () => {
    for (const file of Object.keys(pkg.manifest.files)) {
      if (pkg.source.redistribute) {
        expect(existsSync(join(pkg.dir, 'docs', file)), `docs/${file} missing`).toBe(true);
      }
    }
    if (!pkg.source.redistribute && Object.keys(pkg.manifest.files).length > 0) {
      expect(existsSync(join(pkg.dir, 'docs', '.gitignore'))).toBe(true);
    }
  });

  it.each(pkg.examples.map((e) => [e.slug, e] as const))('example %s', (exSlug, ex) => {
    const { meta } = ex;
    expect(exSlug).toMatch(SLUG);
    expect(existsSync(join(ex.dir, 'main.ts'))).toBe(true);
    expect(meta.title.trim()).not.toBe('');
    expect(meta.summary.trim()).not.toBe('');
    expect(meta.added).toMatch(DATE);
    expect(def.sections, `section "${meta.section}"`).toContain(meta.section);
    if (meta.provenance === 'pure') expect(meta.docs.length).toBeGreaterThan(0);
    for (const ref of meta.docs) {
      expect(Object.keys(pkg.manifest.files), `docs ref ${ref}`).toContain(ref);
    }
    for (const css of ex.cssFiles) {
      const text = readFileSync(join(ex.dir, css), 'utf8');
      expect(isScopedCss(text, `${slug}/${exSlug}`), `${css} must nest under [data-example]`).toBe(true);
      // CSS nesting has no @keyframes inside a style rule; the minifier fails the build on it.
      expect(text, `${css}: no @keyframes, animate with the library or element.animate()`).not.toMatch(/@keyframes/);
    }
  });

  it('has unique example titles', () => {
    const titles = pkg.examples.map((e) => e.meta.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('points comparisons at examples that exist', () => {
    const slugs = new Set(pkg.examples.map((e) => e.slug));
    for (const { file, def: c } of pkg.comparisons) {
      expect(c.sourceUrl, file).toMatch(/^https?:\/\//);
      for (const ours of c.ours) expect(slugs, `${file} → ${ours}`).toContain(ours);
    }
  });
});
