// tanstack-charts example: Testing interaction as a sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Testing interaction as a sequence",
  summary:
    "A scripted sequence drives a mounted chart through the steps the guide lists: move to a known coordinate, check the focused datum, click to select it, then update the chart without that row and check what happens to focus. Each step logs what the host's callbacks reported, so the whole path can be asserted at once.",
  section: "Testing and Debugging",
  tags: ['onFocusChange', 'onSelect', 'host.update', 'key survival', 'dispatchEvent'],
  docs: ['repo/docs/guides/testing-and-debugging.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
