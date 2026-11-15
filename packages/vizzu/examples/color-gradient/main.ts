// Vizzu example: style.plot.marker.colorGradient colours a measure on the color channel
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
      title: 'Colour gradient',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, color: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "colorGradient: '#2a6bff 0, #ff3b30 1'",
      run: (c) => c.animate({ style: { plot: { marker: { colorGradient: '#2a6bff 0, #ff3b30 1' } } } }),
    },
    {
      say: 'colorGradient: three stops, red - yellow - green',
      run: (c) =>
        c.animate({ style: { plot: { marker: { colorGradient: '#ff3b30 0, #ffd54a 0.5, #2fbf71 1' } } } }),
    },
    {
      say: 'colorGradient: null, the default',
      run: (c) => c.animate({ style: { plot: { marker: { colorGradient: null } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
