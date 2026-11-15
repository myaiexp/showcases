// Vizzu example: style set with dot paths, 'plot.xAxis.label.fontSize', instead of nested objects
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
      title: 'Shorthand for styles',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "'plot.xAxis.label.fontSize': '150%' and a plot background, as paths",
      run: (c) =>
        c.animate({
          style: {
            // plot: { xAxis: { label: { fontSize: '150%' } } }
            'plot.xAxis.label.fontSize': '150%',
            // plot: { backgroundColor: ... }, a dark grey that suits this page (the docs use #A0A0A0)
            'plot.backgroundColor': '#27272a',
          },
        }),
    },
    {
      say: 'null in a path resets that one property',
      run: (c) => c.animate({ style: { 'plot.xAxis.label.fontSize': null } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
