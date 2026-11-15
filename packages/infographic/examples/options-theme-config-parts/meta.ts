// AntV Infographic example: Options: ThemeConfig built up part by part
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Options: ThemeConfig built up part by part",
  summary:
    "ThemeConfig is a bag of optional parts: colorBg, colorPrimary, base, palette, title, desc, item (icon, label, desc, value) and stylize. The card keeps one infographic and passes a themeConfig with one more part each step, so you see what each part alone changes; the full view prints the object.",
  section: "Options & types",
  tags: ["themeConfig", "ThemeConfig", "colorBg", "colorPrimary", "palette", "title", "desc", "item", "stylize"],
  docs: ["repo/site/src/content/reference/infographic-options.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
