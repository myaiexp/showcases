// Leave parameters out and the texture's own defaults fill them in
import * as THREE from 'three/webgpu';
import { marble } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { heading, note } from '../../shared/panel.ts';

const material = (): THREE.MeshStandardNodeMaterial => new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // No arguments at all: every parameter comes from marble.defaults.
  const plain = material();
  plain.colorNode = marble();

  // Only the colour changes; scale, thinness, noise, background and seed stay default.
  const tinted = material();
  tinted.colorNode = marble({ color: new THREE.Color(0xc0392b) });

  // Two numbers change; both colours stay default.
  const fine = material();
  fine.colorNode = marble({ scale: 2.4, thinness: 8 });

  lineup(stage, [
    { material: plain, label: 'marble()' },
    { material: tinted, label: 'marble({ color })' },
    { material: fine, label: 'marble({ scale, thinness })' },
  ]);

  // The defaults object every texture function carries.
  if (stage.panel) {
    heading(stage.panel, 'marble.defaults');
    for (const [key, value] of Object.entries(marble.defaults)) {
      const shown =
        value instanceof THREE.Color ? `Color(0x${value.getHexString()})` : typeof value === 'object' ? 'TSL node' : String(value);
      note(stage.panel, `${key}: ${shown}`);
    }
  }

  stage.start();
  return stage.dispose;
};

export default mount;
