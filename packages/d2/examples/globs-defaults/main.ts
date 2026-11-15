// A triple glob (`***`) styles the whole diagram, nested layers included.
// One line fills every shape and a connection glob colours every connection.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '***.style.fill and a connection default',
        code: `# Add to the top of your diagram
***.style.fill: lightblue
(*** -> ***)[*]: {
  style.stroke: red
}

x -> y
`,
        options: { themeID: 0 },
      },
      {
        label: 'Defaults for a container tree',
        code: `***.style.fill: lightblue
***.shape: circle
group: {
  a
  b
}
group.a -> group.b
`,
        options: { themeID: 0 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
