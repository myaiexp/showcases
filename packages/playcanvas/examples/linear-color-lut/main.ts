// Colour grading with generated 256x16 LUT strips and a crossfade
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

type Grade = (r: number, g: number, b: number) => [number, number, number];

/**
 * The layout the docs describe: 16 horizontal slices along blue, each slice mapping red along X
 * and green along Y. The identity LUT leaves colours alone; a grade function bends it.
 */
function lutBytes(grade: Grade): Uint8Array {
  const data = new Uint8Array(256 * 16 * 4);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 256; x++) {
      const [r, g, b] = grade((x % 16) / 15, y / 15, Math.floor(x / 16) / 15);
      data.set([r, g, b, 1].map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255)), (y * 256 + x) * 4);
    }
  }
  return data;
}

const grades: Record<string, Grade> = {
  // Warm sunset: push red, pull blue.
  warm: (r, g, b) => [r * 1.15 + 0.03, g * 0.95, b * 0.7],
  // Teal shadows, orange highlights.
  'teal and orange': (r, g, b) => {
    const l = 0.3 * r + 0.59 * g + 0.11 * b;
    return [r + (l - 0.5) * 0.3, g - Math.abs(l - 0.5) * 0.1, b - (l - 0.5) * 0.3];
  },
  // Noir: desaturate and contrast.
  noir: (r, g, b) => {
    const l = 0.3 * r + 0.59 * g + 0.11 * b;
    const v = (l - 0.5) * 1.3 + 0.5;
    return [v, v, v * 1.04];
  },
};

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 8.5, pitch: -14, autoRotate: 12, toneMapping: pc.TONEMAP_NEUTRAL });
  const { app, stage } = rig;

  ['#e8394a', '#f2c14e', '#39e86a', '#4ab3e8', '#a78bfa'].forEach((hex, i) => addMesh(app, 'sphere', pbrMaterial(hex, { gloss: 0.7 }), [(i - 2) * 1.5, 0, 0], 1.3));
  addMesh(app, 'plane', pbrMaterial('#9aa3b2', { gloss: 0.3 }), [0, -0.65, 0], 12);

  // LUTs are authored in sRGB: srgb data, no mipmaps, bilinear filtering, as the docs require.
  const makeLut = (name: string, grade: Grade): pc.Texture =>
    rig.own(
      new pc.Texture(stage.device, {
        name: `lut-${name}`,
        width: 256,
        height: 16,
        format: pc.PIXELFORMAT_SRGBA8,
        mipmaps: false,
        minFilter: pc.FILTER_LINEAR,
        magFilter: pc.FILTER_LINEAR,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
        levels: [lutBytes(grade)],
      }),
    );
  const names = Object.keys(grades);
  const luts = names.map((n) => makeLut(n, grades[n]!));
  const lutOf = (name: string): pc.Texture => luts[names.indexOf(name)]!;

  const frame = new pc.CameraFrame(app, rig.camera.camera!);
  frame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;
  frame.colorLUT.texture = lutOf('warm');
  frame.colorLUT.texture2 = lutOf('noir');
  frame.colorLUT.intensity = 1;
  frame.colorLUT.intensity2 = 1;
  frame.colorLUT.blend = 0;
  frame.update();

  // Cards fade between the two looks on their own.
  let t = 0;
  let auto = true;
  app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    frame.colorLUT.blend = 0.5 - 0.5 * Math.cos(t * 0.9);
    frame.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('LUT 1', names, 'warm', (n) => {
      frame.colorLUT.texture = lutOf(n);
      frame.update();
    });
    panel.select('LUT 2', names, 'noir', (n) => {
      frame.colorLUT.texture2 = lutOf(n);
      frame.update();
    });
    panel.check('animate blend', true, (on) => (auto = on));
    panel.slider('blend (0 = LUT 1, 1 = LUT 2)', 0, 1, 0.01, 0, (v) => {
      auto = false;
      frame.colorLUT.blend = v;
      frame.update();
    });
    panel.slider('intensity (LUT 1)', 0, 1, 0.01, 1, (v) => {
      frame.colorLUT.intensity = v;
      frame.update();
    });
    panel.slider('intensity2 (LUT 2)', 0, 1, 0.01, 1, (v) => {
      frame.colorLUT.intensity2 = v;
      frame.update();
    });
  }
  return () => {
    frame.destroy();
    rig.dispose();
  };
};

export default mount;
