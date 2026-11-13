// The WebXR features manager's registry: every feature and its available versions
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  WebXRFeatureName,
  WebXRFeaturesManager,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  // The static registry works before any XR session or features manager exists.
  const features = WebXRFeaturesManager.GetAvailableFeatures().sort();

  const stage = createStage(el, ctx, { height: 300 });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 16, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // One block per registered feature, height = how many versions it ships.
  const cols = Math.ceil(Math.sqrt(features.length));
  features.forEach((name, i) => {
    const versions = WebXRFeaturesManager.GetAvailableVersions(name).filter((v) => /^\d+$/.test(v)).length;
    const block = MeshBuilder.CreateBox(name, { width: 1, depth: 1, height: 0.5 + versions * 0.6 }, scene);
    block.position.set((i % cols) * 1.4 - (cols * 1.4) / 2, (0.5 + versions * 0.6) / 2, Math.floor(i / cols) * 1.4 - 2);
    const mat = new StandardMaterial(name, scene);
    mat.diffuseColor = Color3.FromHSV((i / features.length) * 300, 0.6, 0.95);
    block.material = mat;
  });

  if (!ctx.preview) {
    const table = document.createElement('table');
    Object.assign(table.style, { width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', color: 'var(--fg-2)' });
    const head = table.insertRow();
    for (const h of ['feature (WebXRFeatureName value)', 'GetAvailableVersions', 'stable', 'latest']) head.insertCell().textContent = h;
    const known = new Set<string>(Object.values(WebXRFeatureName));
    for (const name of features) {
      const row = table.insertRow();
      row.insertCell().textContent = known.has(name) ? name : `${name} (registered, not in WebXRFeatureName)`;
      row.insertCell().textContent = WebXRFeaturesManager.GetAvailableVersions(name).join(', ');
      row.insertCell().textContent = String(WebXRFeaturesManager.GetStableVersionOfFeature(name));
      row.insertCell().textContent = String(WebXRFeaturesManager.GetLatestVersionOfFeature(name));
    }
    el.append(table);
  }

  stage.run(() => (camera.alpha += ctx.preview ? 0.003 : 0));
  return () => stage.dispose();
};

export default mount;
