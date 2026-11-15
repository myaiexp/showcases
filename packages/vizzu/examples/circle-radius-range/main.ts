// Vizzu example: circleMinRadius and circleMaxRadius bound the size channel on circles
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
      title: 'Circle radius range',
      geometry: 'circle',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Kinds'] },
        size: { set: ['Popularity'] },
        color: { set: ['Kinds'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'circleMaxRadius: 0.05',
      run: (c) => c.animate({ style: { plot: { marker: { circleMaxRadius: 0.05 } } } }),
    },
    {
      say: 'circleMinRadius: 0.04',
      run: (c) => c.animate({ style: { plot: { marker: { circleMinRadius: 0.04 } } } }),
    },
    {
      say: 'circleMinRadius: 0.005, circleMaxRadius: 0.15',
      run: (c) =>
        c.animate({ style: { plot: { marker: { circleMinRadius: 0.005, circleMaxRadius: 0.15 } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
