// Console logging from a script: levels, context, conditions, mirrored on page
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { Mover, type Level } from './mover.ts';

const COLOURS: Record<Level, string> = { log: '#e8ebf2', info: '#7bc3ff', warn: '#f2c14e', error: '#ff7b7b', debug: '#8a93a8' };
const LINES = 7;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 10, orbit: { distance: 9, pitch: -50, autoRotate: 0 }, sun: { shadows: true } });
  const { app } = scene;

  // The page console: every message the script logs also lands here, coloured by level.
  const layer = addCanvasLabels(scene.stage.canvas, []);
  const out = document.createElement('div');
  Object.assign(out.style, { position: 'absolute', left: '6px', bottom: '6px', right: '6px', padding: '4px 8px', font: '11px/1.4 monospace', background: 'rgba(10,12,18,0.72)', borderRadius: '4px', overflow: 'hidden' });
  layer.append(out);
  const sink = (level: Level, text: string): void => {
    // Cards stay off the real console: six galleries' worth of lines would drown it.
    if (!ctx.preview) console[level](text);
    const row = document.createElement('div');
    row.style.color = COLOURS[level];
    row.textContent = `${level.padEnd(5)} ${text}`;
    out.append(row);
    while (out.childElementCount > LINES) out.firstElementChild!.remove();
  };

  const target = new pc.Entity('RequiredTarget');
  target.addComponent('render', { type: 'cone', material: material('#7bc67b'), castShadows: true });
  target.setLocalScale(0.5, 0.7, 0.5);
  target.setLocalPosition(2.5, 0.35, 0);
  app.root.addChild(target);

  let walker: pc.Entity | null = null;
  let script: Mover | null = null;
  const spawn = (): void => {
    walker?.destroy();
    walker = new pc.Entity('Walker');
    walker.addComponent('render', { type: 'box', material: material('#e8794a'), castShadows: true });
    walker.setLocalScale(0.5, 0.5, 0.5);
    walker.setLocalPosition(-3, 0.25, 0);
    walker.addComponent('script');
    app.root.addChild(walker);
    // The sink is a property, so initialize can already log through it.
    script = walker.script!.create(Mover, { properties: { sink } }) as Mover;
  };
  spawn();

  // The scene runs on its own: the target orbits, so the walker keeps chasing and crossing the 0.4 threshold.
  let t = 0;
  let resetAt = 4;
  app.on('update', (dt: number) => {
    t += dt;
    if (target.parent) target.setLocalPosition(Math.cos(t * 0.5) * 3, 0.35, Math.sin(t * 0.5) * 2);
    if (ctx.preview && t > resetAt) {
      resetAt = t + 5;
      if (script) script.speed = script.speed < 0 ? 1.5 : -1;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('speed (negative warns)', -2, 4, 0.5, 1.5, (v) => {
      if (script) script.speed = v;
    });
    panel.button('remove RequiredTarget, restart', () => {
      target.parent?.removeChild(target);
      spawn();
    });
    panel.button('restore target, restart', () => {
      if (!target.parent) app.root.addChild(target);
      spawn();
    });
    panel.readout('Click the canvas and press Space for an info line. Open the browser console: the same messages are there.');
  }

  return () => {
    walker?.destroy();
    scene.dispose();
  };
};

export default mount;
