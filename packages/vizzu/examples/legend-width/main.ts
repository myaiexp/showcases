// Vizzu example: style.legend.width sets how wide the legend area is
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
    style: {
      backgroundColor: '#A0A0A0',
      plot: { backgroundColor: '#D2D2D2' },
      legend: { backgroundColor: '#808080' },
    },
    config: {
      title: 'Legend width',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    { say: 'legend.width: 50', run: (c) => c.animate({ style: { legend: { width: 50 } } }) },
    { say: 'legend.width: 250', run: (c) => c.animate({ style: { legend: { width: 250 } } }) },
    {
      say: 'legend.width: null, automatic again',
      run: (c) => c.animate({ style: { legend: { width: null } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
