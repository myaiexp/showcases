// zephyr3d example: FXAA on thin edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FXAA on thin edges',
  summary:
    'Seven thin bright bars turn against a black sky. camera.FXAA smooths the stair-stepped edges in one cheap screen-space pass; toggle it to compare. The canvas runs at pixel ratio 1 so the aliasing shows.',
  section: 'Post-processing',
  tags: ['FXAA'],
  docs: ['repo/apps/doc/web/en/posteffect-fxaa.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
