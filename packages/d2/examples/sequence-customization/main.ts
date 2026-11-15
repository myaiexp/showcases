// Dashed return messages and a person-shaped actor.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Dashed returns',
        code: `shape: sequence_diagram
scorer: {shape: person}
scorer.t -> itemResponse.t: getItem()
scorer.t <- itemResponse.t: item {
  style.stroke-dash: 5
}

scorer.t -> item.t1: getRubric()
scorer.t <- item.t1: rubric {
  style.stroke-dash: 5
}
`,
      },
      {
        label: 'Plain',
        code: `shape: sequence_diagram
scorer.t -> itemResponse.t: getItem()
scorer.t <- itemResponse.t: item
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
