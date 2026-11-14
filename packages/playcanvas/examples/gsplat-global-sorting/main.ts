// Three interpenetrating splat components, sorted together in one global sort
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, galaxyCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 8, pitch: -20, autoRotate: 8 });
  const { app, stage } = scene;

  // Three components with their own transforms whose splats pass through each other. Every
  // splat of every component goes into one work buffer and one sort, so the overlap is
  // ordered splat by splat instead of component by component.
  const parts = [0, 1, 2].map((i) => {
    const cloud = galaxyCloud(ctx.preview ? 8000 : 12000, 20 + i, 3);
    for (let s = 0; s < cloud.count; s++) {
      // Rotate the colour channels so each galaxy has its own tint.
      const c = cloud.colors;
      const [r, g, b] = [c[s * 4]!, c[s * 4 + 1]!, c[s * 4 + 2]!];
      const rotated = [[r, g, b], [b, r, g], [g, b, r]][i]!;
      c.set(rotated, s * 4);
    }
    const entity = scene.add(cloudContainer(stage.device, cloud), `galaxy-${i}`);
    entity.setEulerAngles(i * 60, i * 40, i * 25);
    return entity;
  });

  let speed = 1;
  app.on('update', (dt: number) => {
    parts.forEach((p, i) => p.rotate(0, (14 + i * 9) * speed * dt, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Rotation speed', 0, 3, 0.1, 1, (v) => (speed = v));
    panel.slider('Separation', 0, 3, 0.1, 0, (v) => parts.forEach((p, i) => p.setPosition((i - 1) * v, 0, 0)));
    panel.readout('3 gsplat components, 1 global sort: set the separation to 0 and they overlap completely');
  }
  return () => scene.dispose();
};

export default mount;
