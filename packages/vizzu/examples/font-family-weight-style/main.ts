// Vizzu example: fontFamily, fontStyle and fontWeight on the root and on one text
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
      title: 'Font family, weight and style',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "fontFamily: 'monospace' on the chart root",
      run: (c) => c.animate({ style: { fontFamily: 'monospace' } }),
    },
    {
      say: "title.fontStyle: 'italic', fontWeight: 'bold'",
      run: (c) => c.animate({ style: { title: { fontStyle: 'italic', fontWeight: 'bold' } } }),
    },
    {
      say: "title.fontFamily: 'Georgia, serif', fontWeight: 300",
      run: (c) =>
        c.animate({
          style: { title: { fontFamily: 'Georgia, serif', fontStyle: 'normal', fontWeight: 300 } },
        }),
    },
    {
      say: 'all four set back to null',
      run: (c) =>
        c.animate({
          style: { fontFamily: null, title: { fontFamily: null, fontStyle: null, fontWeight: null } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
