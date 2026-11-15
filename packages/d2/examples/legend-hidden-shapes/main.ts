// `a -> b` declares three things, and all three would show in the legend.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Shapes and connection listed',
        code: `vars: {
  d2-legend: {
    a <-> b: Good relationship {
      style.stroke: red
      style.stroke-dash: 2
    }
  }
}

api-1 <-> api-2: {
  style.stroke: red
  style.stroke-dash: 2
}
api-1 -> api-3: {
  target-arrowhead.shape: circle
}
`,
      },
      {
        label: 'Shapes at opacity 0',
        code: `vars: {
  d2-legend: {
    a <-> b: Good relationship {
      style.stroke: red
      style.stroke-dash: 2
    }
    a.style.opacity: 0
    b.style.opacity: 0
  }
}

api-1 <-> api-2: {
  style.stroke: red
  style.stroke-dash: 2
}
api-1 -> api-3: {
  target-arrowhead.shape: circle
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
