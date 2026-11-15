// Vizzu example: reverse: true on a sorted axis and on an unsorted one
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
    config: { title: 'Ascending by value', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'], sort: 'byValue' }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "reverse: true after byValue: descending",
      run: (c) => c.animate({ config: { title: '...or descending order.', channels: { x: { reverse: true } } } }),
    },
    {
      say: "sort: none, reverse: true: the data order, backwards",
      run: (c) => c.animate({ config: { title: 'No sort, only reverse', channels: { x: { sort: 'none', reverse: true } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
