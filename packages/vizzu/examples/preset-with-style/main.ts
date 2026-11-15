// Vizzu example: a chart preset in the config property, with a style change beside it
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
    config: Vizzu.presets.column({ x: 'Genres', y: 'Popularity', title: 'Popularity by genre' }),
  });

  stage.story(chart, [
    {
      say: 'radialBar in config, and a style that makes the radial axis lines transparent',
      // The shorter form passes the preset itself; this one lets animate() take a style too.
      run: (c) =>
        c.animate({
          config: Vizzu.presets.radialBar({
            angle: 'Popularity',
            radius: 'Genres',
            title: 'Radial bar, no interlacing',
          }),
          style: { 'plot.xAxis.interlacing.color': '#ffffff00' },
        }),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
