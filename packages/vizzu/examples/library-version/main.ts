// Vizzu example: chart.version() returns the version string of the library that is running
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  // version() needs the library loaded, so it waits for initialization too.
  await chart.initializing;
  const version = chart.version();

  await chart.animate({
    data: musicData,
    config: {
      title: `Vizzu ${version}`,
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });
  const pre = stage.side();
  if (pre) pre.textContent = `chart.version()\n\n${version}`;

  stage.story(chart, [
    {
      say: `chart.version() returned "${version}"`,
      run: (c) => c.animate({ config: { title: `chart.version(): ${version}`, channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'The title is just a string built from it',
      run: (c) => c.animate({ config: { title: `Vizzu ${version}`, channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
