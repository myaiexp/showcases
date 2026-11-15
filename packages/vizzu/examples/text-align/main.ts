// Vizzu example: textAlign aligns the title, subtitle and caption
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
      title: 'Text alignment',
      subtitle: 'A subtitle',
      caption: 'A caption',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "textAlign: 'left' on title, subtitle and caption",
      run: (c) =>
        c.animate({
          style: {
            title: { textAlign: 'left' },
            subtitle: { textAlign: 'left' },
            caption: { textAlign: 'left' },
          },
        }),
    },
    {
      say: "textAlign: 'right' on title, subtitle and caption",
      run: (c) =>
        c.animate({
          style: {
            title: { textAlign: 'right' },
            subtitle: { textAlign: 'right' },
            caption: { textAlign: 'right' },
          },
        }),
    },
    {
      say: "textAlign: 'center' on title, subtitle and caption",
      run: (c) =>
        c.animate({
          style: {
            title: { textAlign: 'center' },
            subtitle: { textAlign: 'center' },
            caption: { textAlign: 'center' },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
