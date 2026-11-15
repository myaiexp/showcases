// Four boolean styles decorate a shape: shadow, 3d, multiple, double-border.
// `3d` extrudes a rectangle or square; `double-border` works on rectangles
// and ovals; `multiple` stacks copies behind the shape.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'shadow: true',
        code: `direction: right
x -> y: hi
x.style.shadow: true
`,
      },
      {
        label: '3d: true',
        code: `direction: right
x -> y: hi
x.style.3d: true
`,
      },
      {
        label: 'multiple: true',
        code: `direction: right
x -> y: hi
x.style.multiple: true
`,
      },
      {
        label: 'double-border: true',
        code: `direction: right
x -> y: hi
x.style.double-border: true
y.shape: circle
y.style.double-border: true
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
