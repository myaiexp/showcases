// tanstack-charts example: destroy() leaves nothing behind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "destroy() leaves nothing behind",
  summary:
    "A host is mounted in a throwaway container, a pretend pointer opens its tooltip, then destroy() runs and the container is removed. The readout counts every element in the document before mounting, while hovering and after destroying, which is the cleanup check the testing guide asks for. The counts after destroy match the counts before.",
  section: "Testing and Debugging",
  tags: ['mountChart', 'host.destroy', 'tooltip', 'element counts', 'cleanup'],
  docs: [
    'repo/docs/guides/testing-and-debugging.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
