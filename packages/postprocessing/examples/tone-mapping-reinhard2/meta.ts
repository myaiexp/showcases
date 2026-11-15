// postprocessing example: REINHARD2 tone mapping with whitePoint and middleGrey
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping: Reinhard2 white point and middle grey',
  summary:
    'The modified Reinhard operator has two knobs. whitePoint is the brightness that maps to pure white (lower clips sooner, higher keeps more highlight detail), and middleGrey scales the whole picture before the curve, acting like exposure.',
  section: 'Tone Mapping',
  tags: ['ToneMappingEffect', 'ToneMappingMode.REINHARD2', 'whitePoint', 'middleGrey'],
  docs: ['repo/README.md', 'repo/src/effects/ToneMappingEffect.js', 'repo/src/enums/ToneMappingMode.js', 'repo/src/effects/glsl/tone-mapping.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
