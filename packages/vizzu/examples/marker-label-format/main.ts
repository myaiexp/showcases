// Vizzu example: style.plot.marker.label.format orders a measure and a dimension on a label
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
      title: 'Marker label value order',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Popularity', 'Kinds'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity', 'Kinds'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "plot.marker.label.format: 'dimensionsFirst'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { format: 'dimensionsFirst' } } } } }),
    },
    {
      say: "plot.marker.label.format: 'measureFirst'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { format: 'measureFirst' } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
