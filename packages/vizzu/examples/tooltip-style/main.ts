// Vizzu example: style.tooltip sets the tooltip's layout and colours, seen on hover
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    hint: 'Hover a column to see the tooltip in its current style.',
  });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  // feature() before initialization completes would fail.
  chart.feature('tooltip', true);

  await chart.animate({
    data: musicData,
    config: {
      title: 'Tooltip layout and colours',
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
      say: "tooltip.layout: 'singleLine'",
      run: (c) =>
        c.animate({
          style: { tooltip: { layout: 'singleLine' } },
          config: { channels: { y: { set: ['Popularity'] }, color: { set: null } } },
        }),
      hold: 2200,
    },
    {
      say: "tooltip.layout: 'multiLine'",
      run: (c) =>
        c.animate({
          style: { tooltip: { layout: 'multiLine' } },
          config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
        }),
      hold: 2200,
    },
    {
      say: 'tooltip colours and borderRadius: 14',
      run: (c) =>
        c.animate({
          style: {
            tooltip: {
              color: '#1b1b1f',
              backgroundColor: '#ffd54a',
              borderColor: '#ffd54a',
              borderRadius: 14,
            },
          },
          config: { channels: { y: { set: ['Popularity'] }, color: { set: null } } },
        }),
      hold: 2200,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
