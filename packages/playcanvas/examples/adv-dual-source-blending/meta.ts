// playcanvas example: Dual-source blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dual-source blending',
  summary:
    'A fragment shader writes two colours, gl_FragColor and pcFragColorSecondary, and a BlendState picks the secondary one as the destination factor, so each colour channel of a checkerboard backdrop is kept by a different amount. The full view switches between the four SRC1 blend factors; a device without the extension gets a plain alpha blend and a notice.',
  section: 'Graphics: Advanced Rendering',
  tags: ['BlendState', 'BLENDMODE_SRC1_COLOR', 'BLENDMODE_ONE_MINUS_SRC1_COLOR', 'BLENDMODE_SRC1_ALPHA', 'supportsDualSourceBlending', 'pcFragColorSecondary', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/dual-source-blending.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
