// Vizzu example: feature cssProperties reads --vizzu-… custom properties from a stylesheet
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  chart.feature('cssProperties', true);

  await chart.animate({
    data: musicData,
    config: {
      title: 'Without CSS properties',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // The plugin reads only custom properties that appear in a stylesheet rule, at animate() time.
  stage.story(chart, [
    {
      say: 'class removed, no --vizzu-… properties apply',
      run: (c) => {
        stage.element.classList.remove('themed');
        return c.animate({ config: { title: 'Without CSS properties' } });
      },
    },
    {
      say: 'class "themed" added: --vizzu-plot-marker-colorPalette and --vizzu-title-fontSize apply',
      run: (c) => {
        stage.element.classList.add('themed');
        return c.animate({ config: { title: 'With CSS properties' } });
      },
      hold: 2200,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
