// Colors: overlayWith() mixes another colour in at 50 percent
import { Canvas, Color, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { swatch } from '../../shared/colors.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Row: each base colour overlaid with the colour chosen below. overlayWith always blends half and half, and keeps the base alpha.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const bases = ['#f55', '#5f5', '#55f', '#fc0', '#ffffff', '#222222'];
  const parts = bases.map((b, i) => {
    const x = 18 + i * 55;
    const [base] = swatch(b, x, 26, 46, 46);
    const [out, label] = swatch('#000', x, 112, 46, 46, '');
    canvas.add(base!, out!, label!);
    return { source: b, out: out!, label: label! as FabricText };
  });
  canvas.add(new FabricText('base', { left: 18, top: 12, originX: 'left', originY: 'top', fontSize: 11, fill: '#666', selectable: false }));
  canvas.add(new FabricText('overlaid', { left: 18, top: 98, originX: 'left', originY: 'top', fontSize: 11, fill: '#666', selectable: false }));
  const overlayChip = swatch('#000', 18, 200, 324, 22)[0]!;
  canvas.add(overlayChip);

  const apply = (over: string): void => {
    overlayChip.set('fill', over);
    for (const p of parts) {
      const mixed = new Color(p.source).overlayWith(over); // mutates the new Color, not p.source
      p.out.set('fill', mixed.toRgba());
      p.label.set('text', mixed.toHex());
    }
    say(`overlayWith(${over}); #f55 -> #${new Color('#f55').overlayWith(over).toHex()}`);
    canvas.requestRenderAll();
  };

  const picks = ['#3b7dd8', '#e94b3c', '#2e9e5b', '#8e6bd8'];
  apply(picks[0]!);
  if (stage.preview) {
    let k = 0;
    stage.every(1000, () => apply(picks[++k % picks.length]!));
  } else color(stage.bar!, 'overlay', picks[0]!, apply);

  return stage.dispose;
};

export default mount;
