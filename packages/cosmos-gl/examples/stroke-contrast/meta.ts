// cosmos-gl example: Stroke contrast
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stroke contrast',
  summary:
    'A derived stroke is the color of the point itself made lighter or darker by pointStrokeContrast, a step in perceived lightness. pointDefaultStrokeColor set to darken, lighten or auto chooses the direction; auto darkens light points and lightens dark ones.',
  section: 'Point styling',
  tags: ['pointStrokeContrast', 'pointDefaultStrokeColor', 'pointDefaultStrokeWidth'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-11-04-stroke-contrast.md', 'repo/history/2026/2026-09-15-point-stroke.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
