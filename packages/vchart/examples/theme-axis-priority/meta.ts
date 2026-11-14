// vchart example: Theme: axis theme layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: axis theme layers",
  summary:
    "component.axis is the base for all axes, axisBand and axisLinear override it by axis kind, and axisX and axisY override those by direction. Each layer uses a different label colour so the winning one shows.",
  section: "Theme",
  tags: ['theme.component.axis','axisBand','axisLinear','axisX','axisY'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
