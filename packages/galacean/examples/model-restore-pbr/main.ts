// glTF metallic and roughness: metal reflects, roughness blurs
import type { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, rig } from '../../shared/model-kit.ts';
import { ballsGlb } from '../../shared/model-gltf.ts';

const make = () => ballsGlb([0, 0.25, 0.5, 0.75, 1].map((m) => ({ name: `Metal${m}`, color: [0.9, 0.55, 0.3] as [number, number, number], metallic: m, roughness: 0.2 })), []);

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make, { camera: [0, 1.5, 8.5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const mats = materialsOf(model) as PBRMaterial[];
  const info = panel(stage);
  let rough = 0.2;
  const set = (v: number): void => {
    rough = v;
    mats.forEach((m) => (m.roughness = v));
  };
  if (!stage.preview) slider(stage.bar, 'roughness', 0, 1, 0.01, rough, set);
  tick(model, (dt, t) => {
    model.transform.rotate(0, 12 * dt, 0);
    if (stage.preview) set(0.5 - 0.45 * Math.cos(t * 0.8));
    info.text(`metallic 0 .. 1 left to right\nroughness ${rough.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
