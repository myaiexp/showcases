// A GSplatContainer in the simple format: centre xyz + one size, and a colour
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createSplatScene, hue } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 8000;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 7, pitch: -12 });
  const { device } = scene.stage;

  // 1. The format says which texture streams exist: dataCenter (xyz + size) and dataColor.
  const format = pc.GSplatFormat.createSimpleFormat(device);
  // 2. The container has a fixed capacity.
  const container = new pc.GSplatContainer(device, COUNT, format);

  // 3. Lock the streams, write one splat per index, unlock.
  const fill = (size: number): void => {
    const centerTex = container.getTexture('dataCenter')!;
    const colorTex = container.getTexture('dataColor')!;
    const centerData = centerTex.lock() as Float32Array;
    const colorData = colorTex.lock() as Uint16Array;
    const centers = container.centers; // 4. xyz per splat, used by the sorter
    const h = pc.FloatPacking.float2Half;
    for (let i = 0; i < COUNT; i++) {
      // Two strands of a double helix, 12 turns.
      const t = (i / COUNT) * Math.PI * 24;
      const strand = i % 2 ? Math.PI : 0;
      const x = Math.cos(t + strand) * 1.2;
      const y = (i / COUNT) * 6 - 3;
      const z = Math.sin(t + strand) * 1.2;
      centerData.set([x, y, z, size], i * 4);
      centers.set([x, y, z], i * 3);
      const [r, g, b] = hue(i / COUNT, 0.65, 1);
      colorData.set([h(r), h(g), h(b), h(1)], i * 4);
    }
    centerTex.unlock();
    colorTex.unlock();
  };
  fill(0.05);
  container.aabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(1.4, 3.1, 1.4));
  // 5. Tell the container how many splats to draw (up to maxSplats).
  container.update(COUNT);

  scene.add(container, 'helix');

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Splat size', 0.01, 0.15, 0.005, 0.05, (v) => {
      fill(v);
      container.update(COUNT, false);
    });
    panel.readout(`${container.maxSplats} splats, streams: ${format.streams.map((s) => s.name).join(', ')}`);
  }

  return () => scene.dispose();
};

export default mount;
