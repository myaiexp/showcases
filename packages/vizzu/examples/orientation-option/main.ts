// Vizzu example: config.orientation chooses which axis the markers grow along when both axes hold measures
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { countryData } from '../../shared/b2-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: countryData,
    config: {
      title: 'orientation: auto',
      channels: {
        x: { set: ['Income'] },
        y: { set: ['Online'] },
        noop: { set: ['Country'] },
      },
      geometry: 'area',
      orientation: 'auto',
    },
  });

  stage.story(chart, [
    {
      say: "orientation: horizontal",
      run: (c) => c.animate({ config: { title: 'orientation: horizontal', orientation: 'horizontal' } }),
      hold: 2600,
    },
    {
      say: "orientation: vertical",
      run: (c) => c.animate({ config: { title: 'orientation: vertical', orientation: 'vertical' } }),
      hold: 2600,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
