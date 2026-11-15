// Vizzu example: style.legend.maxWidth caps how wide the legend can grow
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { longKindsData } from '../../shared/b8-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: longKindsData,
    config: {
      title: 'Legend maximum width',
      channels: {
        x: { set: ['Genres'] },
        y: { set: ['Popularity', 'Kinds'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: "legend.width: '60%'",
      run: (c) => c.animate({ style: { legend: { width: '60%' } } }),
    },
    {
      say: "legend.maxWidth: '150px'",
      run: (c) => c.animate({ style: { legend: { maxWidth: '150px' } } }),
    },
    {
      say: "legend.maxWidth: '60px'",
      run: (c) => c.animate({ style: { legend: { maxWidth: '60px' } } }),
    },
    {
      say: 'legend.width: null, legend.maxWidth: null',
      run: (c) => c.animate({ style: { legend: { width: null, maxWidth: null } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
