// Vizzu example: chart.style returns the style the chart is using right now
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const pre = stage.side();
  const show = (): void => {
    const s = chart.style;
    const text = [
      'chart.style.title.fontSize',
      '  ' + String(s.title?.fontSize),
      'chart.style.plot.marker.colorPalette',
      '  ' + String(s.plot?.marker?.colorPalette),
      'chart.style.legend.width',
      '  ' + String(s.legend?.width),
    ].join('\n');
    if (pre) pre.textContent = text;
  };
  show();

  await chart.animate({
    data: musicData,
    config: {
      title: 'Reading chart.style',
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
      say: 'colorPalette set: chart.style now returns it (sizes still automatic, so null)',
      run: (c) =>
        (show(), c)
          .animate({ style: { plot: { marker: { colorPalette: '#9355e8FF #1f9bd1FF #BDAF10FF' } } } })
          .then(show),
    },
    {
      say: 'title.fontSize set to 40: chart.style returns "40.000000px"',
      run: (c) => c.animate({ style: { title: { fontSize: 40 } } }).then(show),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
