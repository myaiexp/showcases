// GsplatMesh: triangles of a mesh hierarchy rasterised into splats
import * as pc from 'playcanvas';
// The scripts ship as plain JavaScript without type definitions.
// @ts-expect-error untyped module
import { GSplatMesh } from 'playcanvas/scripts/esm/gsplat/gsplat-mesh.mjs';
import type { Mount } from '@/types.ts';
import { createSplatScene } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

interface MeshSplat {
  buildFromEntity(entity: pc.Entity, options: { splatSize?: number; recursive?: boolean; margin?: number }): void;
  readonly splatCount: number;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 9, pitch: -22, autoRotate: 0 });
  const { app } = scene;

  // The source meshes: StandardMaterials whose emissive colour becomes the splat colour.
  const source = new pc.Entity('source');
  const parts: ['box' | 'sphere' | 'torus', string, number[]][] = [
    ['box', '#ff7a45', [-1.1, 0, 0]],
    ['sphere', '#3fd0c9', [0.2, 0.2, 0.3]],
    ['torus', '#b58cff', [1.2, -0.3, -0.2]],
  ];
  for (const [type, hex, pos] of parts) {
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color().fromString(hex);
    material.emissive = new pc.Color().fromString(hex);
    material.update();
    const part = new pc.Entity(type);
    part.addComponent('render', { type, material });
    part.setLocalPosition(pos[0]!, pos[1]!, pos[2]!);
    part.setLocalScale(type === 'torus' ? 1.4 : 1.2, type === 'torus' ? 1.4 : 1.2, type === 'torus' ? 1.4 : 1.2);
    source.addChild(part);
  }
  app.root.addChild(source);
  const renders = source.findComponents('render') as pc.RenderComponent[];
  const showSource = (on: boolean): void => {
    const layers = on ? [pc.LAYERID_WORLD] : [];
    for (const r of renders) r.layers = layers;
  };
  showSource(false); // splats only, until the reader asks for the meshes

  const light = new pc.Entity('light');
  light.addComponent('light', { type: 'directional' });
  light.setEulerAngles(40, 30, 0);
  app.root.addChild(light);

  // The script goes on the entity that will hold the splats.
  const splats = new pc.Entity('splats');
  app.root.addChild(splats);
  splats.addComponent('script');
  const meshSplat = splats.script!.create(GSplatMesh) as unknown as MeshSplat;
  const build = (splatSize: number): void => meshSplat.buildFromEntity(source, { splatSize, recursive: true });
  build(ctx.preview ? 0.07 : 0.05);

  app.on('update', (dt: number) => {
    source.rotate(0, 25 * dt, 0);
    splats.rotate(0, 25 * dt, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const count = panel.readout();
    const update = (v: number): void => {
      build(v);
      count.textContent = `${meshSplat.splatCount} splats`;
    };
    panel.slider('splatSize', 0.025, 0.12, 0.005, 0.05, update);
    panel.check('Show the source meshes', false, (on) => {
      showSource(on);
      source.setPosition(on ? 2.8 : 0, 0, 0);
      splats.setPosition(on ? -2.8 : 0, 0, 0);
    });
    count.textContent = `${meshSplat.splatCount} splats`;
  }

  return () => scene.dispose();
};

export default mount;
