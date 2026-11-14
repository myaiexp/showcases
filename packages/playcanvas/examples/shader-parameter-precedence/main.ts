// Parameter precedence: mesh instance beats material beats global
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, firstInstance, onTick, type ShaderDesc } from '../../shared/shaders.ts';

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderParameterPrecedence',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    uniform mat3 matrix_normal;
    varying vec3 vNormalW;
    void main(void) {
        vNormalW = matrix_normal * aNormal;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec3 vNormalW;
    uniform vec3 tint;
    void main(void) {
        float shade = 0.55 + 0.45 * dot(normalize(vNormalW), normalize(vec3(0.4, 0.8, 0.5)));
        gl_FragColor = vec4(tint * shade, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const GLOBAL = [0.2, 0.45, 1];
const MATERIAL = [0.2, 0.85, 0.35];
const INSTANCE = [1, 0.6, 0.15];

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 6.5, pitch: -10, autoRotate: 8 });
  const { app, stage } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  addShape(app, 'sphere', material, [-1.5, 0, 0], 2.4);
  const overridden = addShape(app, 'sphere', material, [1.5, 0, 0], 2.4);

  const layers = { global: true, material: false, instance: false };
  const apply = (): void => {
    if (layers.material) material.setParameter('tint', MATERIAL);
    else material.deleteParameter('tint');
    if (layers.instance) firstInstance(overridden).setParameter('tint', INSTANCE);
    else firstInstance(overridden).deleteParameter('tint');
  };
  apply();

  // The global value lives on the scope of the graphics device. Material parameters write the same
  // scope slot when they draw, so it is set again before every frame.
  const globalTint = stage.device.scope.resolve('tint');
  let clock = 0;
  onTick(app, (t) => {
    if (ctx.preview && t - clock > 1.4) {
      clock = t;
      // Walk through the four combinations on the card.
      const step = Math.round(t / 1.4) % 4;
      layers.material = step === 1 || step === 3;
      layers.instance = step >= 2;
      apply();
    }
    globalTint.setValue(GLOBAL);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const note = panel.readout();
    const describe = (): void => {
      const left = layers.material ? 'material (green)' : 'global (blue)';
      const right = layers.instance ? 'mesh instance (orange)' : left;
      note.textContent = `left sphere reads ${left}; right sphere reads ${right}`;
    };
    panel.row();
    panel.check('material.setParameter (green)', layers.material, (on) => ((layers.material = on), apply(), describe()));
    panel.check('right sphere meshInstance.setParameter (orange)', layers.instance, (on) => ((layers.instance = on), apply(), describe()));
    panel.readout('global scope value (blue) is always set');
    describe();
  }

  return () => {
    material.deleteParameter('tint');
    scene.dispose();
  };
};

export default mount;
