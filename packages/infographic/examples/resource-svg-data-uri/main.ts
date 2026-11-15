// icon values written as data:image/svg+xml,<svg>...</svg>, the built-in inline protocol
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const svg = (inner: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}</svg>`;

const SETS = [
  {
    say: 'circle, square, triangle',
    icons: [
      svg('<circle cx="12" cy="12" r="9"/>'),
      svg('<rect x="4" y="4" width="16" height="16" rx="2"/>'),
      svg('<path d="M12 3 22 21H2z"/>'),
    ],
  },
  {
    say: 'star, heart, bolt',
    icons: [
      svg('<path d="m12 2 3 7 7.5.6-5.7 4.9 1.8 7.4L12 18l-6.6 3.9 1.8-7.4L1.5 9.600 9 9z"/>'),
      svg('<path d="M12 21C4 14 2 10 2 7a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 3-2 7-10 14z"/>'),
      svg('<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>'),
    ],
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    SETS.map((set) => ({
      say: set.say,
      run: () => {
        const syntax = `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label One
      desc inline SVG
      icon ${set.icons[0]}
    - label Two
      desc inline SVG
      icon ${set.icons[1]}
    - label Three
      desc inline SVG
      icon ${set.icons[2]}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
