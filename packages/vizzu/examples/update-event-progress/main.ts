// Vizzu example: the update event carries progress and position, drawn here as a progress bar
import Vizzu, { Events } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // A bar under the chart, filled by the handler.
  const track = document.createElement('div');
  track.style.cssText = `height:${stage.preview ? 6 : 10}px;border-radius:5px;background:#27272a;overflow:hidden`;
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0;background:#38bdf8';
  track.append(fill);
  stage.root.after(track);
  const pre = stage.side();

  // update fires at every animation frame.
  const updateHandler = (event: Events.UpdateEvent): void => {
    const { progress, position } = event.detail;
    fill.style.width = `${(progress * 100).toFixed(1)}%`;
    if (pre)
      pre.textContent = `update event\n\nprogress  ${progress.toFixed(3)}\nposition  ${String(position)}`;
  };
  chart.on('update', updateHandler);

  await chart.animate({
    data: musicData,
    config: {
      title: 'Progress from the update event',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'The bar fills as the animation runs',
      run: (c) =>
        c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }, 3),
    },
    {
      say: 'And again for the way back',
      run: (c) =>
        c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }, 3),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
