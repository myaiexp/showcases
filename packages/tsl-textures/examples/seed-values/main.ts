// seed: the same parameters, a different pattern for every seed value
import * as THREE from 'three/webgpu';
import { gasGiant } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { buttons, heading } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const count = stage.preview ? 3 : 6;

  // One material per seed; everything else is gasGiant's defaults.
  const seeds = Array.from({ length: count }, (_, i) => i);
  const materials = seeds.map((seed) => {
    const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.7, metalness: 0 });
    material.colorNode = gasGiant({ seed });
    return material;
  });
  lineup(
    stage,
    materials.map((material, i) => ({ material, label: `seed: ${seeds[i]}` })),
    { columns: 3, spin: 1.5 },
  );

  if (stage.panel) {
    heading(stage.panel, 'Seeds');
    // A new seed is a new constant in the shader, so the material rebuilds.
    buttons(stage.panel, [
      [
        'Six random seeds',
        () => {
          materials.forEach((material, i) => {
            const seed = Math.floor(Math.random() * 1000);
            material.colorNode = gasGiant({ seed });
            material.needsUpdate = true;
            stage.root.querySelectorAll('.tt-label')[i]!.textContent = `seed: ${seed}`;
          });
        },
      ],
    ]);
  }

  stage.start();
  return stage.dispose;
};

export default mount;
