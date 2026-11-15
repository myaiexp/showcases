// AntV Infographic example: Exports: getItemProps() splits an item's props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getItemProps() splits an item's props",
  summary:
    "getItemProps(props, extKeys) returns a pair: the first object holds the structural keys (indexes, data, datum, themeColors, positions) plus any extKeys you name, and the second holds everything else, so a component can pass the rest straight to a shape. The card splits one props object with different extKeys and prints both halves.",
  section: "Exports",
  tags: ["getItemProps", "BaseItemProps", "extKeys"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
