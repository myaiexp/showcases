// VFX-JS example: the slitScanReveal scroll reveal preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"slitScanReveal" preset',
  summary:
    "A scroll reveal: as the picture enters the viewport its top rows are smeared down from one line until the whole picture has rolled in, and on leaving it rolls back up. enterProgress and leaveProgress drive it, so it plays each time the element crosses the edge. The card treats its own box as the viewport; the full view scrolls the page.",
  section: 'Shader presets',
  tags: ["slitScanReveal", "scroll reveal", "enterProgress", "leaveProgress"],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'pages/amagi-dev/vfx-js/how-it-works.md',
    'repo/packages/vfx-js/src/constants.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
