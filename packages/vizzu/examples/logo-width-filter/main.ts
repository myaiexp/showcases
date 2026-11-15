// Vizzu example: style.logo.width and filter resize and recolour the logo
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
      title: 'Logo width and filter',
      channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: "logo.width: '120px'",
      run: (c) => c.animate({ style: { logo: { width: '120px' } } }),
    },
    {
      say: "logo.filter: 'color(#ffd54a)'",
      run: (c) => c.animate({ style: { logo: { filter: 'color(#ffd54a)' } } }),
    },
    {
      say: "logo.filter: 'lightness(0.4)', width: '60px'",
      run: (c) => c.animate({ style: { logo: { filter: 'lightness(0.4)', width: '60px' } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
