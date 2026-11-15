// Vizzu example: axis, labels, ticks, interlacing, guides and markerGuides, one at a time
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
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  // Each step switches one part, and puts the previous one back to 'auto'.
  stage.story(chart, [
    {
      say: 'y axis: false',
      run: (c) => c.animate({ config: { channels: { y: { axis: false } } } }),
    },
    {
      say: 'y labels: false (the numbers go)',
      run: (c) => c.animate({ config: { channels: { y: { axis: 'auto', labels: false } } } }),
    },
    {
      say: 'y ticks: false',
      run: (c) => c.animate({ config: { channels: { y: { labels: 'auto', ticks: false } } } }),
    },
    {
      say: 'y interlacing: false (the striped background goes)',
      run: (c) => c.animate({ config: { channels: { y: { ticks: 'auto', interlacing: false } } } }),
    },
    {
      say: 'x guides: true (a line behind each category)',
      run: (c) => c.animate({ config: { channels: { y: { interlacing: 'auto' }, x: { guides: true } } } }),
    },
    {
      say: 'y markerGuides: true (a line from every marker to the axis)',
      run: (c) => c.animate({ config: { channels: { x: { guides: 'auto' }, y: { markerGuides: true } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

