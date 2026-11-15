// Giving `d2-legend` a label renames the legend box.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'd2-legend: "凡例"',
        code: `vars: {
  d2-legend: "凡例" {
    a -> b: Request {style.stroke: tomato}
  }
}

client -> server: {style.stroke: tomato}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
