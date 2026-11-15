// D2 includes MathJax plugins for chemistry, physics, colour and more.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'mhchem, cancel',
        code: `grid-columns: 2
mhchem: {
  ex: |tex
    \\ce{SO4^2- + Ba^2+ -> BaSO4 v}
  |
}
cancel: {
  ex: |tex
    \\cancel{Culture + 5}
  |
}
`,
      },
      {
        label: 'color, braket',
        code: `grid-columns: 2
color: {
  ex: |tex
    \\textcolor{red}{y} = \\textcolor{green}{\\sin} x
  |
}
braket: {
  ex: |tex
    \\bra{a}\\ket{b}
  |
}
`,
      },
      {
        label: 'physics, gensymb',
        code: `grid-columns: 2
physics: {
  ex: |tex
    \\var{F[g(x)]}
    \\dd(\\cos\\theta)
  |
}
gensymb: {
  ex: |tex
    \\lambda = 10.6\\,\\micro\\mathrm{m}
  |
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
