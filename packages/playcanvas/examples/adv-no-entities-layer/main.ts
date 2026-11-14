// Meshes drawn through a layer with GraphNodes, no entities or components
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 11, pitch: -24 });
  const { app } = scene;
  const device = app.graphicsDevice;
  const layer = app.scene.layers.getLayerById(pc.LAYERID_WORLD)!;

  // A ground mesh instance: a mesh, a material and a GraphNode that is not in the hierarchy.
  const groundMaterial = colorMaterial('#566b55', { gloss: 0.15 });
  const groundMesh = pc.Mesh.fromGeometry(device, new pc.PlaneGeometry({ halfExtents: new pc.Vec2(9, 9) }));
  const ground = new pc.MeshInstance(groundMesh, groundMaterial, new pc.GraphNode('Ground'));
  layer.addMeshInstances([ground]);

  // A ring of shapes sharing three meshes and materials; the app moves the nodes itself.
  const meshes = [
    pc.Mesh.fromGeometry(device, new pc.BoxGeometry()),
    pc.Mesh.fromGeometry(device, new pc.SphereGeometry({ latitudeBands: 24, longitudeBands: 24 })),
    pc.Mesh.fromGeometry(device, new pc.TorusGeometry({ tubeRadius: 0.2, ringRadius: 0.5 })),
  ];
  const materials = ['#e8794a', '#4ab3e8', '#f2c14e'].map((hex) => colorMaterial(hex, { gloss: 0.6 }));
  const shapes = Array.from({ length: 9 }, (_, i) => {
    const node = new pc.GraphNode(`Shape ${i}`);
    const instance = new pc.MeshInstance(meshes[i % 3]!, materials[i % 3]!, node);
    instance.castShadows = true; // before addMeshInstances: registration adds it to the shadow casters
    return { node, instance, angle: (i / 9) * Math.PI * 2 };
  });
  const instances = shapes.map((s) => s.instance);
  layer.addMeshInstances(instances);

  app.on('update', (dt: number) => {
    for (const s of shapes) {
      s.angle += dt * 0.5;
      s.node.setLocalPosition(Math.cos(s.angle) * 4, 0.9 + Math.sin(s.angle * 3) * 0.3, Math.sin(s.angle) * 4);
      s.node.rotate(0, 60 * dt, 0);
    }
  });

  let shown = true;
  const setShown = (on: boolean): void => {
    if (on === shown) return;
    shown = on;
    if (on) layer.addMeshInstances(instances);
    else layer.removeMeshInstances(instances);
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('in the layer', true, setShown);
    panel.check('castShadows', true, (on) => {
      // Shadow casting is read when an instance is registered, so remove, set and add again.
      if (shown) layer.removeMeshInstances(instances);
      for (const i of instances) i.castShadows = on;
      if (shown) layer.addMeshInstances(instances);
    });
  }

  return () => {
    if (shown) layer.removeMeshInstances(instances);
    layer.removeMeshInstances([ground]);
    // MeshInstance.destroy() releases the mesh reference; materials are the app's to destroy.
    for (const i of [...instances, ground]) i.destroy();
    for (const m of [...materials, groundMaterial]) m.destroy();
    scene.dispose();
  };
};

export default mount;
