// tanstack-charts example: waterfall bridge of signed changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "waterfall bridge of signed changes",
  summary:
    "waterfall turns ordered signed contributions into start and end values, with a kind of increase or decrease. barY with y1 and y2 then floats each bar from where the last one ended. The readout lists the rows it returns.",
  section: "Data Transforms",
  tags: ["waterfall", "barY", "y1", "y2"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
