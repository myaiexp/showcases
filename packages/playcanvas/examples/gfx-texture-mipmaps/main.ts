// Mipmaps: levels uploaded by hand, generated from level 0, or switched off
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const SIZE = 64;
const LEVEL_COLOURS = [
  [232, 121, 74],
  [242, 193, 78],
  [123, 198, 123],
  [74, 179, 232],
  [167, 139, 250],
  [244, 114, 182],
  [240, 240, 240],
];

/** One mip level: a checker of the level's colour, or neutral grey when `tint` is false. */
function level(index: number, tint: boolean): Uint8Array {
  const size = SIZE >> index;
  const data = new Uint8Array(size * size * 4);
  const colour = tint ? LEVEL_COLOURS[index]! : [200, 205, 215];
  const cell = Math.max(1, size / 8);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dark = (Math.floor(x / cell) + Math.floor(y / cell)) % 2 ? 0.45 : 1;
      data.set([colour[0]! * dark, colour[1]! * dark, colour[2]! * dark, 255], (y * size + x) * 4);
    }
  }
  return data;
}

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 7, pitch: -9, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;
  sway(app, rig.orbit, 16, 0.4);

  const make = (name: string, levels: Uint8Array[], mipmaps: boolean): pc.Texture =>
    rig.own(
      new pc.Texture(stage.device, {
        name,
        width: SIZE,
        height: SIZE,
        format: pc.PIXELFORMAT_RGBA8,
        mipmaps,
        minFilter: mipmaps ? pc.FILTER_LINEAR_MIPMAP_LINEAR : pc.FILTER_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_REPEAT,
        addressV: pc.ADDRESS_REPEAT,
        levels,
      }),
    );
  // Every level supplied by us, each a different colour: the distance shows which one is sampled.
  const tinted = make('tinted-mips', Array.from({ length: 7 }, (_, i) => level(i, true)), true);
  // Only level 0 supplied: the engine generates the rest by filtering it down.
  const generated = make('generated-mips', [level(0, false)], true);
  const flat = make('no-mips', [level(0, false)], false);
  const choices = { 'levels supplied (tinted)': tinted, 'levels generated': generated, 'mipmaps: false': flat };

  const ground = pbrMaterial('#ffffff', { diffuseMap: tinted, diffuseMapTiling: new pc.Vec2(20, 20), useLighting: false });
  addMesh(app, 'plane', ground, [0, 0, 0], [50, 1, 50]);

  if (ctx.preview) {
    let t = 0;
    const all = Object.values(choices);
    app.on('update', (dt: number) => {
      t += dt;
      ground.diffuseMap = all[Math.floor(t / 2.5) % all.length]!;
      ground.update();
    });
  } else {
    const panel = createPanel(el);
    panel.select('texture', Object.keys(choices) as (keyof typeof choices)[], 'levels supplied (tinted)', (name) => {
      ground.diffuseMap = choices[name];
      ground.update();
    });
    panel.readout(`numLevels: ${tinted.numLevels} for a ${SIZE}px texture (1 + log2 of the largest side)`);
  }
  return () => rig.dispose();
};

export default mount;
