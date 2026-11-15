// Internal links: `link: layers.cat` makes a shape open another board
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `how does the cat go?: {
  link: layers.cat
}

layers: {
  cat: {
    meoowww
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the shape to follow its link to layers.cat.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'Root board: the shape links to layers.cat', code: source },
      { label: 'Where the link goes', code: source, options: { target: 'layers.cat' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
