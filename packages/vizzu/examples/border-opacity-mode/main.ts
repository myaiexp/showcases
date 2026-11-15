// Vizzu example: borderOpacityMode blends a half-opaque border straight or premultiplied
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
    style: { plot: { marker: { borderWidth: 10, borderOpacity: 0.4, fillOpacity: 0.6 } } },
    config: {
      title: 'Border opacity mode',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Popularity', 'Kinds'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "borderOpacityMode: 'straight'",
      run: (c) => c.animate({ style: { plot: { marker: { borderOpacityMode: 'straight' } } } }),
    },
    {
      say: "borderOpacityMode: 'premultiplied'",
      run: (c) => c.animate({ style: { plot: { marker: { borderOpacityMode: 'premultiplied' } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
