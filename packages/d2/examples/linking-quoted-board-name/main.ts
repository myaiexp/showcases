// A board whose name has a dot: quote it in the link, as in layers."2012.06"
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `a.link: layers."2012.06"
layers: {
  "2012.06": {
    hello
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a to open the board named 2012.06.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'a links to layers."2012.06"', code: source },
      { label: 'The board "2012.06"', code: source, options: { target: 'layers."2012.06"' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
