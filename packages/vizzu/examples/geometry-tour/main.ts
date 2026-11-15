// Vizzu example: the geometry property: area, line, circle and rectangle on the same data
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
      title: 'Geometry: rectangle - default',
      channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } },
    },
  });

  stage.story(chart, [
    {
      say: "geometry: 'area'",
      run: (c) => c.animate({ config: { title: 'Geometry: area', geometry: 'area' } }),
    },
    {
      say: "geometry: 'line'",
      run: (c) => c.animate({ config: { title: 'Geometry: line', geometry: 'line' } }),
    },
    {
      say: "geometry: 'circle'",
      run: (c) => c.animate({ config: { title: 'Geometry: circle', geometry: 'circle' } }),
    },
    {
      say: "geometry: 'rectangle'",
      run: (c) => c.animate({ config: { title: 'Geometry: rectangle - default', geometry: 'rectangle' } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
