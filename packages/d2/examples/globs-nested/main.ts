// A glob block may hold another glob.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Sequence diagrams to persons',
        code: `conversation 1: {
  shape: sequence_diagram
  alice -> bob: hi
  bob -> alice: hi
}

conversation 2: {
  shape: sequence_diagram
  alice -> bob: hello again
  alice -> bob: hello?
  bob -> alice: hello
}

# Recursively target all shapes...
**: {
  # ... that are sequence diagrams
  &shape: sequence_diagram
  # Then recursively set all shapes in them to person
  **: {shape: person}
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
