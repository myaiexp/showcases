// AntV Infographic example: Exports: getTemplate() returns TemplateOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getTemplate() returns TemplateOptions",
  summary:
    "getTemplate(id) returns a template's TemplateOptions, which is a design (structure, item, title) and a themeConfig, or undefined. The card prints the object for three ids and renders the data twice from it: once by the template id and once by passing that design in as options, to show the two are the same picture.",
  section: "Exports",
  tags: ["getTemplate", "TemplateOptions", "design", "themeConfig"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md", "repo/site/src/content/learn/template.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
