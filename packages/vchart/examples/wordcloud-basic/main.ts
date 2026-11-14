// A word cloud: nameField is the text, valueField its size
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { wordRows } from '../../shared/wordcloud-data.ts';

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'wordCloud',
    nameField: 'word',
    valueField: 'count',
    seriesField: 'word',
    data: [{ id: 'words', values: wordRows(1) }],
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  // New weights every three seconds: the layout runs again and the words re-place themselves.
  let seed = 1;
  let released = false;
  const stop = every(3000, () => {
    if (!released) void vchart.updateData('words', wordRows(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
