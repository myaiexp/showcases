// ShaderPass running a custom ShaderMaterial: a wobble with split colour channels
import * as THREE from 'three';
import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // The pass hands its input buffer to the uniform called inputBuffer. The vertex shader
  // reads the pass's fullscreen triangle, whose positions are already in clip space.
  const material = new THREE.ShaderMaterial({
    uniforms: { inputBuffer: { value: null }, time: { value: 0 }, amount: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = position.xy * 0.5 + 0.5;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D inputBuffer;
      uniform float time;
      uniform float amount;
      varying vec2 vUv;
      void main() {
        vec2 wobble = vec2(sin(vUv.y * 28.0 + time * 3.0), cos(vUv.x * 28.0 + time * 2.0)) * 0.004 * amount;
        vec2 uv = vUv + wobble;
        vec2 split = vec2(0.004 * amount, 0.0);
        gl_FragColor = vec4(
          texture2D(inputBuffer, uv + split).r,
          texture2D(inputBuffer, uv).g,
          texture2D(inputBuffer, uv - split).b,
          1.0
        );
        #include <colorspace_fragment>
      }
    `,
    blending: THREE.NoBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new ShaderPass(material));

  const update = tune(
    stage,
    [{ name: 'amount', min: 0, max: 5, step: 0.05, value: 1.5, sweep: [0.2, 4, 6], set: (v) => (material.uniforms.amount!.value = v) }],
    'ShaderPass(ShaderMaterial)',
  );

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    material.uniforms.time!.value = t;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
