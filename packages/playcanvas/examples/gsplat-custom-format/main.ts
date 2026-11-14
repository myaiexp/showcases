// A custom GSplatFormat: an RGBA8 stream decoded in shader code
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createSplatScene, rng } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 5000;
const RANGE = 3; // the shader maps texel rgb 0..1 to -RANGE/2 .. RANGE/2

const readGLSL = /* glsl */ `
  uniform vec3 uTint;
  uniform vec3 uTint2;
  vec4 splatData; // global, so the texture is sampled once

  vec3 getCenter() {
    // getCenter always runs first: sample here
    splatData = loadData();
    return (splatData.rgb - 0.5) * ${RANGE.toFixed(1)};
  }
  vec4 getColor() {
    vec3 tint = mix(uTint2, uTint, splatData.a);
    return vec4(tint, 0.9);
  }
  vec3 getScale() { return vec3(0.045); }
  vec4 getRotation() { return vec4(0.0, 0.0, 0.0, 1.0); }
`;
const readWGSL = /* wgsl */ `
  uniform uTint: vec3f;
  uniform uTint2: vec3f;
  var<private> splatData: vec4f;

  fn getCenter() -> vec3f {
    splatData = loadData();
    return (splatData.rgb - 0.5) * ${RANGE.toFixed(1)};
  }
  fn getColor() -> vec4f {
    let tint = mix(uniform.uTint2, uniform.uTint, splatData.a);
    return vec4f(tint, 0.9);
  }
  fn getScale() -> vec3f { return vec3f(0.045); }
  fn getRotation() -> vec4f { return vec4f(0.0, 0.0, 0.0, 1.0); }
`;

const TINTS: [number[], number[]][] = [
  [[1, 0.35, 0.2], [1, 0.9, 0.3]],
  [[0.2, 0.6, 1], [0.7, 0.3, 1]],
  [[0.2, 1, 0.5], [0.1, 0.4, 0.5]],
];

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 8, pitch: -20 });
  const { device } = scene.stage;

  const format = new pc.GSplatFormat(device, [{ name: 'data', format: pc.PIXELFORMAT_RGBA8 }], { readGLSL, readWGSL });
  const container = new pc.GSplatContainer(device, COUNT, format);

  // Each splat is one RGBA8 texel: a point on a sphere shell, and its height as the gradient.
  const tex = container.getTexture('data')!;
  const bytes = tex.lock() as Uint8Array;
  const r = rng(21);
  for (let i = 0; i < COUNT; i++) {
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const p = [Math.cos(a) * s, u, Math.sin(a) * s];
    bytes.set([...p.map((v) => Math.round((v * 0.5 * 0.9 + 0.5) * 255)), Math.round((u * 0.5 + 0.5) * 255)], i * 4);
    // centers must match what getCenter() returns
    container.centers.set(p.map((v) => v * 0.45 * RANGE), i * 3);
  }
  tex.unlock();
  container.aabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(RANGE / 2, RANGE / 2, RANGE / 2));
  container.update(COUNT);

  // One container, three components, three sets of uniforms.
  const entities = TINTS.map(([tint, tint2], i) => {
    const entity = scene.add(container, `instance-${i}`);
    entity.setPosition((i - 1) * 3.2, 0, 0);
    entity.gsplat!.setParameter('uTint', tint!);
    entity.gsplat!.setParameter('uTint2', tint2!);
    return entity;
  });
  scene.app.on('update', (dt: number) => entities.forEach((e, i) => e.rotate(0, 20 * (i + 1) * dt, 0)));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout(`format streams: ${format.streams.map((s) => `${s.name} (RGBA8)`).join(', ')}; one container, ${entities.length} components`);
  }
  return () => scene.dispose();
};

export default mount;
