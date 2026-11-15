// Vizzu example: style.title paddings move the title inside its area
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
    style: { backgroundColor: '#A0A0A0', plot: { backgroundColor: '#D2D2D2' }, legend: { backgroundColor: '#808080' } },
    config: { title: 'Title padding', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    { say: 'title paddingTop 20, paddingBottom 20, paddingLeft 200', run: (c) => c.animate({ style: { title: { paddingTop: 20, paddingBottom: 20, paddingLeft: 200 } } }) },
    { say: 'the three paddings set to null', run: (c) => c.animate({ style: { title: { paddingTop: null, paddingBottom: null, paddingLeft: null } } }) },
  ]);
  return () => stage.dispose();
};

export default mount;
