// l7 example: Scale updateWhenIdle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale updateWhenIdle",
  summary:
    "With updateWhenIdle the bar redraws only after dragging or zooming ends; the left bar here follows the zoom live, the right one lags until the map settles.",
  section: "Component",
  tags: ["Scale","updateWhenIdle"],
  docs: ["repo/site/docs/api/component/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
