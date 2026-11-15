// A terrain from a height map image: heightMap, setSize and the node's Y scale
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { select, slider, toggle } from '../../shared/controls.ts';
import { buildTerrain, flyAround, loadTexture, terrainFiles } from '../../shared/env-terrain.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await terrainFiles();
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  // heights: false keeps the terrain's own blank height map, replaced below
  const world = buildTerrain(scene, { size: stage.preview ? 128 : 256, tile: stage.preview ? 32 : 64, heights: false });
  const { terrain } = world;

  // The docs fetch /terrain/height.png; this one is painted in code. A height map is data, so it loads linear.
  terrain.heightMap = await loadTexture('/terrain/height.png', true);
  terrain.setSize(world.size, world.size);
  // Heights come from the map, scaled by the node's Y scale
  terrain.scale.setXYZ(1, world.heightScale, 1);

  const out = stage.readout();
  const show = (): void => {
    const r = terrain.worldRegion;
    if (out) out.textContent = `sizeX ${terrain.sizeX} x sizeZ ${terrain.sizeZ}, scale.y ${terrain.scale.y}\nworldRegion (minX, minZ, maxX, maxZ) = ${r.x.toFixed(0)}, ${r.y.toFixed(0)}, ${r.z.toFixed(0)}, ${r.w.toFixed(0)}`;
  };
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) flyAround(world, ms);
  });
  if (stage.bar) {
    slider(stage.bar, 'scale.y (height)', [5, 100, 1], world.heightScale, (v) => {
      terrain.scale.setXYZ(1, v, 1);
      show();
    });
    select(stage.bar, 'setSize', ['128', '256', '512'] as const, String(world.size) as '256', (v) => {
      const n = Number(v);
      terrain.setSize(n, n);
      terrain.position.setXYZ(-n / 2, 0, -n / 2);
      show();
    });
    toggle(stage.bar, 'wireframe', false, (v) => (terrain.wireframe = v));
    show();
  } else {
    stage.caption('ClipmapTerrain + heightMap from an image');
  }
  myApp.run();
});
