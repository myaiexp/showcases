// :hover nested in a cell and in @cell(x = y); cards replay it with keyframes
import type { Mount } from '@/types.ts';
import { simple } from '../../shared/a-kit.ts';

// A card has no pointer, so the same colours play as an animation instead.
const ghost = (from: string, to: string): string => `
    animation: ghost 2.4s infinite;
    animation-delay: calc(@i * -.15s);
    @keyframes ghost {
      0%, 70%, 100% { background: ${from}; scale: 1; }
      80% { background: ${to}; scale: 1.2; }
    }`;

const mount: Mount = (el, ctx) => {
  const card = ctx.preview;
  return simple({
    hint: 'Hover the cells.',
    variants: [
      {
        label: ':hover',
        code: `
          @grid: 6 / 100% _2px;
          background: #333;
          transition: .3s;
          ${card ? ghost('#333', '#e6437d') : ''}

          :hover {
            background: #e6437d;
            scale: 1.2;
            z-index: 1;
          }
        `,
      },
      {
        label: '@cell(x = y) + :hover',
        code: `
          @grid: 7 / 100% _1px;
          background: #333;
          transition: .2s;

          @cell(x = y) {
            background: #e6437d;
            ${card ? ghost('#e6437d', '#ebbf4d') : ''}
            :hover {
              background: #ebbf4d;
            }
          }
        `,
      },
    ],
  })(el, ctx);
};

export default mount;
