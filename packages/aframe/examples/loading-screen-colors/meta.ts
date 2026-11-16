// aframe example: loading-screen: dotsColor and backgroundColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "loading-screen: dotsColor and backgroundColor",
  summary: "The loading screen shows three dots on a coloured background while assets load. Here dotsColor is red and backgroundColor black, as in the docs, and an audio asset with no source keeps the scene waiting until the assets timeout, about three seconds, so the loader is on screen before the scene appears. The .a-loader-title shows the document title.",
  section: 'Components',
  tags: ["loading-screen", "dotsColor", "backgroundColor", "enabled", "a-assets", "timeout", ".a-loader-title"],
  docs: ["repo/docs/components/loading-screen.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
