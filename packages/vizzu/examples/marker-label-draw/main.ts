// Vizzu example: a plot-marker-label-draw handler highlights the labels of the big values
import Vizzu from 'vizzu';
import type { EventOf } from 'vizzu';
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
      title: 'Marker labels as drawn by default',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  // Labels of markers above 100 are drawn in bold orange; the rest are left alone.
  const labelDrawHandler = (event: EventOf<'plot-marker-label-draw'>): void => {
    const value = Number(event.target?.parent.values['Popularity']);
    if (value <= 100) return;
    const g = event.renderingContext;
    g.fillStyle = '#fb923c';
    g.font = `bold ${g.font}`;
  };

  stage.story(chart, [
    {
      say: 'plot-marker-label-draw: values above 100 are bold orange',
      run: (c) => {
        c.on('plot-marker-label-draw', labelDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Labels above 100 highlighted' } });
      },
    },
    {
      say: 'The handler runs on the new layout too',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'chart.off: plain labels again',
      run: (c) => {
        c.off('plot-marker-label-draw', labelDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Marker labels as drawn by default' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
