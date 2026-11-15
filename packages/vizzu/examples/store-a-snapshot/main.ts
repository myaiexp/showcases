// Vizzu example: chart.store() saves a state and control.store() an animation, both replayed with animate()
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import type { CAnimation, Snapshot } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: {
      title: 'Store function',
      channels: { y: { set: ['Popularity', 'Kinds'], align: 'stretch' }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  // A snapshot holds config, style and the data filter, not the data itself.
  const snapshot: Snapshot = chart.store();
  let animation: CAnimation | null = null;

  stage.story(chart, [
    {
      say: 'Kinds side by side; the control object of this animation is stored',
      run: (c) => {
        const running = c.animate({ channels: { x: { attach: 'Kinds' }, y: { detach: 'Kinds', align: 'none' } } });
        running.activated.then((control) => {
          animation = control.store();
        });
        return running;
      },
    },
    {
      say: 'animate(snapshot): back to the stored state',
      run: (c) => c.animate(snapshot),
    },
    {
      say: 'animate(animation): the stored animation plays again',
      run: (c) => (animation ? c.animate(animation) : undefined),
    },
  ], { rewind: false });
  return () => stage.dispose();
};

export default mount;
