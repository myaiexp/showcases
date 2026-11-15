// layers, scenarios and steps side by side: how each inherits
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

// The same two boards declared under each keyword.
const boards = (keyword: string): string => `base -> root

${keyword}: {
  one: {
    a -> b
  }
  two: {
    b -> c
  }
}`;

const options = { target: '*', animateInterval: 1300 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'layers: each board starts blank', code: boards('layers'), options },
      { label: 'scenarios: each board adds to the root board', code: boards('scenarios'), options },
      { label: 'steps: each board adds to the step before it', code: boards('steps'), options },
    ],
  });
  return () => stage.dispose();
};

export default mount;
