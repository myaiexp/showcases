// Vizzu example: data, then two animate() calls, and Vizzu morphs between them
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The first animate() call brings in the data and the first chart state.
  await chart.animate({
    data: musicData,
    config: {
      channels: {
        y: { set: ['Popularity'] },
        x: { set: ['Genres'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds joins the y-axis, the colour and the labels: a stacked column chart',
      run: (c) =>
        c.animate({
          config: {
            channels: {
              y: { set: ['Popularity', 'Kinds'] },
              x: { set: ['Genres'] },
              color: { set: ['Kinds'] },
              label: { set: ['Popularity'] },
            },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
