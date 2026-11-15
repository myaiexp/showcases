// Vizzu example: labelLevel picks which of several dimensions an axis labels
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: {
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres', 'Kinds'] }, color: { set: ['Kinds'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'x labelLevel: 1 labels the second series, Kinds',
      run: (c) => c.animate({ config: { channels: { x: { labelLevel: 1 } } } }),
    },
    {
      say: 'x labelLevel: 0 labels the first, Genres',
      run: (c) => c.animate({ config: { channels: { x: { labelLevel: 0 } } } }),
    },
    {
      say: "x labelLevel: 'auto'",
      run: (c) => c.animate({ config: { channels: { x: { labelLevel: 'auto' } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
