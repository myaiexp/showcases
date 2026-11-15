// Invisible padding cells line a short row up under a long one.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Unaligned',
        code: `grid-columns: 1
us-east-1: {
  grid-rows: 1
  a
  b
  c
  d
  e
}

us-west-1: {
  grid-rows: 1
  a
}

us-east-1.c -> us-west-1.a
`,
      },
      {
        label: 'Padded',
        code: `classes: {
  invisible: {
    style.opacity: 0
    label: a
  }
}

grid-columns: 1
us-east-1: {
  grid-rows: 1
  a
  b
  c
  d
  e
}

us-west-1: {
  grid-rows: 1
  pad1.class: invisible
  pad2.class: invisible
  a
  # Move the label so it doesn't go through the connection
  label.near: bottom-center
}

us-east-1.c -> us-west-1.a
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
