// Shadows: new Shadow('10px 10px 5px red') reads a CSS-like string
import { Canvas, Circle, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Format: "offsetX offsetY blur color". Edit the string; the parsed Shadow shows what it understood, and toString() writes it back.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const disc = new Circle({ left: 180, top: 110, radius: 55, fill: '#fcd34d' });
  canvas.add(disc);

  const apply = (css: string): void => {
    const shadow = new Shadow(css);
    disc.set('shadow', shadow);
    say(`offsetX ${shadow.offsetX}  offsetY ${shadow.offsetY}  blur ${shadow.blur}  color ${shadow.color}   toString(): ${shadow.toString()}`);
    canvas.requestRenderAll();
  };

  const samples = ['10px 10px 5px rgba(0,0,0,0.5)', '-12px 8px 0px #e94b3c', '0 0 25px #3b7dd8', '15 -15 10 rgb(46,158,91)'];
  apply(samples[0]!);
  if (stage.preview) {
    let k = 0;
    stage.every(1300, () => apply(samples[++k % samples.length]!));
  } else {
    const box = document.createElement('input');
    Object.assign(box, { type: 'text', value: samples[0], spellcheck: false });
    box.style.cssText = 'font:13px ui-monospace,monospace;width:300px';
    box.addEventListener('input', () => apply(box.value));
    stage.bar!.prepend('shadow', box);
  }

  return stage.dispose;
};

export default mount;
