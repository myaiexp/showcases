// toObject() writes a gradient to plain data, new Gradient() reads it back
import { Canvas, Gradient, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['original', 'from toObject()'],
    scene: [180, 160],
    hint: 'The right rectangle is filled with new Gradient(JSON.parse(JSON.stringify(gradient.toObject()))). The plain data is printed below.',
  });
  const [p1, p2] = stage.panes;
  const one = stage.own(new Canvas(p1!.el), p1);
  const two = stage.own(new Canvas(p2!.el), p2);

  const makers = {
    linear: () => new Gradient({ type: 'linear', coords: { x1: 0, y1: 0, x2: 120, y2: 120 }, colorStops: [{ offset: 0, color: '#e94b3c' }, { offset: 1, color: '#3b7dd8' }] }),
    radial: () => new Gradient({ type: 'radial', coords: { x1: 60, y1: 60, r1: 0, x2: 60, y2: 60, r2: 70 }, colorStops: [{ offset: 0, color: '#fff7c2' }, { offset: 1, color: '#2e9e5b' }] }),
    percentage: () => new Gradient({ type: 'linear', gradientUnits: 'percentage', coords: { x1: 0, y1: 0, x2: 1, y2: 0 }, colorStops: [{ offset: 0, color: '#8e6bd8' }, { offset: 0.5, color: '#fff' }, { offset: 1, color: '#fcd34d' }] }),
  };
  type Kind = keyof typeof makers;
  const a = new Rect({ left: 90, top: 80, width: 120, height: 120 });
  const b = new Rect({ left: 90, top: 80, width: 120, height: 120 });
  one.add(a);
  two.add(b);

  let pre: HTMLPreElement | null = null;
  if (!stage.preview) {
    pre = document.createElement('pre');
    pre.style.cssText = 'font:12px/1.4 ui-monospace,monospace;color:var(--fg-2);max-width:760px;white-space:pre-wrap;margin:0';
    stage.box.append(pre);
  }
  const show = (kind: Kind): void => {
    const gradient = makers[kind]();
    const data = JSON.parse(JSON.stringify(gradient.toObject())) as ConstructorParameters<typeof Gradient>[0];
    a.set('fill', gradient);
    b.set('fill', new Gradient(data));
    if (pre) pre.textContent = JSON.stringify(data);
    one.requestRenderAll();
    two.requestRenderAll();
  };

  const kinds = Object.keys(makers) as Kind[];
  show(kinds[0]!);
  if (stage.preview) {
    let k = 0;
    stage.every(1300, () => show(kinds[++k % kinds.length]!));
  } else select(stage.bar!, 'gradient', kinds, show);

  return stage.dispose;
};

export default mount;
