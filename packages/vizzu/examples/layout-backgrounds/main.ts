// Vizzu example: background colours reveal the plot, legend and title areas
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
    config: { title: 'Plot, legend and background', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: 'backgroundColor on the chart, the plot and the legend (the title area has none, it shows the chart colour)', run: (c) => c.animate({ style: { backgroundColor: '#A0A0A0', plot: { backgroundColor: '#D2D2D2' }, legend: { backgroundColor: '#808080' } } }), hold: 3200 },
  ]);
  return () => stage.dispose();
};

export default mount;
