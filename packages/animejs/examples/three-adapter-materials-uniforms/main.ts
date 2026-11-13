// Three.js adapter materials: mesh shorthand, material target and ShaderMaterial uniforms by name
import { animate } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/three-stage.ts';
import './style.css';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
// tint, intensity and resolution.x (stripe count) are driven only by the adapter.
const fragmentShader = `
uniform vec3 tint;
uniform float intensity;
uniform vec2 resolution;
varying vec2 vUv;
void main() {
  float stripe = step(0.5, fract(vUv.x * resolution.x / 100.0));
  gl_FragColor = vec4(tint * intensity * mix(0.35, 1.0, stripe), 1.0);
}`;

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';

  const geometry = new THREE.SphereGeometry(0.9, preview ? 24 : 48, preview ? 16 : 32);
  const standard = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: '#8899aa' }));
  const direct = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: '#cc6644', roughness: 0.4 }));
  const shader = new THREE.ShaderMaterial({
    uniforms: {
      tint: { value: new THREE.Color('#ff0000') },
      intensity: { value: 0.5 },
      resolution: { value: new THREE.Vector2(100, 768) },
    },
    vertexShader,
    fragmentShader,
  });
  const striped = new THREE.Mesh(geometry, shader);
  standard.position.x = -2.2;
  striped.position.x = 2.2;

  const stage = createStage(el, {
    preview,
    cameraPosition: [0, 0, 7],
    onFrame: () => {
      if (preview) return;
      const sm = standard.material as THREE.MeshStandardMaterial;
      const dm = direct.material as THREE.MeshStandardMaterial;
      readout.textContent = [
        `mesh shorthand      metalness ${sm.metalness.toFixed(2)}  emissive #${sm.emissive.getHexString()}`,
        `animate(material)   roughness ${dm.roughness.toFixed(2)}  normalScale.x ${dm.normalScale.x.toFixed(2)}`,
        `ShaderMaterial      tint #${(shader.uniforms.tint!.value as THREE.Color).getHexString()}  intensity ${shader.uniforms.intensity!.value.toFixed(2)}  resolution.x ${shader.uniforms.resolution!.value.x.toFixed(0)}`,
      ].join('\n');
    },
  });
  stage.scene.add(standard, direct, striped, new THREE.AmbientLight('#ffffff', 0.35));
  const sun = new THREE.DirectionalLight('#ffffff', 3);
  sun.position.set(3, 2, 4);
  stage.scene.add(sun);

  const loop = { duration: 2600, loop: true, alternate: true, ease: 'inOutSine' } as const;
  const anims = [
    // On the mesh: writes go to mesh.material.
    animate(standard, { metalness: [0, 1], emissive: ['#000000', '#00ffff'], ...loop }),
    // On the material itself: same names, no mesh needed.
    animate(direct.material as THREE.MeshStandardMaterial, { roughness: [0.1, 1], normalScaleX: [0, 2], ...loop }),
    // ShaderMaterial uniforms by name; Vector2 uniforms expose resolutionX / resolutionY.
    animate(shader, { tint: ['#ff0000', '#00ffff'], intensity: [0.4, 1], resolutionX: [100, 800], ...loop }),
    animate([standard, direct, striped], { rotateY: 360, duration: 9000, loop: true, ease: 'linear' }),
  ];
  if (!preview) el.append(readout);

  return () => {
    anims.forEach((a) => a.revert());
    stage.destroy();
  };
};

export default mount;
