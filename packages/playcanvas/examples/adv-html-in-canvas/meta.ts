// playcanvas example: HTML-in-Canvas texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'HTML-in-Canvas texture',
  summary:
    'device.supportsHtmlTextures says whether a drawable HTML element can be bound with Texture.setSource() and re-uploaded on each paint event; the panel then carries live CSS animation onto a plane in the scene. Browsers without the API get a notice and the same panel drawn with canvas 2D as the texture source.',
  section: 'Graphics: Advanced Rendering',
  tags: ['supportsHtmlTextures', 'Texture', 'setSource', 'upload', 'PIXELFORMAT_RGBA8', 'emissiveMap'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/html-in-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
