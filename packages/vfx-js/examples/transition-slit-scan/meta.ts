// VFX-JS example: SlitScan transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SlitScan transition",
  summary:
    "SlitScan drags a scan line over the picture that smears the old content into stripes, then draws the new content out of its own stripes. It has no params.",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'SlitScan', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/slit-scan.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
