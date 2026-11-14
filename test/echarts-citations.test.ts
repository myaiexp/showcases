// Checks that every option an ECharts example tags is named in the docs files it cites
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadPackage } from './tree.ts';

/*
 * ECharts tags are option paths and API names by convention ('itemStyle.borderRadius',
 * 'getZr'), so a tag whose last segment never appears in the cited docs means the file
 * that documents it is missing from meta.docs. The option reference spreads one option
 * across partials reached through `{{ use: ... }}`, which is how citations go missing.
 * Other packages tag in free text ('scroll-linked', 'easing curve'), so this stays
 * ECharts-only.
 */

/** Tags whose name is documented outside the cited text, per example, with the reason. */
const EXEMPT: Record<string, { tags: string[]; why: string }> = {
  'i18n-register-locale': {
    tags: ['langDE', 'langNL', 'langUK', 'langSV', 'langFA'],
    why: 'locale objects named after the package files node_modules/echarts/i18n/lang*.js, not the docs',
  },
  'svg-seat-map-selection': {
    tags: ['geoToggleSelect'],
    why: "api/action.md documents it through the template ${componentType}ToggleSelect",
  },
  'toolbox-custom-feature-data-view': {
    tags: ['myTool'],
    why: 'stands for the my* naming rule, which the cited toolbox.md shows as myTool1 and myTool2',
  },
};

/** A dotted identifier path, optionally a call: 'xAxis.gridIndex', 'getZr', 'api.value()'. */
const IDENT = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\(\))?$/;

const lastSegment = (tag: string): string => tag.replace(/\(\)$/, '').split('.').pop() ?? tag;
const escape = (s: string): string => s.replace(/[$]/g, '\\$&');

const pkg = await loadPackage('echarts');
const pure = pkg.examples.filter((e) => e.meta.provenance === 'pure');

describe('echarts citations', () => {
  it.each(pure.map((e) => [e.slug, e] as const))('%s cites the docs for every option it tags', (slug, ex) => {
    const cited = ex.meta.docs.map((f) => readFileSync(join(pkg.dir, 'docs', f), 'utf8')).join('\n');
    const exempt = new Set(EXEMPT[slug]?.tags ?? []);
    const missing = ex.meta.tags
      .filter((t) => IDENT.test(t) && !exempt.has(t))
      .filter((t) => !new RegExp(`(?<![\\w$])${escape(lastSegment(t))}(?![\\w$])`).test(cited));
    expect(missing, 'add the docs file that documents these tags to meta.docs').toEqual([]);
  });

  it('keeps no exemption that is no longer needed', () => {
    for (const [slug, { tags }] of Object.entries(EXEMPT)) {
      const ex = pure.find((e) => e.slug === slug);
      expect(ex, `exempt example ${slug} no longer exists`).toBeDefined();
      for (const tag of tags) expect(ex!.meta.tags, `${slug} no longer tags ${tag}`).toContain(tag);
    }
  });
});
