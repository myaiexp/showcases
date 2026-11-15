// Vizzu example: a plot-axis-label-draw handler changes the canvas fillStyle before each axis label is drawn
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
      title: 'Axis labels as drawn by default',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // Called before each axis label is drawn; whatever it sets on the context is used for that label.
  const labelDrawHandler = (event: EventOf<'plot-axis-label-draw'>): void => {
    event.renderingContext.fillStyle = event.target?.value === 'Jazz' ? 'red' : 'gray';
  };

  stage.story(chart, [
    {
      say: 'plot-axis-label-draw: Jazz is red, every other label gray',
      run: (c) => {
        c.on('plot-axis-label-draw', labelDrawHandler);
        // Nothing is animating, so ask the renderer to draw again now.
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Changing the canvas context before label draw' } });
      },
    },
    {
      say: 'chart.off removes the handler: labels return to normal',
      run: (c) => {
        c.off('plot-axis-label-draw', labelDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Handler removed' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
