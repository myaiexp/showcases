// Vizzu example: the size channel only acts on circle and line geometry
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
    config: { title: 'Size - change of geometry required', channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: "size: set Popularity (rectangles ignore it)",
      run: (c) => c.animate({ config: { channels: { size: { set: ['Popularity'] } } } }),
    },
    {
      say: "geometry: circle (now the radius follows size)",
      run: (c) => c.animate({ config: { geometry: 'circle' } }),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
