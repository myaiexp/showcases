// Vizzu example: style.plot.marker.label.filter derives label colour from marker colour
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
    style: { plot: { marker: { label: { color: null } } } },
    config: {
      title: 'Marker label colour filter',
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
      say: "filter: 'lightness(0.6)'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { filter: 'lightness(0.6)' } } } } }),
    },
    {
      say: "filter: 'lightness(-0.6)'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { filter: 'lightness(-0.6)' } } } } }),
    },
    {
      say: "filter: 'color(#ffd54a)'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { filter: 'color(#ffd54a)' } } } } }),
    },
    {
      say: "filter: 'none'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { filter: 'none' } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
