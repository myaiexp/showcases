// ShaderMaterial with GLSL registered in Effect.ShadersStore and a time uniform
import { ArcRotateCamera, Effect, MeshBuilder, ShaderMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addSlider, createPanel } from './controls.ts';
import './style.css';

// The vertex shader displaces the sphere along its normal; the fragment shader paints bands.
Effect.ShadersStore['waveVertexShader'] = `
precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 worldViewProjection;
uniform float time;
uniform float frequency;
varying vec2 vUV;
varying float vWave;
void main(void) {
  float wave = sin(position.y * frequency + time * 2.0) * 0.12;
  vWave = wave;
  vUV = uv;
  gl_Position = worldViewProjection * vec4(position + normal * wave, 1.0);
}`;

Effect.ShadersStore['waveFragmentShader'] = `
precision highp float;
varying vec2 vUV;
varying float vWave;
uniform float time;
void main(void) {
  float band = 0.5 + 0.5 * sin(vUV.y * 40.0 - time * 3.0);
  vec3 cool = vec3(0.1, 0.35, 0.9);
  vec3 warm = vec3(1.0, 0.45, 0.2);
  gl_FragColor = vec4(mix(cool, warm, band) + vWave * 2.0, 1.0);
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 5, Vector3.Zero(), scene);

  // Names in `route` map to "<name>VertexShader" / "<name>FragmentShader" in the store.
  const material = new ShaderMaterial(
    'wave',
    scene,
    { vertex: 'wave', fragment: 'wave' },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['worldViewProjection', 'time', 'frequency'],
    },
  );
  material.setFloat('frequency', 6);

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2.6, segments: ctx.preview ? 32 : 64 }, scene);
  sphere.material = material;

  let panel: HTMLElement | undefined;
  if (!ctx.preview) {
    camera.attachControl(canvas, true);
    panel = createPanel(el);
    addSlider(panel, 'Frequency', [1, 20, 0.5], 6, (v) => material.setFloat('frequency', v));
  }

  const start = performance.now();
  stage.run(() => {
    material.setFloat('time', (performance.now() - start) / 1000);
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => {
    panel?.remove();
    stage.dispose();
  };
};

export default mount;
