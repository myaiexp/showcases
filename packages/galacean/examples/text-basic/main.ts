// TextRenderer: text, color and fontSize on an entity
import { Color, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { slider, color } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await scene2d(el, ctx, { size: 4 });
  const entity = root.createChild('text');
  const text = entity.addComponent(TextRenderer);
  text.text = 'Galacean Text Rendering';
  text.fontSize = 48;
  text.color = new Color(1, 0.35, 0.3, 1);
  if (stage.preview) {
    tick(root, (_dt, t) => {
      text.color.set(0.6 + 0.4 * Math.sin(t * 2), 0.5 + 0.5 * Math.sin(t * 2 + 2), 0.6 + 0.4 * Math.sin(t * 2 + 4), 1);
      text.fontSize = 44 + 8 * Math.sin(t * 1.5);
    });
  } else {
    slider(stage.bar, 'fontSize', 12, 120, 1, 48, (v) => (text.fontSize = v));
    color(stage.bar, 'color', [1, 0.35, 0.3], ([r, g, b]) => text.color.set(r ** 2.2, g ** 2.2, b ** 2.2, 1));
    const input = document.createElement('input');
    input.value = text.text;
    input.style.cssText = 'min-width:240px';
    input.addEventListener('input', () => (text.text = input.value));
    stage.bar.append('text', input);
  }
  return stage.dispose;
};

export default mount;
