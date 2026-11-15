// Vizzu example: ControlOptions playState and position start the animation paused half way
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
    config: {
      title: 'Using initial animation control parameters',
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
      say: 'playState: "paused", position: 0.5, held for two seconds, then control.play()',
      run: (c) => {
        const animation = c.animate(toGrouped, { playState: 'paused', position: 0.5, duration: 3 });
        animation.activated.then(
          (control) => stage.wait(2000).then(() => control.play()),
          () => {},
        );
        return animation;
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
