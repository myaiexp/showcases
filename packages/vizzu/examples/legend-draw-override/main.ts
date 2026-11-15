// Vizzu example: a legend-label-draw handler colours each legend label by its category
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
      title: 'Legend labels as drawn by default',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
  });

  const tint: Record<string, string> = { Hard: '#f87171', Smooth: '#4ade80', Experimental: '#facc15' };
  // The handler only sets the fill, so the legend keeps its own text and layout.
  const legendLabelDrawHandler = (event: EventOf<'legend-label-draw'>): void => {
    event.renderingContext.fillStyle = tint[event.target?.value ?? ''] ?? '#e4e4e7';
  };

  stage.story(chart, [
    {
      say: 'legend-label-draw: each legend label gets its own colour',
      run: (c) => {
        c.on('legend-label-draw', legendLabelDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Legend labels coloured by a handler' } });
      },
    },
    {
      say: 'Genres on color: the legend lists genres, which the handler has no colour for',
      run: (c) =>
        c.animate({ config: { channels: { x: { set: ['Kinds'] }, y: { set: ['Popularity', 'Genres'] }, color: { set: ['Genres'] } } } }),
    },
    {
      say: 'chart.off: labels go back to the legend style',
      run: (c) => {
        c.off('legend-label-draw', legendLabelDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Legend labels as drawn by default' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
