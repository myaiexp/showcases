// sRGB versus linear texture formats on the same colours
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';
import { canvasTexture } from '../../shared/textures.ts';

// Colour bands as authored on screen: a grey ramp, then primaries, with a mid grey patch at the bottom.
const paint = (g: CanvasRenderingContext2D, s: number): void => {
  for (let i = 0; i < 8; i++) {
    const v = Math.round((i / 7) * 255);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect((i * s) / 8, 0, s / 8, s * 0.4);
  }
  ['#e8394a', '#39e86a', '#3a6be8', '#e8d839'].forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i * s) / 4, s * 0.4, s / 4, s * 0.3);
  });
  g.fillStyle = 'rgb(128,128,128)';
  g.fillRect(0, s * 0.7, s, s * 0.3);
};

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 10, pitch: 0, yaw: 0, autoRotate: 0, toneMapping: pc.TONEMAP_NONE, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;

  // 1. Marked sRGB: decoded to linear on sampling, so the output matches the picture.
  const correct = rig.own(canvasTexture(stage.device, paint, { name: 'srgb', srgb: true }));
  // 2. Plain RGBA8: the shader takes the encoded numbers as linear, then gamma encodes them again.
  const wrong = rig.own(canvasTexture(stage.device, paint, { name: 'linear', srgb: false }));
  const planes: [string, pc.StandardMaterial][] = [
    ['PIXELFORMAT_SRGBA8 (correct)', pbrMaterial('#ffffff', { diffuseMap: correct, useLighting: false })],
    ['PIXELFORMAT_RGBA8 (washed out)', pbrMaterial('#ffffff', { diffuseMap: wrong, useLighting: false })],
  ];
  planes.forEach(([, m], i) => addMesh(app, 'plane', m, [(i - 0.5) * 4.4, 0, 0], 4).setLocalEulerAngles(90, 0, 0));

  // A plain colour needs no texture at all: StandardMaterial converts colours to linear itself.
  const swatch = pbrMaterial('#808080', { useLighting: false });
  const swatchEntity = addMesh(app, 'plane', swatch, [0, -2.7, 0.01], [9, 1, 1]);
  swatchEntity.setLocalEulerAngles(90, 0, 0);

  addCanvasLabels(stage.canvas, [
    { text: planes[0]![0], rect: [0, 0.78, 0.5, 0.2] },
    { text: planes[1]![0], rect: [0.5, 0.78, 0.5, 0.2] },
    { text: 'material.diffuse = #808080 (no texture)', rect: [0.25, 0, 0.5, 0.1] },
  ]);

  sway(app, rig.orbit, 8, 0.5);
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('swatch', true, (on) => (swatchEntity.enabled = on));
    panel.readout('compare the bottom grey patch of each plane with the swatch below');
  }
  return () => rig.dispose();
};

export default mount;
