// Build a mesh from raw vertex streams: positions, normals, uvs, colours and indices
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { checkerTexture } from '../../shared/textures.ts';

/** An octahedron with its own three vertices per face, so every face shades flat. */
function buildGem(device: pc.GraphicsDevice): pc.Mesh {
  const top = [0, 1.4, 0];
  const bottom = [0, -1.4, 0];
  const ring = [[1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]];
  const palette = [[255, 90, 90], [255, 200, 70], [90, 220, 120], [80, 170, 255]];

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const addFace = (a: number[], b: number[], c: number[], colour: number[]): void => {
    const base = positions.length / 3;
    positions.push(...a, ...b, ...c);
    uvs.push(0, 0, 1, 0, 0.5, 1);
    for (let k = 0; k < 3; k++) colors.push(...colour, 255);
    indices.push(base, base + 1, base + 2);
  };
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    addFace(top, ring[next]!, ring[i]!, palette[i]!); // upper face, wound counter-clockwise from outside
    addFace(bottom, ring[i]!, ring[next]!, palette[(i + 2) % 4]!); // lower face
  }

  const mesh = new pc.Mesh(device);
  mesh.setPositions(new Float32Array(positions));
  mesh.setNormals(pc.calculateNormals(positions, indices));
  mesh.setUvs(0, new Float32Array(uvs));
  // 8-bit colours in the 0 to 255 range; shaders read them as 0 to 1.
  mesh.setColors32(new Uint8Array(colors));
  mesh.setIndices(indices);
  mesh.update(); // creates the vertex and index buffers and the bounding box
  return mesh;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 50, 30, { castShadows: true, shadowDistance: 20 });
  addGround(app, '#3a4152', 14).setLocalPosition(0, -1.6, 0);

  const checker = checkerTexture(device, '#ffffff', '#9aa3b5', 6);
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(1, 1, 1);
  material.diffuseVertexColor = true; // draw with the colour stream
  material.diffuseMap = checker;
  material.useMetalness = true;
  material.gloss = 0.7;
  material.update();

  const gem = new pc.Entity('gem');
  gem.addComponent('render', { meshInstances: [new pc.MeshInstance(buildGem(device), material)] });
  app.root.addChild(gem);

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 7, pitch: -18, autoRotate: 18, interactive: !ctx.preview });
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    gem.setPosition(0, Math.sin(t * 1.5) * 0.25, 0);
    gem.setEulerAngles(0, t * 30, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('diffuseVertexColor (colours stream)', true, (on) => ((material.diffuseVertexColor = on), material.update()));
    panel.check('diffuseMap (uv stream)', true, (on) => ((material.diffuseMap = on ? checker : null), material.update()));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
    checker.destroy();
  };
};

export default mount;
