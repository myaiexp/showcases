// g6 example: Fisheye: trigger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fisheye: trigger',
  summary: 'trigger chooses how the lens moves: pointermove follows the pointer, click jumps to the clicked point, drag moves it by dragging the lens.',
  section: 'Plugin',
  tags: ['fisheye', 'trigger', 'scaleRBy', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/Fisheye.en.md', 'repo/packages/site/common/api/plugins/fisheye.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
