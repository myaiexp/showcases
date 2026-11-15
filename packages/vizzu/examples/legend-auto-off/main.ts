// Vizzu example: config.legend as auto, null and an explicit channel
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
    config: { title: 'legend: auto', legend: 'auto', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: "legend: null (gone, and its space too)",
      run: (c) => c.animate({ config: { title: 'legend: null', legend: null } }),
    },
    {
      say: "legend: lightness, with Popularity on lightness",
      run: (c) => c.animate({ config: { title: "legend: 'lightness'", legend: 'lightness', channels: { lightness: { set: ['Popularity'] } } } }),
    },
    {
      say: "legend: auto again",
      run: (c) => c.animate({ config: { title: 'legend: auto', legend: 'auto', channels: { lightness: { set: null } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
