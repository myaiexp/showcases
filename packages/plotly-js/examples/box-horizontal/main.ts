// Horizontal box plot: samples passed as x; a button flips them to y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const set1 = [1, 2, 3, 4, 4, 4, 8, 9, 10];
const set2 = [2, 3, 3, 3, 3, 5, 6, 6, 7];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { x: set1, type: 'box', name: 'Set 1' },
      { x: set2, type: 'box', name: 'Set 2' },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Horizontal Box Plot' } },
    stage.config,
  );

  // Moving the numbers to y (and x to undefined) turns the boxes upright.
  let upright = false;
  const flip = (): void => {
    upright = !upright;
    void Plotly.react(
      stage.div,
      [
        { [upright ? 'y' : 'x']: set1, type: 'box', name: 'Set 1' },
        { [upright ? 'y' : 'x']: set2, type: 'box', name: 'Set 2' },
      ],
      { template: stage.template, title: { text: stage.preview ? '' : upright ? 'Vertical Box Plot' : 'Horizontal Box Plot' } },
      { ...stage.config },
    );
  };
  if (stage.bar) button(stage.bar, 'Flip orientation', flip);
  else stage.every(1800, flip);

  return () => stage.dispose();
};

export default mount;
