// Light estimation: a directional light and ambient SH from an estimate
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { transparentInAr } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

/** The fields of XrLightEstimation this example applies; the simulation fills the same ones. */
interface Estimate {
  available: boolean;
  rotation: pc.Quat | null;
  intensity: number | null;
  color: pc.Color | null;
  sphericalHarmonics: Float32Array | null;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.4, -1.5), distance: 4.2, pitch: -22, autoRotate: 5, floor: false });
  const { app, camera, sun } = scene;
  app.scene.ambientLight = new pc.Color(0, 0, 0);

  // Materials that take their ambient light from nine spherical harmonics coefficients
  // (three floats each): `ambientSH` replaces the constant ambient colour.
  const sh = new Float32Array(27);
  const lit = (hex: string): pc.StandardMaterial => {
    const m = xrMaterial(hex, { gloss: 0.35 });
    // Not in the typings: the engine's StandardMaterial exposes it as a plain property.
    (m as unknown as { ambientSH: Float32Array }).ambientSH = sh;
    m.update();
    return m;
  };
  const floorMaterial = lit('#8a8f9c');
  const floor = xrShape(app.root, 'plane', floorMaterial, [0, 0, -1.5], [8, 1, 8]);
  floor.render!.castShadows = false;
  xrShape(app.root, 'sphere', lit('#e8794a'), [-0.9, 0.4, -1.4], 0.8);
  xrShape(app.root, 'box', lit('#4ab3e8'), [0.1, 0.35, -1.9], 0.7);
  xrShape(app.root, 'cylinder', lit('#7bc67b'), [0.95, 0.4, -1.2], [0.5, 0.8, 0.5]);
  for (const e of app.root.children as pc.Entity[]) if (e.render && e !== floor) e.render.castShadows = true;

  const apply = (estimate: Estimate): void => {
    if (!estimate.available) return;
    if (estimate.rotation) sun.setRotation(estimate.rotation);
    if (estimate.intensity !== null) sun.light!.intensity = estimate.intensity;
    if (estimate.color) sun.light!.color = estimate.color;
    if (estimate.sphericalHarmonics) sh.set(estimate.sphericalHarmonics);
  };

  // The simulation: a sun arcing across the sky, warm at the horizon, with matching ambient.
  const sim: Estimate = { available: true, rotation: new pc.Quat(), intensity: 1, color: new pc.Color(), sphericalHarmonics: sh };
  const state = { animate: true, hour: 0.3 };
  const warm = new pc.Color(1, 0.62, 0.38);
  const white = new pc.Color(1, 0.96, 0.9);
  const simulate = (): void => {
    const elevation = Math.sin(state.hour * Math.PI);
    sim.rotation!.setFromEulerAngles(-20 - elevation * 60, 110 - state.hour * 220, 0);
    sim.intensity = 0.15 + elevation * 1.1;
    sim.color!.lerp(warm, white, Math.min(1, elevation * 1.6));
    const sky = 0.15 + elevation * 0.4;
    // Coefficient 0 is the average light, 2 the up-versus-down term, 1 the left-versus-right term.
    sh.set([sky * 0.9, sky, sky * 1.2], 0);
    sh.set([(state.hour - 0.5) * 0.3 * elevation, (state.hour - 0.5) * 0.2 * elevation, 0], 3);
    sh.set([sky * 0.35, sky * 0.4, sky * 0.55], 6);
  };

  const real = app.xr?.lightEstimation;
  let t = 0;
  let source = 'simulated';
  app.on('update', (dt: number) => {
    t += dt;
    if (real?.available && app.xr?.active) {
      source = 'XrLightEstimation';
      apply(real);
      return;
    }
    source = 'simulated';
    if (state.animate) state.hour = (t * 0.06) % 1;
    simulate();
    apply(sim);
  });

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('animate', true, (on) => (state.animate = on));
    panel.slider('time of day', 0, 1, 0.01, state.hour, (v) => ((state.animate = false), (state.hour = v)));
    const info = panel.readout('');
    app.on('update', () => {
      info.textContent = `${source}: intensity ${sun.light!.intensity.toFixed(2)}, colour ${sun.light!.color.toString(false)}, lightEstimation.supported ${!!real?.supported}`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR' }]);
  }
  return () => {
    undoClear();
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
