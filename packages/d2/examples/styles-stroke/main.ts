// `stroke` sets a shape's outline or a connection's line colour.
// Takes a CSS colour name, a hex code (quoted, as `#` starts a comment)
// or a gradient string.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Colour name and hex code',
        code: `direction: right
x -> y: hi {
  style: {
    # All CSS color names are valid
    stroke: deepskyblue
  }
}
# We need quotes for hex otherwise it gets interpreted as comment
x.style.stroke: "#f4a261"
`,
      },
      {
        label: 'A gradient stroke',
        code: `direction: right
x -> y: hi
x.style.stroke-width: 6
x.style.stroke: "linear-gradient(#f69d3c, #3f87a6)"
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
