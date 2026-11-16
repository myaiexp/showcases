// A FabricText as a group's clip path: the colours show through the letters
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'Type your own text: the letters are the clip path.' });
  const canvas = stage.own(new Canvas(stage.el));

  const group = quad(150, 120);
  canvas.add(group);

  void loadFonts().then(() => {
    if (stage.disposed) return;
    // measured at creation: the font must be loaded before the text exists
    const clipPath = new FabricText("Hi I'm the\nnew ClipPath!\nI hope we'll\nbe friends", {
      fontFamily: 'Inter', fontWeight: 800, fontSize: 30, lineHeight: 1, textAlign: 'center',
    });
    group.clipPath = clipPath;
    group.set('dirty', true);
    canvas.requestRenderAll();

    if (stage.bar) {
      const input = document.createElement('textarea');
      input.rows = 3;
      input.value = clipPath.text;
      input.style.cssText = 'font:13px ui-monospace,monospace;width:240px';
      input.addEventListener('input', () => {
        clipPath.set('text', input.value || ' ');
        group.set('dirty', true);
        canvas.requestRenderAll();
      });
      stage.bar.append(input);
      slider(stage.bar, 'size', 14, 60, 1, 30, (v) => {
        clipPath.set('fontSize', v);
        group.set('dirty', true);
        canvas.requestRenderAll();
      });
    } else {
      stage.loop((_dt, t) => {
        group.rotate(Math.sin(t) * 12);
        canvas.requestRenderAll();
      });
    }
  });
  return stage.dispose;
};

export default mount;
