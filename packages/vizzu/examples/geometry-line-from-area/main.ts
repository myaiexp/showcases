// Vizzu example: a stacked area chart over years becoming lines and back
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { salesData } from '../../shared/sample-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: salesData,
    config: { title: 'Revenue by year: area', geometry: 'area', channels: { x: { set: ['Year'] }, y: { set: ['Revenue', 'Region'] }, color: { set: ['Region'] } } },
  });

  stage.story(chart, [
    {
      say: "geometry: line (still stacked: each line sits on the one below)",
      run: (c) => c.animate({ config: { title: 'Revenue by year: stacked lines', geometry: 'line' } }),
    },
    {
      say: "Region leaves the y-axis: one line per region, from zero",
      run: (c) => c.animate({ config: { title: 'Revenue by year: a line per region', channels: { y: { detach: ['Region'] } } } }),
    },
    {
      say: "Region back on y, geometry: area",
      run: (c) => c.animate({ config: { title: 'Revenue by year: area', geometry: 'area', channels: { y: { attach: ['Region'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
