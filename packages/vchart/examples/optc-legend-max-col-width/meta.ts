// vchart example: Legend maxCol and maxHeight columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend maxCol and maxHeight columns",
  summary: "A side legend with many items hides whatever exceeds maxCol columns, and maxHeight makes items wrap into columns. A slider changes the column limit.",
  section: "Option: Components",
  tags: ["legends.maxCol","legends.maxHeight","item.spaceCol","item.spaceRow"],
  docs: [
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
