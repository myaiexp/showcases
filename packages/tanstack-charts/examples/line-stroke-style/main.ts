// lineY stroke options: width, dash array, cap and join
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [3, 8, 4, 9, 2, 7, 5].map((y, x) => ({ x, y }));

interface Style {
  width: number;
  dash: string;
  cap: 'butt' | 'round' | 'square';
  join: 'miter' | 'round' | 'bevel';
}

const presets: Style[] = [
  { width: 14, dash: '', cap: 'round', join: 'round' },
  { width: 14, dash: '', cap: 'butt', join: 'miter' },
  { width: 14, dash: '', cap: 'square', join: 'bevel' },
  { width: 8, dash: '2 14', cap: 'round', join: 'round' },
  { width: 6, dash: '18 8', cap: 'butt', join: 'round' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let style = presets[0]!;

  const chart = (s: Style) =>
    defineChart({
      marks: [
        lineY(rows, {
          x: 'x',
          y: 'y',
          strokeWidth: s.width,
          strokeDasharray: s.dash || undefined,
          lineCap: s.cap,
          lineJoin: s.join,
          strokeOpacity: 0.9,
        }),
      ],
      scales: { x: { scale: scaleLinear, axis: false }, y: { scale: scaleLinear, domain: [0, 10], axis: false } },
    });

  const options = { definition: chart(style), height: stage.height, initialWidth: 640, ariaLabel: 'A zig-zag line with adjustable stroke' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (next: Style): void => {
    style = next;
    host.update({ ...options, definition: chart(style) });
  };

  if (stage.bar) {
    slider(stage.bar, 'strokeWidth', 1, 24, 1, style.width, (width) => show({ ...style, width }), (v) => `${v}px`);
    select(stage.bar, 'strokeDasharray', [['', 'solid'], ['2 14', '2 14 (dots)'], ['18 8', '18 8 (dashes)']] as const, (dash) => show({ ...style, dash }));
    select(stage.bar, 'lineCap', [['round', 'round'], ['butt', 'butt'], ['square', 'square']] as const, (cap) => show({ ...style, cap }));
    select(stage.bar, 'lineJoin', [['round', 'round'], ['miter', 'miter'], ['bevel', 'bevel']] as const, (join) => show({ ...style, join }));
  } else stage.cycle(presets, 2000, show);
  return () => stage.dispose();
};

export default mount;
