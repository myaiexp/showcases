// globeCurvatureResolution: degrees per face when approximating the sphere
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { MeshBasicMaterial } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A wireframe material shows the faces; the default is one face per 4°.' });

  // A wireframe globe material makes each face of the sphere visible.
  const wire = new MeshBasicMaterial({ color: '#4cc9f0', wireframe: true });
  stage.onDispose(() => wire.dispose());

  const globe = stage.own(new Globe(stage.container))
    .globeMaterial(wire)
    .showAtmosphere(false)
    .globeCurvatureResolution(15);
  globe.controls().autoRotate = true;

  if (stage.bar) slider(stage.bar, 'globeCurvatureResolution', 1, 45, 1, 15, (v) => globe.globeCurvatureResolution(v), (v) => `${v}°`);
  else {
    const steps = [45, 30, 15, 8, 4, 8, 15, 30];
    let i = 0;
    stage.every(1000, () => globe.globeCurvatureResolution(steps[++i % steps.length]!));
  }

  return stage.dispose;
};

export default mount;
