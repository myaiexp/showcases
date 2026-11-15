// Vizzu example: unit on a measure series, shown with the measure
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import type { Data } from 'vizzu';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const data: Data.TableBySeries = {
    series: [
      { name: 'Quarter', type: 'dimension', values: ['Q1', 'Q2', 'Q3', 'Q4'] },
      { name: 'Revenue', type: 'measure', unit: 'k$', values: [120, 135, 150, 190] },
      { name: 'Visitors', type: 'measure', unit: 'k', values: [34, 41, 38, 62] },
    ],
  };

  await chart.animate({
    data,
    config: { channels: { y: { set: ['Revenue'] }, x: { set: ['Quarter'] }, label: { set: ['Revenue'] } } },
  });

  stage.story(chart, [
    {
      say: "Revenue (unit 'k$') on y; Visitors (unit 'k') replaces it",
      run: (c) =>
        c.animate({
          config: { channels: { y: { set: ['Visitors'] }, x: { set: ['Quarter'] }, label: { set: ['Visitors'] } } },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

