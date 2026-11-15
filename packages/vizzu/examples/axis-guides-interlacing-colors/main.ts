// Vizzu example: axis guides and interlacing have their own colours in the style
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
      title: 'Guides and interlacing colours',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'], guides: true } },
    },
  });

  stage.story(chart, [
    {
      say: 'plot.yAxis.guides: colour and lineWidth: 3',
      run: (c) => c.animate({ style: { plot: { yAxis: { guides: { color: '#ffd54a99', lineWidth: 3 } } } } }),
    },
    {
      say: "plot.yAxis.interlacing.color: '#4ad0ff22'",
      run: (c) => c.animate({ style: { plot: { yAxis: { interlacing: { color: '#4ad0ff22' } } } } }),
    },
    {
      say: 'markerGuides: true with plot.marker.guides: colour and lineWidth: 3',
      run: (c) =>
        c.animate({
          style: { plot: { marker: { guides: { color: '#ff7a7acc', lineWidth: 3 } } } },
          config: { channels: { y: { markerGuides: true } } },
        }),
      hold: 2200,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
