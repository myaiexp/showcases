// Vizzu example: style.plot.marker.rectangleSpacing sets the gap between columns
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
      title: 'Rectangle spacing',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'plot.marker.rectangleSpacing: 0',
      run: (c) => c.animate({ style: { plot: { marker: { rectangleSpacing: 0 } } } }),
    },
    {
      say: 'plot.marker.rectangleSpacing: 0.3',
      run: (c) => c.animate({ style: { plot: { marker: { rectangleSpacing: 0.3 } } } }),
    },
    {
      say: 'plot.marker.rectangleSpacing: 2',
      run: (c) => c.animate({ style: { plot: { marker: { rectangleSpacing: 2 } } } }),
    },
    {
      say: 'plot.marker.rectangleSpacing: null, the default',
      run: (c) => c.animate({ style: { plot: { marker: { rectangleSpacing: null } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
