// Layout: origin as a name, a percentage point or a pixel point
import type { IAlign, IUnitPointData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive, pick } from '../../shared/shapes.ts';

// each form with where it lands on the rect (fractions of its 50 px size), for the white dot
const FORMS: Record<string, { at: { x: number; y: number }; value: (k: number) => IAlign | IUnitPointData }> = {
  "'center'": { at: { x: 0.5, y: 0.5 }, value: () => 'center' },
  "'top-left'": { at: { x: 0, y: 0 }, value: () => 'top-left' },
  "'bottom-right'": { at: { x: 1, y: 1 }, value: () => 'bottom-right' },
  "{ type: 'percent', x: 0.5, y: 0.5 }": { at: { x: 0.5, y: 0.5 }, value: () => ({ type: 'percent', x: 0.5, y: 0.5 }) },
  '{ x: 50, y: 50 } (pixels)': { at: { x: 1, y: 1 }, value: (k) => ({ x: 50 * k, y: 50 * k }) },
  '{ x: 0, y: 25 } (pixels)': { at: { x: 0, y: 0.5 }, value: (k) => ({ x: 0, y: 25 * k }) },
};

const mount: Mount = (el, ctx) => {
  const { stage, rect, k, pivot } = anchorScene(el, ctx, 'origin', "Pick a form: that point of the 50 px rect is the white dot. Pixel points are in the docs' units, scaled to the pane.");
  drive(stage, 'rotation', [-180, 180, 1], 0, (v) => (rect.rotation = v), 6);
  pick(stage, 'origin', Object.keys(FORMS), (name) => {
    const form = FORMS[name]!;
    rect.origin = form.value(k);
    pivot(form.at);
  }, 2200);

  return stage.dispose;
};

export default mount;
