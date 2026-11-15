// `fill` paints a shape's inside with a colour name, quoted hex or gradient.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Hex, name and gradient',
        code: `direction: right
x -> y: hi
y -> z
x.style.fill: "#f4a261"
y.style.fill: honeydew
z.style.fill: "linear-gradient(#f69d3c, #3f87a6)"
`,
      },
      {
        label: 'fill: transparent',
        code: `x: {
  y
  y.style.fill: transparent
}
x.style.fill: PapayaWhip
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
