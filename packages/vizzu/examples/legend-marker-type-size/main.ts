// Vizzu example: style.legend.marker.type and size shape the legend swatches
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
      title: 'Legend marker shape and size',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Popularity', 'Kinds'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "legend.marker.type: 'square'",
      run: (c) => c.animate({ style: { legend: { marker: { type: 'square' } } } }),
    },
    {
      say: 'legend.marker.size: 24',
      run: (c) => c.animate({ style: { legend: { marker: { size: 24 } } } }),
    },
    {
      say: "legend.marker.type: 'circle', size: 10",
      run: (c) => c.animate({ style: { legend: { marker: { type: 'circle', size: 10 } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
