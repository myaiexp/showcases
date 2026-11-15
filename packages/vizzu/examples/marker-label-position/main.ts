// Vizzu example: style.plot.marker.label.position places labels around their markers
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
      title: 'Marker label position',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "plot.marker.label.position: 'center'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { position: 'center' } } } } }),
    },
    {
      say: "plot.marker.label.position: 'left'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { position: 'left' } } } } }),
    },
    {
      say: "plot.marker.label.position: 'right'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { position: 'right' } } } } }),
    },
    {
      say: "plot.marker.label.position: 'top'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { position: 'top' } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
