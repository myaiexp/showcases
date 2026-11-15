// Vizzu example: maxFractionDigits caps the decimals shown on number labels
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { fractionData } from '../../shared/b8-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: fractionData,
    config: {
      title: 'Maximum fraction digits',
      channels: { x: { set: ['Constant'] }, y: { set: ['Value'] }, label: { set: ['Value'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'plot.marker.label.maxFractionDigits: 2',
      run: (c) => c.animate({ style: { plot: { marker: { label: { maxFractionDigits: 2 } } } } }),
    },
    {
      say: 'plot.marker.label.maxFractionDigits: 1',
      run: (c) => c.animate({ style: { plot: { marker: { label: { maxFractionDigits: 1 } } } } }),
    },
    {
      say: 'plot.marker.label.maxFractionDigits: 0',
      run: (c) => c.animate({ style: { plot: { marker: { label: { maxFractionDigits: 0 } } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
