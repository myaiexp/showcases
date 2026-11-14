// Image elements: texture, colour tint, opacity and a sub-rectangle (rect)
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi, imageTexture } from '../../shared/ui.ts';

function drawArt(g: CanvasRenderingContext2D): void {
  g.fillStyle = '#e8ebf2';
  g.fillRect(0, 0, 128, 128);
  const quads: [number, number, string][] = [[0, 0, '#e8794a'], [64, 0, '#4ab3e8'], [0, 64, '#7bc67b'], [64, 64, '#a78bfa']];
  for (const [x, y, c] of quads) {
    g.fillStyle = c;
    g.fillRect(x + 4, y + 4, 56, 56);
  }
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.arc(32, 32, 16, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#14171f';
  g.font = 'bold 28px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('1', 32, 33);
}

const LABELS = ['texture', 'rect: top-left', 'color tint', 'opacity'];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const texture = imageTexture(ui.stage.device, 128, 128, drawArt);
  const x = (i: number): number => (i - 1.5) * 150;

  // A stripe behind the last image, so its opacity shows. It comes first: later siblings draw over it.
  addElement(ui.screen, 'stripe', { width: 150, height: 30, color: color(COL.accent) }, [x(3), 10]);
  const images = LABELS.map((label, i) => {
    addText(ui, ui.screen, label, { fontSize: 20, color: color(COL.dim) }, [x(i), -70]);
    return addElement(ui.screen, label, { width: 130, height: 130, texture }, [x(i), 10]);
  });
  const [, partial, tinted, faded] = images as [pc.Entity, pc.Entity, pc.Entity, pc.Entity];

  // `rect` is u, v, width, height in fractions of the texture, from its bottom-left corner.
  partial.element!.rect = new pc.Vec4(0, 0.5, 0.5, 0.5);

  const state = { hue: 0, opacity: 1, auto: true };
  const apply = (): void => {
    const wave = (k: number): number => 0.55 + 0.45 * Math.sin(state.hue + k * 2.1);
    tinted.element!.color = new pc.Color(wave(0), wave(1), wave(2));
    faded.element!.opacity = state.opacity;
  };
  apply();
  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (!state.auto) return;
    t += dt;
    state.hue = t * 1.2;
    state.opacity = 0.5 + 0.5 * Math.sin(t * 1.5);
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('tint', 0, 6.28, 0.05, 0, (v) => ((state.auto = false), (state.hue = v), apply()));
    panel.slider('opacity', 0, 1, 0.01, 1, (v) => ((state.auto = false), (state.opacity = v), apply()));
    panel.slider('rect v', 0, 0.5, 0.01, 0.5, (v) => (partial.element!.rect = new pc.Vec4(0, v, 0.5, 0.5)));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => {
    texture.destroy();
    ui.dispose();
  };
};

export default mount;
