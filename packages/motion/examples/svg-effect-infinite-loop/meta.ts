// motion example: Marching loading outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marching loading outline',
  summary: 'A "generating your report" button with a bright segment that chases around its outline forever, seamlessly. svgEffect draws only part of the stroke with pathLength and slides it with pathOffset; leaving pathSpacing unset makes the loop wrap with no jump.',
  section: 'Effects',
  tags: ['svgEffect', 'pathLength', 'pathOffset', 'pathSpacing', 'animate', 'repeat'],
  docs: ['pages/motion-dev/docs/svg-effect.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
