// `fill-pattern` overlays `dots`, `lines` or `grain`; `none` cancels one.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'dots, lines and grain',
        code: `direction: right
style.fill-pattern: dots
x -> y: hi
x.style.fill-pattern: lines
y.style.fill-pattern: grain
`,
      },
      {
        label: 'none cancels a theme pattern',
        code: `direction: right
box: {
  a -> b
  style.fill-pattern: dots
}
box.a.style.fill-pattern: none
`,
        options: { themeID: 300 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
