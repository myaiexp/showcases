// Vizzu example: options.coordSystem and options.geometry time polar and shape changes
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
    config: {
      title: 'Coordinate system and geometry groups',
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
      say: 'coordSystem: polar over 3 s, geometry: circle over 3 s after a 3 s delay',
      run: (c) =>
        c.animate(
          { config: { coordSystem: 'polar', geometry: 'circle' } },
          { coordSystem: { duration: 3 }, geometry: { duration: 3, delay: 3 } },
        ),
      hold: 1800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
