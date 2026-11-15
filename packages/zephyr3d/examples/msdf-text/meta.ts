// zephyr3d example: MSDFText: 3D text from a font asset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MSDFText: 3D text from a font asset',
  summary:
    'MSDFText builds real scene geometry from a FontAsset and a runtime MSDF atlas, so it follows the node transform and stays sharp. fontSize, maxWidth wrapping, textAlign, anchor, textColor, outlineColor/outlineWidth and castShadow are all live; the font is a pixel font drawn in code.',
  section: 'Basic Framework',
  tags: ['MSDFText', 'fetchFontAsset', 'FontAsset', 'fontSize', 'maxWidth', 'textAlign', 'anchor', 'outlineWidth', 'castShadow'],
  docs: ['repo/apps/doc/web/en/text-rendering.md', 'repo/apps/doc/src/tut-54/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
