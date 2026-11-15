// Vizzu example: Vizzu.presets.marimekko, morphing in from stackedColumn
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { marketData } from '../../shared/b2-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: marketData,
    config: Vizzu.presets.stackedColumn({
      x: 'Region',
      y: 'Sales',
      stackedBy: 'Channel',
      title: 'Sales by region and channel',
    }),
  });

  stage.story(chart, [
    {
      say: 'marimekko: the mekko with every column stretched to full height',
      // A preset returns a whole chart config, so it can go straight into animate().
      run: (c) =>
        c.animate(
          Vizzu.presets.marimekko({
            x: 'Customers',
            groupedBy: 'Region',
            y: 'Sales',
            stackedBy: 'Channel',
            title: 'Channel share, width is customers',
          }),
        ),
      hold: 2400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
