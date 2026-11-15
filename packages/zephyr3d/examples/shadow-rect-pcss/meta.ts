// zephyr3d example: Rect light shadows with PCSS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect light shadows with PCSS',
  summary:
    'A RectLight sweeping over pillars of different heights with shadow.mode \'pcss\': the penumbra follows the size of the rectangle and widens with distance from the caster. The size slider grows it; hard and pcf keep the same edge whatever the size. TAA smooths PCSS sampling.',
  section: 'Shadows',
  tags: ['RectLight', 'castShadow', 'shadow.mode', 'pcss', 'shadow.normalBias', 'shadow.depthBias', 'camera.TAA'],
  docs: ['repo/apps/doc/web/en/shadow-intro.md', 'repo/apps/doc/src/tut-84/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
