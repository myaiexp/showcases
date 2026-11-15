// AntV Infographic example: Options: container as an element or a selector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Options: container as an element or a selector",
  summary:
    "container is either an HTMLElement or a CSS selector string, which is looked up when the infographic is made. The card builds one instance from an element and the next from a '#id' selector for a second box, and shows which form was used.",
  section: "Options & types",
  tags: ["container", "selector", "HTMLElement"],
  docs: ["repo/site/src/content/reference/infographic-options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
