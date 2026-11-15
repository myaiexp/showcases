// Vizzu example: style: null throws away every style setting, the dark colours too
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
    style: { fontSize: 20, plot: { marker: { colorPalette: '#9355e8FF #1f9bd1FF #BDAF10FF' } } },
    config: {
      title: 'A chart with custom style settings',
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
      say: "style: null, every setting back to Vizzu's defaults (a light chart)",
      run: (c) => c.animate({ style: null }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
