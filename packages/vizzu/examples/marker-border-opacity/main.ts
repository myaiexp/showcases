// Vizzu example: marker borderWidth and borderOpacity outline a see-through fill
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
    style: { plot: { marker: { borderWidth: 4, fillOpacity: 0.25 } } },
    config: {
      title: 'Marker border',
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
      say: 'borderOpacity: 1',
      run: (c) => c.animate({ style: { plot: { marker: { borderOpacity: 1 } } } }),
    },
    {
      say: 'borderOpacity: 0.5',
      run: (c) => c.animate({ style: { plot: { marker: { borderOpacity: 0.5 } } } }),
    },
    {
      say: 'borderOpacity: 0',
      run: (c) => c.animate({ style: { plot: { marker: { borderOpacity: 0 } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
