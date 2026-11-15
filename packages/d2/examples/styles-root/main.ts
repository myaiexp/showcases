// A top-level `style` block styles the whole diagram.
// `fill` is the background, `stroke` and `stroke-width` a frame,
// `double-border` two frames and `fill-pattern` a background texture.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Background and frame',
        code: `direction: right
x -> y
style: {
  fill: LightBlue
  stroke: FireBrick
  stroke-width: 2
}
`,
        options: { themeID: 0 },
      },
      {
        label: 'Double border and pattern',
        code: `direction: right
x -> y
style: {
  fill: "#1f2a44"
  stroke: gold
  stroke-width: 2
  double-border: true
  fill-pattern: dots
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
