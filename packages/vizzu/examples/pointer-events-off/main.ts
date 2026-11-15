// Vizzu example: chart.feature('pointerEvents', false) stops click and pointer events reaching handlers
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the chart, then switch pointer events off and click again.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const pre = stage.side();
  let clicks = 0;
  let on = true;
  const report = (): void => {
    if (pre) pre.textContent = `pointerEvents: ${on ? 'on' : 'off'}\nclicks received: ${clicks}`;
  };
  report();
  chart.on('click', () => {
    clicks++;
    report();
  });
  const set = (enabled: boolean): void => {
    chart.feature('pointerEvents', enabled);
    on = enabled;
    report();
  };
  stage.button('Pointer events off', () => set(false));
  stage.button('Pointer events on', () => set(true));

  await chart.animate({
    data: musicData,
    config: {
      title: stage.preview ? 'Pointer events switched off and on' : 'Pointer events on',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  // The full view leaves the switch to the buttons; the card, with nobody to press them, flips it in the story.
  // The feature is not part of the stored state, so the card's last step turns it on again.
  stage.story(chart, [
    {
      say: "feature('pointerEvents', false): clicks no longer reach the handler",
      run: (c) => {
        if (stage.preview) set(false);
        return c.animate({ config: { title: stage.preview ? 'Pointer events off' : 'Click, then press the buttons' } });
      },
    },
    {
      say: "feature('pointerEvents', true): they do again",
      run: (c) => {
        if (stage.preview) set(true);
        return c.animate({ config: { title: stage.preview ? 'Pointer events on' : 'Pointer events switch' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
