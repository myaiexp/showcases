// vchart example: Axis labels that wrap: autoWrap and lineClamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis labels that wrap: autoWrap and lineClamp",
  summary: "Long category names on a band axis break onto several lines with label.autoWrap, and style.lineClamp caps the number of lines. Controls change the clamp and the wrap switch.",
  section: "Option: Components",
  tags: ["axes.label.autoWrap","label.style.lineClamp","autoLimit"],
  docs: [
    'repo/docs/assets/option/en/component/axis-common/cartesian-axis.md',
    'repo/docs/assets/option/en/component/axis-common/axis-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
