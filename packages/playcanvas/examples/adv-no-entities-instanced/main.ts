// One mesh instance with an instancing buffer draws a forest into a layer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, discBounds, rng, scatterMatrices } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const MAX_TREES = 2000;
const RADIUS = 16;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 20, pitch: -28 });
  const { app } = scene;
  const device = app.graphicsDevice;
  const layer = app.scene.layers.getLayerById(pc.LAYERID_WORLD)!;

  const treeMaterial = colorMaterial('#3f8f4f', { gloss: 0.2 });
  const treeMesh = pc.Mesh.fromGeometry(device, new pc.ConeGeometry({ baseRadius: 0.5, peakRadius: 0, height: 1, heightSegments: 1, capSegments: 12 }));

  // The default instancing format holds a world matrix per instance, so the node stays at identity.
  const matrices = scatterMatrices(MAX_TREES, RADIUS, rng(7), [0.8, 2.4]);
  const instanceBuffer = new pc.VertexBuffer(device, pc.VertexFormat.getDefaultInstancingFormat(device), MAX_TREES, { data: matrices });

  const forest = new pc.MeshInstance(treeMesh, treeMaterial, new pc.GraphNode('Forest'));
  forest.castShadows = true;
  forest.setInstancing(instanceBuffer, true); // true: cull the whole group against its bounds
  forest.setCustomAabb(discBounds(RADIUS + 2, 3)); // a conservative box around every copy
  forest.instancingCount = ctx.preview ? 600 : 900;
  const forestInstances = [forest];
  layer.addMeshInstances(forestInstances);

  let shown = true;
  let readout: HTMLElement | undefined;
  app.on('update', () => {
    if (readout) readout.textContent = `${forest.instancingCount} trees, ${app.stats.drawCallCount} draw calls in the frame`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('trees drawn', 0, MAX_TREES, 50, forest.instancingCount, (v) => (forest.instancingCount = v));
    panel.check('in the layer', true, (on) => {
      shown = on;
      // Removing and re-adding keeps the mesh instance and its buffer: nothing is rebuilt.
      if (on) layer.addMeshInstances(forestInstances);
      else layer.removeMeshInstances(forestInstances);
    });
    panel.row();
    readout = panel.readout();
  }

  return () => {
    if (shown) layer.removeMeshInstances(forestInstances);
    forest.destroy();
    treeMaterial.destroy();
    instanceBuffer.destroy(); // MeshInstance.destroy() leaves a buffer you supplied alone
    scene.dispose();
  };
};

export default mount;
