// The default GSplatFormat: centre, colour, scale and rotation streams
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { discShellCloud, createSplatScene } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 2600;
const h = pc.FloatPacking.float2Half;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 5.5, pitch: -15 });
  const { device } = scene.stage;
  const cloud = discShellCloud(COUNT, 1.4);

  const format = pc.GSplatFormat.createDefaultFormat(device);
  const container = new pc.GSplatContainer(device, COUNT, format);

  // dataCenter is RGBA32F: xyz as floats, w unused. The centers array feeds the sorter.
  const centerTex = container.getTexture('dataCenter')!;
  const center = centerTex.lock() as Float32Array;
  for (let i = 0; i < COUNT; i++) {
    for (let k = 0; k < 3; k++) {
      center[i * 4 + k] = cloud.positions[i * 3 + k]!;
      container.centers[i * 3 + k] = cloud.positions[i * 3 + k]!;
    }
  }
  centerTex.unlock();

  // dataColor is RGBA16F: half floats, so pack with FloatPacking.
  const colorTex = container.getTexture('dataColor')!;
  const color = colorTex.lock() as Uint16Array;
  for (let i = 0; i < COUNT * 4; i++) color[i] = h(cloud.colors[i]!);
  colorTex.unlock();

  // dataScale is RGBA16F: the Gaussian's extent along its own x, y and z.
  const writeScale = (thickness: number): void => {
    const tex = container.getTexture('dataScale')!;
    const data = tex.lock() as Uint16Array;
    for (let i = 0; i < COUNT; i++) data.set([h(0.085), h(0.085), h(thickness)], i * 4);
    tex.unlock();
  };
  // dataRotation is RGBA16F: a quaternion xyzw, with w stored directly.
  const writeRotation = (aligned: boolean): void => {
    const tex = container.getTexture('dataRotation')!;
    const data = tex.lock() as Uint16Array;
    for (let i = 0; i < COUNT; i++) {
      for (let k = 0; k < 4; k++) data[i * 4 + k] = h(aligned ? cloud.rotations[i * 4 + k]! : k === 3 ? 1 : 0);
    }
    tex.unlock();
  };
  writeScale(0.012);
  writeRotation(true);

  container.aabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(1.6, 1.6, 1.6));
  container.update(COUNT);
  scene.add(container, 'discs');

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Thickness (dataScale z)', 0.004, 0.085, 0.002, 0.012, (v) => {
      writeScale(v);
      container.update(COUNT, false);
    });
    panel.check('Rotate discs outwards (dataRotation)', true, (on) => {
      writeRotation(on);
      container.update(COUNT, false);
    });
    panel.readout(`streams: ${format.streams.map((s) => s.name).join(', ')}`);
  }

  return () => scene.dispose();
};

export default mount;
