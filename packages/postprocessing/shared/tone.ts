// Tone mapping examples: an HDR showroom whose light level can be scaled, and the mode list
import * as THREE from 'three';
import { ToneMappingMode, type ToneMappingEffect } from 'postprocessing';
import { showroom, type SampleScene } from './scenes.ts';

export interface HdrScene extends SampleScene {
  /** Scales every light and emissive material in the scene; 1 is the scene as built. */
  setLevel(k: number): void;
}

/** The showroom with a strong warm point light and very bright lamps: values far above 1. */
export function hdrShowroom(scene: THREE.Scene): HdrScene {
  const subject = showroom(scene, { glow: 14 });
  const hot = new THREE.PointLight(0xffe2b0, 55, 0, 1.4);
  hot.position.set(1.5, 3, 2);
  subject.group.add(hot);
  const bases: (() => void)[] = [];
  let level = 1;
  subject.group.traverse((o) => {
    if (o instanceof THREE.Light) {
      const base = o.intensity;
      bases.push(() => (o.intensity = base * level));
    } else if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) {
      const m = o.material;
      const base = m.emissiveIntensity;
      if (m.emissive.getHex() !== 0) bases.push(() => (m.emissiveIntensity = base * level));
    }
  });
  return {
    ...subject,
    setLevel(k) {
      level = k;
      for (const apply of bases) apply();
    },
  };
}

/** Every ToneMappingMode, by name (CINEON also answers to OPTIMIZED_CINEON). */
export const TONE_MODES = ['LINEAR', 'REINHARD', 'REINHARD2', 'REINHARD2_ADAPTIVE', 'UNCHARTED2', 'CINEON', 'ACES_FILMIC', 'AGX', 'NEUTRAL'] as const;
export type ToneModeName = (typeof TONE_MODES)[number];
export const toneMode = (name: ToneModeName): number => ToneMappingMode[name];

/** whitePoint, middleGrey and averageLuminance are typed read-only in 6.39.6 but are plain uniforms: write them through this. */
export function setTone(effect: ToneMappingEffect, name: 'whitePoint' | 'middleGrey' | 'averageLuminance', value: number): void {
  effect.uniforms.get(name)!.value = value;
}
