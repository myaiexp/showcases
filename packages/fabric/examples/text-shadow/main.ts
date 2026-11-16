// Text: a Shadow on text, built from an options object or from a CSS-like string
import { Canvas, FabricText, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: "The lower line uses the string form: shadow: new Shadow('green -5px -5px 3px')." });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const shadow = new Shadow({ color: 'rgba(0,0,0,0.35)', offsetX: 6, offsetY: 6, blur: 6 });
  const text = new FabricText('Shadow', { left: 180, top: 85, fontFamily: 'Lora', fontSize: 70, fontWeight: 700, fill: INK, shadow });
  const other = new FabricText("I'm a text with shadow", { left: 180, top: 180, fontFamily: 'Kalam', fontSize: 28, fill: BLUE, shadow: new Shadow('green -5px -5px 3px') });
  canvas.add(text, other);

  const say = status(stage);
  const apply = (): void => {
    text.set('dirty', true);
    say(`offset ${shadow.offsetX.toFixed(0)}, ${shadow.offsetY.toFixed(0)} · blur ${shadow.blur.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    slider(stage.bar, 'offsetX', -20, 20, 1, 6, (v) => ((shadow.offsetX = v), apply()));
    slider(stage.bar, 'offsetY', -20, 20, 1, 6, (v) => ((shadow.offsetY = v), apply()));
    slider(stage.bar, 'blur', 0, 30, 1, 6, (v) => ((shadow.blur = v), apply()));
    color(stage.bar, 'color', '#555555', (v) => ((shadow.color = v), apply()));
  } else {
    stage.loop((_dt, t) => {
      shadow.offsetX = 10 * Math.cos(t * 1.6);
      shadow.offsetY = 10 * Math.sin(t * 1.6);
      shadow.blur = 7 + 6 * Math.sin(t * 0.9);
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
