// Vizzu example: sort: "byLabel" orders categories alphabetically
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
      title: 'Data order: Pop, Rock, Jazz, Metal',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'x: sort byLabel',
      run: (c) => c.animate({ config: { title: 'Sorted by label', channels: { x: { sort: 'byLabel' } } } }),
    },
    {
      say: 'byLabel with reverse: true',
      run: (c) => c.animate({ config: { title: 'By label, reversed', channels: { x: { reverse: true } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
