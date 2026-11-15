// Vizzu example: options.easing takes named curves or a cubic-bezier()
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import type { Anim } from 'vizzu';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };
  const curves: Anim.Easing[] = ['linear', 'ease-in', 'ease-out', 'step-end', 'cubic-bezier(0.8, 0, 0.2, 1)'];
  const steps = curves.map((easing, i) => ({
    say: 'easing: "' + easing + '"',
    run: (c: Vizzu) => c.animate(i % 2 === 0 ? toGrouped : toStacked, { duration: 1.5, easing }),
    hold: 500,
  }));

  await chart.animate({
    data: musicData,
    config: {
      title: 'Easing curves',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, steps, { rewind: false });
  return () => stage.dispose();
};

export default mount;
