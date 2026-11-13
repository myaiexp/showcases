// The default WebXR experience: enter button, teleport floor, and its state observable
import {
  Color3,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  WebXRSessionManager,
  WebXRState,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new FreeCamera('camera', new Vector3(0, 1.7, -6), scene);
  camera.setTarget(new Vector3(0, 1, 0));
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // A small room to stand in: a floor to teleport on and a few pillars.
  const floor = MeshBuilder.CreateGround('floor', { width: 12, height: 12 }, scene);
  const floorMat = new StandardMaterial('floor', scene);
  floorMat.diffuseColor = new Color3(0.3, 0.35, 0.45);
  floor.material = floorMat;
  const pillars = [-3, 0, 3].map((x, i) => {
    const p = MeshBuilder.CreateCylinder(`pillar${i}`, { diameter: 0.6, height: 2.5 }, scene);
    p.position.set(x, 1.25, 3);
    const mat = new StandardMaterial(`pillar${i}`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 110 + 20, 0.6, 0.95);
    p.material = mat;
    return p;
  });

  // Teleportation targets the floor; controller meshes would be downloaded, so skip them.
  // Previews never enter XR, so their cards get no enter button.
  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [floor],
    disableDefaultUI: ctx.preview,
    inputOptions: { doNotLoadControllerMeshes: true },
  });

  const status: string[] = [];
  if (!xr.baseExperience) {
    // No WebXR in this browser: the helper resolves without a base experience and no button.
    status.push('WebXR unavailable: xr.baseExperience is undefined, so no enter button');
  } else {
    xr.baseExperience.onStateChangedObservable.add((state) => status.push(`state → ${WebXRState[state]}`));
    // Standing height when the first XR pose arrives.
    xr.baseExperience.onInitialXRPoseSetObservable.add((xrCamera) => (xrCamera.position.y = 1.7));
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    const line = panel.readout('checking session support…');
    const modes = ['immersive-vr', 'immersive-ar', 'inline'] as const;
    const support = await Promise.all(modes.map((m) => WebXRSessionManager.IsSessionSupportedAsync(m).catch(() => false)));
    line.textContent = modes.map((m, i) => `${m}: ${support[i] ? 'yes' : 'no'}`).join(' · ');
    panel.row();
    const log = panel.readout();
    stage.run(() => (log.textContent = status.join(' · ') || 'not in XR'));
  } else {
    stage.run(() => pillars.forEach((p, i) => (p.rotation.y += 0.01 * (i + 1))));
  }

  return () => {
    xr.dispose();
    stage.dispose();
  };
};

export default mount;
