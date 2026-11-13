// One factory per light type: the light, its helper, a default intensity and how it moves
import * as THREE from 'three/webgpu';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export const KINDS = ['Ambient', 'Hemisphere', 'Directional', 'Point', 'Spot', 'RectArea'] as const;
export type Kind = (typeof KINDS)[number];

type Helper = THREE.Object3D & { update?: () => void; dispose?: () => void };

export interface Rig {
  kind: Kind;
  light: THREE.Light;
  helper: Helper | null;
  /** Intensity the light starts at; the slider runs from 0 to twice this. */
  intensity: number;
  /** Move the light (and refresh its helper) for time t in seconds. */
  place(t: number): void;
  /** Objects to add to / remove from the scene besides the light itself. */
  extras: THREE.Object3D[];
  /** Free the helper and the light. */
  dispose(): void;
}

const ORIGIN = new THREE.Vector3(0, 1, 0);

export function makeRig(kind: Kind): Rig {
  let light: THREE.Light;
  let helper: Helper | null = null;
  let intensity = 1;
  let move: (t: number) => void = () => {};
  const extras: THREE.Object3D[] = [];

  switch (kind) {
    case 'Ambient':
      // No position or direction: it just adds colour * intensity to everything.
      light = new THREE.AmbientLight(0xffffff, intensity);
      break;
    case 'Hemisphere': {
      // Sky colour from above, ground colour from below.
      light = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, intensity);
      light.position.set(0, 8, 0);
      helper = new THREE.HemisphereLightHelper(light as THREE.HemisphereLight, 2);
      break;
    }
    case 'Directional': {
      intensity = 2.5;
      const d = new THREE.DirectionalLight(0xffffff, intensity);
      // Parallel rays towards the target, which must be in the scene.
      d.target.position.copy(ORIGIN);
      extras.push(d.target);
      helper = new THREE.DirectionalLightHelper(d, 2);
      move = (t) => d.position.set(Math.cos(t) * 6, 6.5, Math.sin(t) * 6);
      light = d;
      break;
    }
    case 'Point': {
      intensity = 150;
      const p = new THREE.PointLight(0xffffff, intensity);
      helper = new THREE.PointLightHelper(p, 0.5);
      move = (t) => p.position.set(Math.cos(t) * 6, 5, Math.sin(t) * 6);
      light = p;
      break;
    }
    case 'Spot': {
      intensity = 250;
      const s = new THREE.SpotLight(0xffffff, intensity, 0, Math.PI / 6, 0.3);
      s.target.position.copy(ORIGIN);
      extras.push(s.target);
      helper = new THREE.SpotLightHelper(s);
      move = (t) => s.position.set(Math.cos(t) * 6, 8, Math.sin(t) * 6);
      light = s;
      break;
    }
    case 'RectArea': {
      // Needs no target: it faces along its own rotation. Its helper is a child of the light.
      intensity = 6;
      const r = new THREE.RectAreaLight(0xffffff, intensity, 8, 3);
      helper = new RectAreaLightHelper(r) as unknown as Helper;
      r.add(helper);
      move = (t) => {
        r.position.set(Math.cos(t) * 3, 5, Math.sin(t) * 3);
        r.lookAt(0, 0, 0);
      };
      light = r;
      break;
    }
  }

  const rig: Rig = {
    kind,
    light,
    // The RectArea helper rides on the light, so only the others go in the scene.
    helper: kind === 'RectArea' ? null : helper,
    intensity,
    extras,
    place(t) {
      move(t);
      light.updateMatrixWorld();
      for (const e of extras) e.updateMatrixWorld();
      helper?.update?.();
    },
    dispose() {
      helper?.dispose?.();
      light.dispose();
    },
  };
  return rig;
}
