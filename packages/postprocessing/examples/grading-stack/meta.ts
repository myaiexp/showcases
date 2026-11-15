// postprocessing example: several grading effects merged into one EffectPass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grading stack in one pass',
  summary:
    'A LUT3DEffect, HueSaturationEffect, BrightnessContrastEffect and SepiaEffect share a single EffectPass, which merges them into one shader in the order given. Each checkbox sets an effect blend function to SKIP or back, so the grade can be peeled apart.',
  section: 'Color Grading',
  tags: ['EffectPass', 'LUT3DEffect', 'HueSaturationEffect', 'BrightnessContrastEffect', 'SepiaEffect', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/passes/EffectPass.js', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js', 'repo/src/effects/HueSaturationEffect.js', 'repo/src/effects/BrightnessContrastEffect.js', 'repo/src/effects/SepiaEffect.js', 'repo/src/enums/BlendFunction.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
