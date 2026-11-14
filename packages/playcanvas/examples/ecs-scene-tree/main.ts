// The ECS in one scene: an entity tree under app.root, the components on each, and app.systems
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';

const mount: Mount = async (el, ctx) => {
  // Camera, light and a box: the three entities the guide builds first.
  const scene = await createScene(el, ctx, { orbit: false, sun: false });
  const { app, camera } = scene;
  camera.setPosition(0, 1.1, 3.2);
  camera.setEulerAngles(-20, 0, 0);

  const light = new pc.Entity('light');
  light.addComponent('light');
  light.setEulerAngles(45, -30, 0);
  app.root.addChild(light);

  const car = new pc.Entity('car');
  app.root.addChild(car);
  addShape(car, 'box', material('#e8794a'), [0, 0.1, 0], [1.4, 0.5, 0.8], 'body');
  const wheel = addShape(car, 'cylinder', material('#3a3f4c'), [0.5, -0.1, 0.45], [0.4, 0.15, 0.4], 'wheel');
  wheel.setLocalEulerAngles(90, 0, 0);
  const wheel2 = addShape(car, 'cylinder', material('#3a3f4c'), [-0.5, -0.1, 0.45], [0.4, 0.15, 0.4], 'wheel');
  wheel2.setLocalEulerAngles(90, 0, 0);
  camera.setPosition(0, 1.4, 3.6);

  app.on('update', (dt: number) => {
    car.rotate(0, 30 * dt, 0);
    wheel.rotateLocal(0, 200 * dt, 0);
    wheel2.rotateLocal(0, 200 * dt, 0);
  });

  if (!ctx.preview) {
    // Every entity's components sit in entity.c, keyed by the system's name.
    const lines: string[] = [];
    const walk = (e: pc.GraphNode, depth: number): void => {
      const comps = Object.keys((e as pc.Entity).c ?? {});
      lines.push(`${'  '.repeat(depth)}${e.name}${comps.length ? `  [${comps.join(', ')}]` : ''}`);
      e.children.forEach((c) => walk(c, depth + 1));
    };
    walk(app.root, 0);
    const pre = document.createElement('pre');
    Object.assign(pre.style, { margin: 0, padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-surface)', color: 'var(--fg-1)', fontSize: '0.8rem', overflow: 'auto' });
    const registry = app.systems as unknown as Record<string, unknown>;
    const systems = ['render', 'camera', 'light', 'script', 'sound', 'particlesystem'].filter((n) => registry[n]);
    pre.textContent = `${lines.join('\n')}\n\napp.systems: ${systems.join(', ')} (and the rest of the built-in set)`;
    el.append(pre);
  }

  return () => scene.dispose();
};

export default mount;
