// Vizzu example: an axis channel's step sets the base interval of the interlacing
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
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'y step: 25',
      run: (c) => c.animate({ config: { channels: { y: { step: 25 } } } }),
    },
    {
      say: 'y step: 50',
      run: (c) => c.animate({ config: { channels: { y: { step: 50 } } } }),
    },
    {
      say: "y step: 'auto'",
      run: (c) => c.animate({ config: { channels: { y: { step: 'auto' } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
