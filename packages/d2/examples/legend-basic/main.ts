// `vars.d2-legend` declares a legend, drawn in a box under the diagram.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Microservice legend',
        code: `vars: {
  d2-legend: {
    a: {
      label: Microservice
    }
    b: Database {
      shape: cylinder
      style.stroke-dash: 2
    }
    a <-> b: Good relationship {
      style.stroke: red
      style.stroke-dash: 2
      style.stroke-width: 1
    }
    a -> b: Bad relationship
    a -> b: Tenuous {
      target-arrowhead.shape: circle
    }
  }
}

api-1
api-2

api-1 -> postgres
api-2 -> postgres

postgres: {
  shape: cylinder
}
postgres -> external: {
  style.stroke: black
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
