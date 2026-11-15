// postprocessing example: the bloom luminance pass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom luminance pass',
  summary:
    'Before blurring, a BloomEffect runs a LuminancePass that keeps only the bright pixels. Its texture is shown here through a TextureEffect. Setting luminancePass.enabled to false skips the filter, so the entire frame is blurred and added back as a haze.',
  section: 'Bloom',
  tags: ['BloomEffect', 'LuminancePass', 'luminancePass', 'texture', 'enabled', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/passes/LuminancePass.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
