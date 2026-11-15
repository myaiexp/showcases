// l7 example: Frame render timing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Frame render timing",
  summary:
    "renderDebug(true) makes the DebugService emit renderEnd after every frame, with renderStart, renderEnd and renderDuration; the sparkline plots the duration.",
  section: "Tutorial: Monitor",
  tags: ["renderDebug", "renderEnd", "renderDuration", "off"],
  docs: ["repo/site/docs/tutorial/monitor/render.en.md", "repo/site/docs/api/debug/debugservice.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
