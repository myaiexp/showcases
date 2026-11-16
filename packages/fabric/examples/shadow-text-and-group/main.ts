// Shadows: a shadow on text, and one on a Group that wraps its children
import { Canvas, FabricText, Group, Rect, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Left, text: its own shadow. Right: one shadow on a Group, cast by the pair as a whole; the children have none.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  void loadFonts().then(() => {
    if (stage.disposed) return;
    const text = new FabricText('Shadow', {
      left: 108,
      top: 120,
      fontFamily: 'Inter',
      fontWeight: 800,
      fontSize: 42,
      fill: '#3b7dd8',
      shadow: new Shadow({ color: 'rgba(59,125,216,0.45)', blur: 6, offsetX: 5, offsetY: 5 }),
    });
    const group = new Group([new Rect({ left: -22, top: 0, width: 50, height: 50, fill: '#e94b3c' }), new Rect({ left: 22, top: 12, width: 50, height: 50, fill: '#fcd34d' })], {
      left: 275,
      top: 120,
      shadow: new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 12, offsetX: 10, offsetY: 10 }),
    });
    canvas.add(text, group);
    say('FabricText.shadow and Group.shadow');

    if (stage.preview) {
      stage.loop((_dt, t) => {
        const dx = 10 * Math.cos(t * 1.4), dy = 10 * Math.sin(t * 1.4);
        text.shadow = new Shadow({ color: 'rgba(59,125,216,0.45)', blur: 6, offsetX: dx, offsetY: dy });
        group.shadow = new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 12, offsetX: -dx, offsetY: -dy });
        text.dirty = true;
        canvas.requestRenderAll();
      });
    }
  });

  return stage.dispose;
};

export default mount;
