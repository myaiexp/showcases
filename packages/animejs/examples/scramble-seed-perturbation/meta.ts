// animejs example: Scramble text seed and perturbation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scramble text seed and perturbation',
  summary: 'Three lines scramble side by side: an unseeded one and two with the same seed that replay identical glyphs. A perturbation slider loosens the per-character timing.',
  section: 'Text',
  tags: ['scrambleText', 'seed', 'perturbation', 'revealRate', 'settleRate'],
  docs: [
    'pages/animejs-com/documentation/text/scrambletext/scrambletext-parameters/seed.md',
    'pages/animejs-com/documentation/text/scrambletext/scrambletext-parameters/perturbation.md',
    'pages/animejs-com/documentation/text/scrambletext/scrambletext-parameters/revealrate.md',
    'pages/animejs-com/documentation/text/scrambletext/scrambletext-parameters/settlerate.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
