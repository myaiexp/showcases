// Vizzu example: minLightness and maxLightness set the range of the lightness channel
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
      title: 'Lightness range',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Popularity'] },
        color: { set: ['Genres'] },
        lightness: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'minLightness: -0.7, maxLightness: 0.7',
      run: (c) => c.animate({ style: { plot: { marker: { minLightness: -0.7, maxLightness: 0.7 } } } }),
    },
    {
      say: 'minLightness: 0, maxLightness: 0.9',
      run: (c) => c.animate({ style: { plot: { marker: { minLightness: 0, maxLightness: 0.9 } } } }),
    },
    {
      say: 'minLightness: null, maxLightness: null',
      run: (c) => c.animate({ style: { plot: { marker: { minLightness: null, maxLightness: null } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
