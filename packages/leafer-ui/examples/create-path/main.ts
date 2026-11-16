// Basics: a Path built from an SVG path string
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A leaf drawn from SVG path commands.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const path = new Path({
    x: u(60),
    y: u(20),
    scale: stage.preview ? 0.14 : 0.25,
    path: 'M500 40C760 120 940 340 900 620C860 860 640 960 500 960C360 960 140 860 100 620C60 340 240 120 500 40Z M500 120L500 900',
    fill: GREEN,
    stroke: '#1a7a45',
    strokeWidth: 20,
  });
  leafer.add(path);

  if (stage.preview) bob(stage, path);

  return stage.dispose;
};

export default mount;
