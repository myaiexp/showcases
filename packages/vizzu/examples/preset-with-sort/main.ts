// Vizzu example: a chart preset with sort: 'byValue', and a later preset that keeps it
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
    config: Vizzu.presets.stackedColumn({
      x: 'Genres',
      y: 'Popularity',
      stackedBy: 'Kinds',
      title: 'Genres, in data order',
    }),
  });

  stage.story(chart, [
    {
      say: 'radialStackedBar with sort: byValue: the genres are ordered by their value',
      run: (c) =>
        c.animate(
          Vizzu.presets.radialStackedBar({
            angle: 'Popularity',
            radius: 'Genres',
            stackedBy: 'Kinds',
            sort: 'byValue',
            title: 'Radial stacked bar, sorted by value',
          }),
        ),
    },
    {
      // No sort here: the sort set above stays, because a preset does not touch it.
      say: 'A second preset, radialBar, without a sort option: the order stays',
      run: (c) =>
        c.animate(
          Vizzu.presets.radialBar({
            angle: 'Popularity',
            radius: 'Genres',
            title: 'Radial bar, sort not repeated',
          }),
        ),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
