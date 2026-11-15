// Vizzu example: sort: "byValue" on the x channel
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
    config: { title: 'Switch to ascending order...', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "x: sort byValue",
      run: (c) => c.animate({ config: { channels: { x: { sort: 'byValue' } } } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
