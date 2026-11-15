// Vizzu example: a style value set to null goes back to its default
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
    style: { title: { fontSize: 50 } },
    config: {
      title: 'Title font size - big',
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
      say: 'title.fontSize: null, back to the default',
      run: (c) => c.animate({ style: { title: { fontSize: null } } }),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
