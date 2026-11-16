// A component that replaces the mesh's material with its own THREE.ShaderMaterial
import type { Mesh } from 'three';
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent<{ color: string; speed: number }>('custom-material', {
      schema: {
        color: { type: 'color', default: '#ff7a33' },
        speed: { default: 2 },
      },
      init() {
        this.time = { value: 0 };
        this.el.addEventListener('loaded', () => {
          this.material = (this.el.getObject3D('mesh') as Mesh).material = new THREE.ShaderMaterial({
            uniforms: { color: { value: new THREE.Color(this.data.color) }, time: this.time },
            vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
            fragmentShader: `
              varying vec2 vUv; uniform vec3 color; uniform float time;
              void main() {
                float band = step(0.5, fract(vUv.x * 12.0 - time));
                gl_FragColor = vec4(mix(color, vec3(0.08, 0.1, 0.14), band), 1.0);
              }`,
          });
        });
      },
      update() {
        if (this.material) this.material.uniforms.color.value.set(this.data.color);
      },
      tick(_t: number, dt: number) {
        this.time.value += (dt / 1000) * this.data.speed;
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-torus custom-material="color: #ff7a33; speed: 2" radius="0.8" radius-tubular="0.28" position="0 1.6 -3"
               animation="property: rotation; to: 360 360 0; dur: 14000; easing: linear; loop: true"></a-torus>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
