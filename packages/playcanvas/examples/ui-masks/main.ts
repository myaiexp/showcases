// Masks: clip children to a rectangle, a texture shape, nested masks
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi, imageTexture } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx, { deviceOptions: { stencil: true } });
  const circle = imageTexture(ui.stage.device, 128, 128, (g) => {
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(64, 64, 62, 0, Math.PI * 2);
    g.fill();
  });
  const label = (text: string, x: number): void => void addText(ui, ui.screen, text, { fontSize: 20, color: color(COL.dim) }, [x, -90]);

  // Anything below a mask is drawn only inside it. The first child is the mask's background.
  const withBackdrop = (mask: pc.Entity): void => void addElement(mask, 'backdrop', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.panel) });

  const rect = addElement(ui.screen, 'rect mask', { width: 150, height: 110, mask: true }, [-200, 20]);
  withBackdrop(rect);
  const blob = addElement(rect, 'blob', { width: 120, height: 120, color: color(COL.accent) });
  label('rectangle', -200);

  // With a texture, the mask takes the shape of the texture's opaque pixels.
  const shaped = addElement(ui.screen, 'shaped mask', { width: 130, height: 130, mask: true, texture: circle }, [0, 20]);
  withBackdrop(shaped);
  const bar = addElement(shaped, 'bar', { width: 220, height: 40, color: color(COL.blue) });
  label('texture shape', 0);

  // A mask inside a mask: the child shows only where both overlap.
  const outer = addElement(ui.screen, 'outer mask', { width: 130, height: 130, mask: true }, [200, 20]);
  withBackdrop(outer);
  const inner = addElement(outer, 'inner mask', { width: 100, height: 100, mask: true });
  const big = addElement(inner, 'big', { width: 170, height: 170, color: color(COL.green) });
  label('nested', 200);

  const state = { speed: 1 };
  let t = 0;
  ui.app.on('update', (dt: number) => {
    t += dt * state.speed;
    blob.setLocalPosition(Math.cos(t) * 60, Math.sin(t * 1.3) * 40, 0);
    bar.setLocalEulerAngles(0, 0, t * 50);
    inner.setLocalPosition(Math.cos(t * 0.8) * 30, Math.sin(t) * 30, 0);
    big.setLocalEulerAngles(0, 0, t * 40);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('speed', 0, 3, 0.1, 1, (v) => (state.speed = v));
    panel.readout('Each mask costs two draw calls; input is clipped to the mask too.');
  }

  return () => {
    circle.destroy();
    ui.dispose();
  };
};

export default mount;
