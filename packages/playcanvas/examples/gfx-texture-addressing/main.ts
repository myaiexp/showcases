// Texture addressU and addressV: repeat, clamp to edge and mirrored repeat
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';
import { canvasTexture } from '../../shared/textures.ts';

const MODES = {
  ADDRESS_REPEAT: pc.ADDRESS_REPEAT,
  ADDRESS_CLAMP_TO_EDGE: pc.ADDRESS_CLAMP_TO_EDGE,
  ADDRESS_MIRRORED_REPEAT: pc.ADDRESS_MIRRORED_REPEAT,
} as const;
type ModeName = keyof typeof MODES;
const NAMES = Object.keys(MODES) as ModeName[];

// An asymmetric picture (an F on a gradient) so flips and repeats are easy to tell apart.
const paint = (g: CanvasRenderingContext2D, s: number): void => {
  const grad = g.createLinearGradient(0, 0, s, s);
  grad.addColorStop(0, '#e8794a');
  grad.addColorStop(1, '#4ab3e8');
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  g.fillStyle = '#fff';
  g.font = `bold ${s * 0.8}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('F', s / 2, s / 2 + s * 0.04);
  g.strokeStyle = '#000';
  g.lineWidth = 4;
  g.strokeRect(2, 2, s - 4, s - 4);
};

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 11, pitch: -4, yaw: 0, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;
  sway(app, rig.orbit, 12, 0.4);

  // Each plane's UVs run 0..1; the 1.6x tiling makes them run 0..1.6, which is where addressing shows.
  const tiling = new pc.Vec2(1.6, 1.6);
  const materials: pc.StandardMaterial[] = [];
  const textures = NAMES.map((name, i) => {
    const texture = rig.own(canvasTexture(stage.device, paint, { name, addressU: MODES[name], addressV: MODES[name] }));
    const material = pbrMaterial('#ffffff', { diffuseMap: texture, diffuseMapTiling: tiling, useLighting: false });
    addMesh(app, 'plane', material, [(i - 1) * 3.6, 0, 0], 3.2).setLocalEulerAngles(90, 0, 0);
    materials.push(material);
    return texture;
  });
  addCanvasLabels(
    stage.canvas,
    NAMES.map((name, i) => ({ text: name, rect: [i / 3, 0, 1 / 3, 1] as [number, number, number, number] })),
  );

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('addressU (all)', NAMES, 'ADDRESS_REPEAT', (n) => textures.forEach((t) => (t.addressU = MODES[n])));
    panel.select('addressV (all)', NAMES, 'ADDRESS_REPEAT', (n) => textures.forEach((t) => (t.addressV = MODES[n])));
    panel.row();
    panel.slider('UV range (tiling)', 0.5, 4, 0.1, 1.6, (v) => {
      tiling.set(v, v);
      materials.forEach((m) => {
        m.diffuseMapTiling = tiling;
        m.update();
      });
    });
    panel.readout('each plane starts with its own mode on both axes');
  }
  return () => rig.dispose();
};

export default mount;
