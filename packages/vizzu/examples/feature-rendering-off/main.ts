// Vizzu example: chart.feature('rendering', false) stops drawing while the chart keeps animating
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const show = overlay(stage.element);

  await chart.animate({
    data: musicData,
    config: {
      title: 'Rendering on',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });
  // Which series the chart holds on x, read from the chart rather than from the canvas.
  const xSeries = (): string =>
    (chart.config.channels?.x?.set ?? []).map((s: { name: string }) => s.name).join(' + ');
  show(`rendering on\nx: ${xSeries()}`);

  // The rendering feature is not part of the stored state, so the last step turns it on again.
  stage.story(chart, [
    {
      say: "feature('rendering', false): the canvas freezes",
      run: (c) => {
        c.feature('rendering', false);
        show(`rendering off\nx: ${xSeries()}`);
        return c.animate({
          config: {
            title: 'Rendering off',
            channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } },
          },
        });
      },
    },
    {
      say: 'The animation ran, but the canvas still shows the old chart; chart.config has the new one',
      run: () => show(`rendering off\nx: ${xSeries()}  (canvas not updated)`),
    },
    {
      say: "feature('rendering', true) and a re-render: the canvas catches up",
      run: (c) => {
        c.feature('rendering', true);
        c.feature.rendering.update();
        show(`rendering on\nx: ${xSeries()}`);
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
