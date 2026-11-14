// Box projection: a room environment lined up with its real walls
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, buildEnvironment, createRig, equirectTexture, pbrMaterial, type Shade } from '../../shared/pbr.ts';

const HALF = [6, 3, 6] as const;
// Wall colours: +x, -x, +z, -z.
const WALLS = [
  [1.0, 0.18, 0.12],
  [0.15, 0.3, 1.0],
  [0.2, 0.9, 0.3],
  [1.0, 0.85, 0.2],
] as const;

// What a probe at the room's centre sees: ray-cast against the walls, with a bright bar on
// each wall and a light panel in the ceiling. Everything is symmetric, so orientation can't differ.
const room: Shade = (x, y, z, out) => {
  const t = Math.min(HALF[0] / (Math.abs(x) + 1e-6), HALF[1] / (Math.abs(y) + 1e-6), HALF[2] / (Math.abs(z) + 1e-6));
  const px = x * t;
  const pz = z * t;
  let c: readonly number[];
  if (Math.abs(y) * t >= HALF[1] - 1e-4) {
    c = y > 0 ? (Math.abs(px) < 2 && Math.abs(pz) < 2 ? [9, 9, 8] : [0.7, 0.7, 0.72]) : [0.25, 0.25, 0.27];
  } else if (Math.abs(x) * t >= HALF[0] - 1e-4) {
    c = WALLS[x > 0 ? 0 : 1]!.map((v) => v * (Math.abs(pz) < 0.8 ? 2.5 : 1));
  } else {
    c = WALLS[z > 0 ? 2 : 3]!.map((v) => v * (Math.abs(px) < 0.8 ? 2.5 : 1));
  }
  out[0] = c[0]!;
  out[1] = c[1]!;
  out[2] = c[2]!;
};

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 4.2, pitch: -22, target: new pc.Vec3(0, -1, 0), autoRotate: 10 });
  const { app, stage } = rig;
  app.scene.ambientLight = new pc.Color(0.1, 0.1, 0.1);
  const env = buildEnvironment(equirectTexture(stage.device, room, 256), 128);

  // The real room, unlit: emissive colours only, seen from inside so culling is off.
  const wall = (hex: number[], pos: [number, number, number], scale: [number, number, number]): void => {
    const m = pbrMaterial('#000000', { emissive: new pc.Color(hex[0]!, hex[1]!, hex[2]!), cull: pc.CULLFACE_NONE });
    addMesh(app, 'box', m, pos, scale);
  };
  const [hx, hy, hz] = HALF;
  wall([...WALLS[0]], [hx + 0.1, 0, 0], [0.2, hy * 2, hz * 2]);
  wall([...WALLS[1]], [-hx - 0.1, 0, 0], [0.2, hy * 2, hz * 2]);
  wall([...WALLS[2]], [0, 0, hz + 0.1], [hx * 2, hy * 2, 0.2]);
  wall([...WALLS[3]], [0, 0, -hz - 0.1], [hx * 2, hy * 2, 0.2]);
  wall([0.7, 0.7, 0.72], [0, hy + 0.1, 0], [hx * 2, 0.2, hz * 2]);
  wall([5, 5, 4.5], [0, hy - 0.02, 0], [4, 0.04, 4]);

  // The reflective floor and a chrome ball carry the room's atlas and project it onto the box.
  const bounds = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(hx, hy, hz));
  const probe = { envAtlas: env.atlas, cubeMapProjection: pc.CUBEPROJ_BOX, cubeMapProjectionBox: bounds };
  const floor = pbrMaterial('#202226', { gloss: 0.9, reflectivity: 1, ...probe });
  addMesh(app, 'plane', floor, [0, -hy, 0], [hx * 2, 1, hz * 2]);
  const ball = pbrMaterial('#ffffff', { metalness: 1, gloss: 1, ...probe });
  addMesh(app, 'sphere', ball, [0, -1.4, 0], 2.4);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('box projection (cubeMapProjection)', true, (on) => {
      for (const m of [floor, ball]) {
        m.cubeMapProjection = on ? pc.CUBEPROJ_BOX : pc.CUBEPROJ_NONE;
        m.update();
      }
    });
    panel.slider('floor gloss', 0.3, 1, 0.01, 0.9, (v) => {
      floor.gloss = v;
      floor.update();
    });
    panel.readout('with projection the bars and ceiling panel sit where the walls are');
  }
  return () => {
    env.dispose();
    rig.dispose();
  };
};

export default mount;
