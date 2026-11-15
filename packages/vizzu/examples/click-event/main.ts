// Vizzu example: chart.on('click') reports the clicked element, chart.off removes the handler
import Vizzu, { Events } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click a column, a label or the legend.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The docs' handler calls alert(JSON.stringify(event.target)); the full view prints it instead.
  const pre = stage.side();
  if (pre) pre.textContent = 'event.target of the last click\n\n(nothing clicked yet)';
  const clickHandler = (event: Events.PointerEvent): void => {
    if (pre) pre.textContent = `event.target of the last click\n\n${JSON.stringify(event.target, null, 2)}`;
  };
  chart.on('click', clickHandler);

  await chart.animate({
    data: musicData,
    config: {
      title: 'Click event added to markers',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // The story's rewind does not restore handlers, so the last step puts this one back.
  stage.story(chart, [
    {
      say: stage.preview ? 'A click handler is on (click the full view)' : 'The click handler is registered',
      run: (c) => c.animate({ config: { title: 'Click handler registered' } }),
    },
    {
      say: 'chart.off removes it: clicks report nothing',
      run: (c) => {
        c.off('click', clickHandler);
        return c.animate({ config: { title: 'chart.off: handler removed' } });
      },
    },
    {
      say: 'chart.on registers it again',
      run: (c) => {
        c.on('click', clickHandler);
        return c.animate({ config: { title: 'Click event added to markers' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
