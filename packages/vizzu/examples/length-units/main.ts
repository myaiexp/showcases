// Vizzu example: size parameters take px, % or em, given as strings
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
      title: 'Length units',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    { say: 'legend.width: "120px"', run: (c) => c.animate({ style: { legend: { width: '120px' } } }) },
    {
      say: 'legend.width: "25%" of the chart width',
      run: (c) => c.animate({ style: { legend: { width: '25%' } } }),
    },
    {
      say: 'legend.width: "8em", eight times the font size',
      run: (c) => c.animate({ style: { legend: { width: '8em' } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
