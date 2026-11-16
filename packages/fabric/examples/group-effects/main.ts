// Groups: opacity, shadow and clipPath on a group act on it as one picture
import { Canvas, Circle, FabricText, Group, Rect, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Each group holds an overlapping rectangle and circle. Group opacity fades the pair as one, the shadow follows their combined outline, and the clipPath cuts both.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const pair = (cx: number): Group =>
    new Group([new Rect({ left: cx - 18, top: 105, width: 62, height: 62, fill: RED }), new Circle({ left: cx + 16, top: 125, radius: 30, fill: BLUE })], { hoverCursor: 'default' });
  const faded = pair(75);
  const shadowed = pair(185);
  const clipped = pair(295);
  const clip = new Circle({ radius: 36 });
  clipped.clipPath = clip;
  faded.opacity = 0.5;
  shadowed.shadow = new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 14, offsetX: 8, offsetY: 10 });
  canvas.add(faded, shadowed, clipped);
  for (const [text, x] of [['opacity', 75], ['shadow', 185], ['clipPath', 295]] as const) {
    canvas.add(new FabricText(text, { left: x, top: 190, fontSize: 15, fontFamily: 'sans-serif', fill: GREEN, selectable: false, evented: false }));
  }

  const draw = (): void => {
    faded.dirty = shadowed.dirty = clipped.dirty = true;
    canvas.requestRenderAll();
  };
  if (stage.bar) {
    slider(stage.bar, 'opacity', 0.1, 1, 0.05, 0.5, (v) => ((faded.opacity = v), draw()), (v) => v.toFixed(2));
    slider(stage.bar, 'shadow blur', 0, 40, 1, 14, (v) => ((shadowed.shadow = new Shadow({ color: 'rgba(0,0,0,0.5)', blur: v, offsetX: 8, offsetY: 10 })), draw()));
    slider(stage.bar, 'clip radius', 10, 70, 1, 36, (v) => ((clip.radius = v), draw()), (v) => `${v}px`);
  } else {
    stage.loop((_dt, t) => {
      faded.opacity = 0.55 + Math.sin(t * 1.6) * 0.4;
      shadowed.shadow = new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 16 + Math.sin(t * 1.6) * 14, offsetX: 8, offsetY: 10 });
      clip.radius = 40 + Math.sin(t * 1.6) * 28;
      draw();
    });
  }

  return stage.dispose;
};

export default mount;
