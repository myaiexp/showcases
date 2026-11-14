// A GLB built in memory by GltfExporter, loaded as a container and instantiated
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { BlobUrls } from '../../shared/assets.ts';

/** A small robot of primitives: named nodes in a hierarchy, each with its own material. */
function buildRobot(): pc.Entity {
  const robot = new pc.Entity('robot');
  addShape(robot, 'box', material('#8a90a0'), [0, 1, 0], [1, 1.2, 0.7], 'torso');
  addShape(robot, 'sphere', material('#e8794a'), [0, 2.0, 0], 0.7, 'head');
  addShape(robot, 'cylinder', material('#4ab3e8'), [-0.8, 1.1, 0], [0.25, 1, 0.25], 'left arm');
  addShape(robot, 'cylinder', material('#4ab3e8'), [0.8, 1.1, 0], [0.25, 1, 0.25], 'right arm');
  addShape(robot, 'cone', material('#f2c14e'), [0, 2.65, 0], [0.3, 0.5, 0.3], 'antenna');
  return robot;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, sun: { shadows: !ctx.preview }, orbit: { distance: 11, pitch: -28 } });
  const { app } = scene;
  const urls = new BlobUrls();
  let disposed = false;

  // GltfExporter writes an entity hierarchy to GLB bytes; nothing leaves the browser.
  const source = buildRobot();
  const bytes = await new pc.GltfExporter().build(source);
  source.destroy();
  if (disposed) return () => scene.dispose();

  const url = urls.from(new Blob([bytes], { type: 'model/gltf-binary' }));
  const container = await new Promise<pc.Asset>((resolve, reject) => {
    // The container type loads glTF; the file name tells the parser it is a .glb.
    const asset = new pc.Asset('robot.glb', 'container', { url, filename: 'robot.glb' });
    asset.once('load', () => resolve(asset));
    asset.once('error', (err: string) => reject(new Error(err)));
    app.assets.add(asset);
    app.assets.load(asset);
  });
  if (disposed) return () => scene.dispose();
  const resource = container.resource as pc.ContainerResource;

  // One loaded resource, many entity trees: renders and materials are shared.
  const copies: pc.Entity[] = [];
  const spawn = (n: number): void => {
    while (copies.length) copies.pop()!.destroy();
    for (let i = 0; i < n; i++) {
      const copy = resource.instantiateRenderEntity({ castShadows: true });
      const a = (i / n) * Math.PI * 2;
      copy.setLocalPosition(Math.cos(a) * 3.5, 0, Math.sin(a) * 3.5);
      copy.setLocalEulerAngles(0, -a * pc.math.RAD_TO_DEG - 90, 0);
      app.root.addChild(copy);
      copies.push(copy);
    }
  };
  spawn(6);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    copies.forEach((c, i) => {
      const head = c.findByName('head');
      head?.setLocalPosition(0, 2.0 + Math.sin(t * 2 + i) * 0.12, 0);
      c.findByName('left arm')?.setLocalEulerAngles(0, 0, Math.sin(t * 3 + i) * 25);
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout(
      `GLB ${bytes.byteLength} bytes | renders ${resource.renders.length} | materials ${resource.materials.length} | textures ${resource.textures.length} | animations ${resource.animations.length}`,
    );
    panel.row();
    panel.slider('instances', 1, 12, 1, 6, spawn);
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
