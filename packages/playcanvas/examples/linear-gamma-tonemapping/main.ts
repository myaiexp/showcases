// Camera gammaCorrection and toneMapping for LDR output
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const TONE = {
  TONEMAP_LINEAR: pc.TONEMAP_LINEAR,
  TONEMAP_FILMIC: pc.TONEMAP_FILMIC,
  TONEMAP_HEJL: pc.TONEMAP_HEJL,
  TONEMAP_ACES: pc.TONEMAP_ACES,
  TONEMAP_ACES2: pc.TONEMAP_ACES2,
  TONEMAP_NEUTRAL: pc.TONEMAP_NEUTRAL,
  TONEMAP_AGX: pc.TONEMAP_AGX,
  TONEMAP_AGX_PUNCHY: pc.TONEMAP_AGX_PUNCHY,
  TONEMAP_NONE: pc.TONEMAP_NONE,
} as const;
type ToneName = keyof typeof TONE;
const TONES = Object.keys(TONE) as ToneName[];
const GAMMA = { GAMMA_SRGB: pc.GAMMA_SRGB, GAMMA_NONE: pc.GAMMA_NONE } as const;
type GammaName = keyof typeof GAMMA;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9, pitch: -12, yaw: 0, autoRotate: 0, toneMapping: pc.TONEMAP_LINEAR });
  const { app, stage } = rig;
  const camera = rig.camera.camera!;

  // A lit sphere for the midtones, and emissive spheres whose intensity runs far past 1.0:
  // tone mapping decides how those highlights roll off.
  addMesh(app, 'sphere', pbrMaterial('#c8a070', { gloss: 0.6 }), [-3.6, 0, 0], 2);
  [1, 2, 4, 8].forEach((intensity, i) =>
    addMesh(app, 'sphere', pbrMaterial('#000000', { emissive: new pc.Color(1, 0.6, 0.25), emissiveIntensity: intensity }), [-1.2 + i * 1.75, 0, 0], 1.5),
  );

  const label = addCanvasLabels(stage.canvas, [{ text: '', rect: [0, 0.9, 1, 0.1] }]).firstElementChild!;
  const show = (): void => {
    label.textContent = `gammaCorrection ${camera.gammaCorrection === pc.GAMMA_SRGB ? 'GAMMA_SRGB' : 'GAMMA_NONE'}, toneMapping ${TONES.find((n) => TONE[n] === camera.toneMapping)}  (emissiveIntensity 1, 2, 4, 8)`;
  };
  const setTone = (name: ToneName): void => {
    camera.toneMapping = TONE[name];
    show();
  };
  const setGamma = (name: GammaName): void => {
    camera.gammaCorrection = GAMMA[name];
    show();
  };
  show();

  if (ctx.preview) {
    let t = 0;
    let shown = -1;
    app.on('update', (dt: number) => {
      t += dt;
      const step = Math.floor(t / 1.6) % TONES.length;
      if (step !== shown) setTone(TONES[(shown = step)]!);
    });
  } else {
    const panel = createPanel(el);
    panel.select('toneMapping', TONES, 'TONEMAP_LINEAR', setTone);
    panel.select('gammaCorrection', Object.keys(GAMMA) as GammaName[], 'GAMMA_SRGB', setGamma);
    panel.slider('exposure', 0.2, 3, 0.05, 1, (v) => (app.scene.exposure = v));
    panel.readout('GAMMA_NONE writes linear values straight out, so the image is too dark on a normal display');
  }
  return () => rig.dispose();
};

export default mount;
