// autoRender = false: a product viewer that renders only when something changes
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const PARTS = ['#e8794a', '#4ab3e8', '#7bc67b', '#f2c14e', '#a78bfa'];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 5, pitch: -20, autoRotate: 0 }, floor: 8, sun: { shadows: true }, clear: '#1b2030' });
  const { app, stage } = scene;

  // A "product": three parts whose colour the user can change.
  const mats = [material(PARTS[0]!, { metalness: 0.3, gloss: 0.7 }), material('#d8dce4', { metalness: 0.8, gloss: 0.8 })];
  const body = new pc.Entity('body');
  body.addComponent('render', { type: 'capsule', material: mats[0]!, castShadows: true });
  body.setLocalPosition(0, 1.0, 0);
  const ring = new pc.Entity('ring');
  ring.addComponent('render', { type: 'torus', material: mats[1]!, castShadows: true });
  ring.setLocalPosition(0, 1.0, 0);
  ring.setLocalScale(1.6, 1.6, 1.6);
  app.root.addChild(body);
  app.root.addChild(ring);

  // Counters: ticks the app made, and the frames it actually rendered.
  let ticks = 0;
  let rendered = 0;
  const onTick = (): void => void ticks++;
  const onRender = (): void => void rendered++;
  app.on('frameupdate', onTick);
  app.on('framerender', onRender);

  const layer = addCanvasLabels(stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  // Anything that changes what is on screen asks for one more frame.
  const redraw = (): void => {
    app.renderNextFrame = true;
  };
  let colour = 0;
  const recolour = (): void => {
    colour = (colour + 1) % PARTS.length;
    mats[0]!.diffuse = new pc.Color().fromString(PARTS[colour]!);
    mats[0]!.update();
    redraw();
  };
  const ac = new AbortController();
  if (!ctx.preview) stage.canvas.addEventListener('pointermove', (e) => e.buttons && redraw(), { signal: ac.signal });
  stage.canvas.addEventListener('wheel', redraw, { signal: ac.signal, passive: true });

  app.autoRender = false;
  redraw();
  let t = 0;
  let shown = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) {
      // Cards cannot be clicked: a colour change every 1.5 s is the only reason to draw.
      if (t > 1.5) {
        t = 0;
        recolour();
      }
    }
    if (shown > 0.3) {
      shown = 0;
      out.textContent = `autoRender: ${app.autoRender}\nticks: ${ticks}\nframes rendered: ${rendered}`;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('autoRender', false, (on) => {
      app.autoRender = on;
      if (!on) redraw();
    });
    panel.button('change colour', recolour);
    panel.button('renderNextFrame', redraw);
    panel.readout('Drag to orbit: each pointer move asks for a frame. Idle, the counters show ticks passing without rendering.');
  }

  return () => {
    ac.abort();
    app.off('frameupdate', onTick);
    app.off('framerender', onRender);
    app.autoRender = true;
    mats.forEach((m) => m.destroy());
    scene.dispose();
  };
};

export default mount;
