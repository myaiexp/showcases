// tsl-textures example: approximateNormal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'approximateNormal',
  summary:
    'approximateNormal(pos, posU, posV) finds the normal of a displaced surface from the point and two neighbours. A bumpy sphere is lit with only positionNode, then with the normal built the way the shape textures do.',
  section: 'Utilities',
  tags: ['approximateNormal', 'normalNode', 'positionNode', 'tangentLocal'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js', 'repo/src/supersphere.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
