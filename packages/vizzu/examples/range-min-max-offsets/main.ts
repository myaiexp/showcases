// Vizzu example: range values with a min or max suffix
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The tutorial's setup_c state, written out in full (plus whatever this step starts from).
  await chart.animate({
    data: musicData,
    config: {
      title: 'Axis range as set by default',
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
      say: "y: range max '50max', 50 above the largest value",
      run: (c) =>
        c.animate({ config: { title: "max: '50max'", channels: { y: { range: { max: '50max' } } } } }),
    },
    {
      say: "y: range max '-50max', 50 below it",
      run: (c) =>
        c.animate({ config: { title: "max: '-50max'", channels: { y: { range: { max: '-50max' } } } } }),
    },
    {
      say: "y: range max '5min', 5 above the smallest value",
      run: (c) =>
        c.animate({ config: { title: "max: '5min'", channels: { y: { range: { max: '5min' } } } } }),
    },
    {
      say: "y: range min '-50min', max 'auto'",
      run: (c) =>
        c.animate({
          config: { title: "min: '-50min'", channels: { y: { range: { min: '-50min', max: 'auto' } } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
