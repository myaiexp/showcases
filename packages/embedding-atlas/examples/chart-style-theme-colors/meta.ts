// embedding-atlas example: $markColor, $ruleColor and other theme colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme colors in mark styles",
  summary:
    "Style colors may name the chart theme with a $ prefix. The same words histogram is filled with each: $markColor, $markColorFade, $markColorGray, $markColorGrayFade, $ruleColor, $gridColor and $labelColor, then with a plain CSS color.",
  section: "Charts",
  tags: ['style', 'fillColor', '$markColor', '$markColorFade', '$markColorGray', '$markColorGrayFade', '$ruleColor', '$gridColor', '$labelColor'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/common/theme.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
