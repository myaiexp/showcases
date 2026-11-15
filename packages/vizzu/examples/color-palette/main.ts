// Vizzu example: style.plot.marker.colorPalette sets the colours a dimension cycles through
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
      title: 'Color palette',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'colorPalette: three colours, one per Kinds item',
      run: (c) =>
        c.animate({ style: { plot: { marker: { colorPalette: '#9355e8FF #1f9bd1FF #BDAF10FF' } } } }),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
