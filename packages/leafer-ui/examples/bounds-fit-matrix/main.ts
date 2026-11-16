// Bounds: the matrix that fits a content region into a thumbnail box
import { Bounds, Leafer, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, f1, outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: the content and its region. Right: the box (grey) and the content after the fit matrix. baseScale caps how far it may grow.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.5 : 0.9;
  const region = { x: 20, y: stage.height * 0.12, width: 200 * k * 1.4, height: 140 * k * 1.4 };
  const star = [
    [0.5, 0], [0.62, 0.35], [1, 0.38], [0.7, 0.62], [0.8, 1], [0.5, 0.78], [0.2, 1], [0.3, 0.62], [0, 0.38], [0.38, 0.35],
  ].map(([u, v]) => ({ x: region.x + u! * region.width, y: region.y + v! * region.height }));
  outlineOf(leafer, '#bbb').set(cornersOf(region));
  outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.2)').set(star);
  const box = outlineOf(leafer, '#999');
  const thumb = outlineOf(leafer, '#32cd79', 'rgba(50,205,121,0.25)');
  const say = label(stage, '', true);
  const home = { x: region.x + region.width + 30, y: region.y };

  let w = 80;
  let base = 1;
  const run = (): void => {
    const target = new Bounds(0, 0, w, w * 0.6);
    box.set(cornersOf({ ...home, width: w, height: w * 0.6 }));
    const m = target.getFitMatrix(region, base); // region -> inside target, corner at 0,0
    thumb.set(star.map((p) => new Point(p).toOuterOf(m).move(home)));
    say(`box ${f1(w)} x ${f1(w * 0.6)}  getFitMatrix(region, ${base})  scale ${m.a.toFixed(2)}`);
  };
  pick(stage, 'baseScale', ['1', '2'] as const, (v) => ((base = Number(v)), run()), 4400);
  drive(stage, 'box width', [30, stage.preview ? 60 : 420, 2], 80, (v) => ((w = v), run()), 6);
  return stage.dispose;
};

export default mount;
