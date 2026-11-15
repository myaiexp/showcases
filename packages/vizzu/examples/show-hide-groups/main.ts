// Vizzu example: options.show and options.hide time markers fading in and out
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
      title: 'Show and hide groups',
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
      say: 'Jazz filtered out: hide { duration: 2 }',
      run: (c) =>
        c.animate({ data: { filter: (record) => record.Genres !== 'Jazz' } }, { hide: { duration: 2 } }),
    },
    {
      say: 'filter removed: show { delay: 1, duration: 2 }',
      run: (c) => c.animate({ data: { filter: null } }, { show: { delay: 1, duration: 2 } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
