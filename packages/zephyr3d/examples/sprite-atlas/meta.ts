// zephyr3d example: Sprites from an atlas: UV rectangles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sprites from an atlas: UV rectangles',
  summary:
    'A 4 x 4 generated atlas shared by sixteen Sprite nodes that each pick a cell with uvTopLeft and uvBottomRight, and a larger sprite whose own StandardSpriteMaterial.setUVInfo steps through the cells as a flipbook.',
  section: 'Basic Framework',
  tags: ['Sprite', 'StandardSpriteMaterial', 'spriteTexture', 'setUVInfo', 'uvTopLeft', 'uvBottomRight'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
