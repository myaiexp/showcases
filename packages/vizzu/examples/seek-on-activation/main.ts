// Vizzu example: animate().activated resolves with a control; seek('50%') jumps ahead
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };

  await chart.animate({
    data: musicData,
    config: { title: 'Jumping from 0% to 50% progress at the beginning of the animation', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "animate(...).activated.then((control) => control.seek('50%'))",
      run: (c) => {
        const animation = c.animate(toGrouped, { duration: 3 });
        animation.activated.then((control) => control.seek('50%'));
        return animation;
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
