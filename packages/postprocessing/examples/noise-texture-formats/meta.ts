// postprocessing example: NoiseTexture size, format and type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NoiseTexture: size, format and type',
  summary:
    'NoiseTexture is a DataTexture of random values. A Red texture fills only the red channel, so it shows red; RG adds green; RGBA is full colour noise. UnsignedByteType stores bytes and FloatType stores floats in [0, 1]. The picture is the texture itself through a TextureEffect, with the default nearest filtering.',
  section: 'Utilities',
  tags: ['NoiseTexture', 'RedFormat', 'RGFormat', 'RGBAFormat', 'UnsignedByteType', 'FloatType', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/textures/NoiseTexture.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
