// embedding-atlas example: the json renderer on struct and list columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "JSON renderer",
  summary:
    "A struct column (nested flags and a score list) and the tags list shown as pretty-printed JSON with { renderer: \"json\" }, in place of their default one-line text.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: json', 'struct', 'list'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
