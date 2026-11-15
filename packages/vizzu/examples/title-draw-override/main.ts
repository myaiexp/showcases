// Vizzu example: a title-draw handler cancels the default title and draws its own text
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
      title: 'Popularity by genre',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
  });

  // detail.outerRect.transform places the title; text is what the chart was going to write.
  const titleDrawHandler = (event: EventOf<'title-draw'>): void => {
    const g = event.renderingContext;
    const { transform, size } = event.detail.outerRect;
    const [[a, c, e], [b, d, f]] = transform;
    g.save();
    g.transform(a, b, c, d, e, f);
    const fill = g.createLinearGradient(0, 0, size.x, 0);
    fill.addColorStop(0, '#f97316');
    fill.addColorStop(1, '#38bdf8');
    g.fillStyle = fill;
    g.font = `italic bold ${Math.round(size.y * 0.7)}px sans-serif`;
    g.textBaseline = 'middle';
    g.fillText(event.detail.text.toUpperCase(), 0, size.y / 2);
    g.restore();
    event.preventDefault();
  };

  stage.story(chart, [
    {
      say: 'title-draw: the handler draws the title itself, with a gradient',
      run: (c) => {
        c.on('title-draw', titleDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Popularity by genre (custom title)' } });
      },
    },
    {
      say: 'chart.off: the default title is drawn again',
      run: (c) => {
        c.off('title-draw', titleDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Popularity by genre' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
