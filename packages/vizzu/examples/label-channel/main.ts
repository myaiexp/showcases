// Vizzu example: attaching a measure to the label channel writes it on the markers
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
    config: { title: 'Label', channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: "label: attach Popularity",
      run: (c) => c.animate({ config: { channels: { label: { attach: ['Popularity'] } } } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
