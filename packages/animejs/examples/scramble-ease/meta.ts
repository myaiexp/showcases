// ScrambleText example: the ease parameter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scramble text ease curves',
  summary: 'One sentence scrambled with the ease set to linear, inOut(3) and outExpo, with override off so the original text stays readable. The curve changes how the reveal wave accelerates.',
  section: 'Text',
  tags: ['scrambleText', 'ease', 'override'],
  docs: [
    'pages/animejs-com/documentation/text/scrambletext/scrambletext-parameters/ease.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
