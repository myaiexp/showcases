// Vizzu example: numberScale names the units used by the prefixed number format
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { bigData } from '../../shared/b8-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: bigData,
    style: { plot: { marker: { label: { numberFormat: 'prefixed' } } } },
    config: {
      title: 'Number scale',
      channels: { x: { set: ['Country'] }, y: { set: ['Population'] }, label: { set: ['Population'] } },
    },
  });

  stage.story(chart, [
    {
      say: "numberScale: 'SISymbol'",
      run: (c) => c.animate({ style: { plot: { marker: { label: { numberScale: 'SISymbol' } } } } }),
    },
    {
      say: "numberScale: 'shortScaleSymbolUS'",
      run: (c) =>
        c.animate({ style: { plot: { marker: { label: { numberScale: 'shortScaleSymbolUS' } } } } }),
    },
    {
      say: "numberScale: 'shortScaleSymbolUK'",
      run: (c) =>
        c.animate({ style: { plot: { marker: { label: { numberScale: 'shortScaleSymbolUK' } } } } }),
    },
    {
      say: "numberScale: 'thousand,million,billion,trillion'",
      run: (c) =>
        c.animate({
          style: { plot: { marker: { label: { numberScale: 'thousand,million,billion,trillion' } } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
