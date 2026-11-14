// vchart example: Sankey: nodes and links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: nodes and links",
  summary:
    "The flat data form: one row with a nodes array and a links array of source, target and value. sourceField and targetField name the link columns and nodeKey ties them to the node names; new link amounts replace the data every two seconds.",
  section: "Flow and Relation",
  tags: ["nodes", "links", "sourceField", "targetField", "nodeKey", "updateData"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
