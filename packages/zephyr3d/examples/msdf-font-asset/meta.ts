// zephyr3d example: FontAsset glyphSize and pageSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FontAsset glyphSize and pageSize',
  summary:
    'fetchFontAsset takes pageSize (atlas texture size) and glyphSize (base MSDF glyph resolution) on its first load of a path. The same font under three paths with glyph sizes 8, 16 and 64 shows how a small glyph size turns soft when you zoom in.',
  section: 'Basic Framework',
  tags: ['fetchFontAsset', 'FontAsset', 'pageSize', 'glyphSize', 'msdfGlyphSize', 'MSDFText'],
  docs: ['repo/apps/doc/web/en/text-rendering.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
