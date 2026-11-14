// Dual-source blending: a second fragment output as the destination factor
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';
import { checkerTexture } from '../../shared/textures.ts';
import type { ShaderDesc } from '../../shared/shaders.ts';

// gl_FragColor is source0; pcFragColorSecondary is source1. Neither is a separate attachment:
// the second one only takes part in the blend equation.
const shaderDesc: ShaderDesc = {
  uniqueName: 'AdvDualSourceBlending',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec2 vUv0;
    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec2 vUv0;
    uniform float uTime;
    void main(void) {
        // per channel "how much of the backdrop survives": red along x, green along y, blue pulsing
        vec3 keep = vec3(vUv0.x, 0.5 + 0.5 * sin(vUv0.y * 18.0 + uTime * 2.0), 0.5 + 0.5 * sin(uTime));
        gl_FragColor = vec4(vec3(0.9, 0.35, 0.05) * (1.0 - vUv0.x) * 0.6, 0.5);
        pcFragColorSecondary = vec4(keep, vUv0.y);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const FACTORS = {
  'ONE_MINUS_SRC1_COLOR': pc.BLENDMODE_ONE_MINUS_SRC1_COLOR,
  'SRC1_COLOR': pc.BLENDMODE_SRC1_COLOR,
  'SRC1_ALPHA': pc.BLENDMODE_SRC1_ALPHA,
  'ONE_MINUS_SRC1_ALPHA': pc.BLENDMODE_ONE_MINUS_SRC1_ALPHA,
} as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 4.2, pitch: -5, yaw: 0, autoRotate: 0 });
  const { app, stage } = scene;
  const device = stage.device;
  const supported = device.supportsDualSourceBlending;
  if (!supported) showNotice(el, 'This device has no dual-source blending (WEBGL_blend_func_extended), so a plain alpha blend stands in.');

  // The backdrop: an unlit checkerboard to blend over.
  const checker = checkerTexture(device, '#f4f4f4', '#101010', 8, 256);
  const backdrop = new pc.StandardMaterial();
  backdrop.useLighting = false;
  backdrop.diffuse = new pc.Color(0, 0, 0);
  backdrop.emissive = new pc.Color(1, 1, 1);
  backdrop.emissiveMap = checker;
  backdrop.update();
  const back = new pc.Entity('backdrop');
  back.addComponent('render', { type: 'plane', material: backdrop, castShadows: false });
  back.setLocalEulerAngles(90, 0, 0);
  back.setLocalScale(4, 1, 4);
  app.root.addChild(back);

  // pcFragColorSecondary exists only with the extension, so the fallback shader drops that output.
  const material = new pc.ShaderMaterial(
    supported
      ? shaderDesc
      : { ...shaderDesc, uniqueName: 'AdvDualSourceFallback', fragmentGLSL: shaderDesc.fragmentGLSL!.replace(/^.*pcFragColorSecondary.*$/m, '') },
  );
  material.depthWrite = false;
  const setFactor = (name: keyof typeof FACTORS): void => {
    // source0 * 1 + destination * factor(source1), for RGB; alpha keeps the destination.
    material.blendState = supported
      ? new pc.BlendState(true, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ONE, FACTORS[name], pc.BLENDEQUATION_ADD, pc.BLENDMODE_ZERO, pc.BLENDMODE_ONE)
      : pc.BlendState.ALPHABLEND;
    material.update();
  };
  setFactor('ONE_MINUS_SRC1_COLOR');

  const quad = new pc.Entity('quad');
  quad.addComponent('render', { type: 'plane', material, castShadows: false });
  quad.setLocalEulerAngles(90, 0, 0);
  quad.setLocalPosition(0, 0, 0.05);
  quad.setLocalScale(3.2, 1, 3.2);
  app.root.addChild(quad);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    material.setParameter('uTime', t);
    quad.setLocalPosition(Math.sin(t * 0.7) * 0.5, Math.cos(t * 0.5) * 0.3, 0.05);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('destination factor', Object.keys(FACTORS) as (keyof typeof FACTORS)[], 'ONE_MINUS_SRC1_COLOR', setFactor);
    panel.readout(`supportsDualSourceBlending: ${supported}`);
  }

  return () => {
    material.destroy();
    backdrop.destroy();
    checker.destroy();
    scene.dispose();
  };
};

export default mount;
