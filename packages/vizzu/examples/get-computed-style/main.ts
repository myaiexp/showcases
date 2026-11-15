// Vizzu example: chart.getComputedStyle() returns every style value with the defaults filled in
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const pre = stage.side();
  const show = overlay(stage.element);

  // chart.style holds only what was set (null for the rest); getComputedStyle() resolves the defaults.
  const read = (): void => {
    const set = chart.style.plot?.xAxis?.label?.fontSize;
    const computed = chart.getComputedStyle().plot?.xAxis?.label?.fontSize;
    show(`chart.style: ${String(set)}\ngetComputedStyle(): ${String(computed)}`);
    if (!pre) return;
    const s = chart.style;
    const c = chart.getComputedStyle();
    pre.textContent = [
      'plot.xAxis.label.fontSize',
      `  chart.style           ${String(s.plot?.xAxis?.label?.fontSize)}`,
      `  getComputedStyle()    ${String(c.plot?.xAxis?.label?.fontSize)}`,
      '',
      'title.fontSize',
      `  chart.style           ${String(s.title?.fontSize)}`,
      `  getComputedStyle()    ${String(c.title?.fontSize)}`,
      '',
      'plot.marker.colorPalette',
      `  chart.style           ${String(s.plot?.marker?.colorPalette)}`,
      `  getComputedStyle()    ${String(c.plot?.marker?.colorPalette).slice(0, 60)}...`,
    ].join('\n');
  };

  await chart.animate({
    data: musicData,
    config: {
      title: 'Computed style',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });
  read();

  stage.story(chart, [
    {
      say: 'Nothing set on the x labels: style is null, computed has the size in use',
      run: () => read(),
    },
    {
      say: 'plot.xAxis.label.fontSize set to 24: both now show it',
      run: (c) => c.animate({ style: { plot: { xAxis: { label: { fontSize: 24 } } } } }).then(read),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
