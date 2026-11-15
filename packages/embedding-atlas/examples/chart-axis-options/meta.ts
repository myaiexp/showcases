// embedding-atlas example: axis title, values, desiredTickCount, label styling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis options",
  summary:
    "Axis settings on a words histogram: a custom title, explicit tick values, a desired tick count of 12, extendScaleToTicks off so the scale stops at the data, and larger serif labels with extra padding.",
  section: "Charts",
  tags: ['axis', 'title', 'values', 'desiredTickCount', 'extendScaleToTicks', 'labelPadding', 'labelFontFamily', 'labelFontSize'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
