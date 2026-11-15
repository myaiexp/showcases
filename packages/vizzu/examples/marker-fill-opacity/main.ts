// Vizzu example: style.plot.marker.fillOpacity makes marker fills see-through
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
      title: 'Marker fill opacity',
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
      say: 'plot.marker.fillOpacity: 0.5',
      run: (c) => c.animate({ style: { plot: { marker: { fillOpacity: 0.5 } } } }),
    },
    {
      say: 'plot.marker.fillOpacity: 0.15',
      run: (c) => c.animate({ style: { plot: { marker: { fillOpacity: 0.15 } } } }),
    },
    {
      say: 'plot.marker.fillOpacity: 1',
      run: (c) => c.animate({ style: { plot: { marker: { fillOpacity: 1 } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
