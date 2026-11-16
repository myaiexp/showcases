// Basics: stroke styling options on a Line
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { select, checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch strokeCap and strokeJoin, or turn the dashes off.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const line = new Line({
    x: u(30),
    y: u(60),
    points: [0, 80, u(100), 0, u(200), 80],
    stroke: GREEN,
    strokeWidth: stage.preview ? 10 : 18, // line width
    strokeScaleFixed: true, // width ignores view zoom
    strokeAlign: 'center', // 'inside' | 'center' | 'outside'
    strokeCap: 'round', // 'none' | 'round' | 'square'
    strokeJoin: 'round', // 'miter' | 'bevel' | 'round'
    dashPattern: [15, 15], // dashed
    dashOffset: 15, // where the dashes start
  });
  leafer.add(line);
  stage.loop((_dt, t) => (line.dashOffset = -t * 20));

  if (!stage.preview) {
    select(stage.bar!, 'strokeCap', ['none', 'round', 'square'], (v) => (line.strokeCap = v), 'round');
    select(stage.bar!, 'strokeJoin', ['miter', 'bevel', 'round'], (v) => (line.strokeJoin = v), 'round');
    select(stage.bar!, 'strokeAlign', ['inside', 'center', 'outside'], (v) => (line.strokeAlign = v), 'center');
    checkbox(stage.bar!, 'dashed', true, (on) => (line.dashPattern = on ? [15, 15] : undefined));
  }

  return stage.dispose;
};

export default mount;
