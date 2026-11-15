// zephyr3d example: Shadow map resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow map resolution',
  summary:
    'The simplest fix for aliased shadow edges is a bigger shadow map: shadow.shadowMapSize from 128 to 4096 pixels over a hard-edged directional shadow, with a switch to filtered pcf for comparison.',
  section: 'Shadows',
  tags: ['shadow.shadowMapSize', 'shadow.mode', 'hard', 'DirectionalLight'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
