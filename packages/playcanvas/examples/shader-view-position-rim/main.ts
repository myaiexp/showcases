// Built-in uniform view_position: a rim light from the camera's world position
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, type ShaderDesc } from '../../shared/shaders.ts';

// view_position, matrix_viewProjection, matrix_model and matrix_normal are supplied by the
// engine in forward rendering, so the material only declares them.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderViewPositionRim',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 matrix_model;
    uniform mat3 matrix_normal;
    uniform mat4 matrix_viewProjection;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    void main(void) {
        vec4 worldPos = matrix_model * vec4(aPosition, 1.0);
        vWorldPos = worldPos.xyz;
        vNormalW = normalize(matrix_normal * aNormal);
        gl_Position = matrix_viewProjection * worldPos;
    }
  `,
  fragmentGLSL: /* glsl */ `
    uniform vec3 view_position;   // camera position in world space, from the engine
    uniform vec3 rimColor;
    uniform float rimPower;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    void main(void) {
        vec3 toCamera = normalize(view_position - vWorldPos);
        float facing = clamp(dot(normalize(vNormalW), toCamera), 0.0, 1.0);
        float rim = pow(1.0 - facing, rimPower);
        vec3 body = vec3(0.05, 0.07, 0.12) + 0.12 * facing;
        gl_FragColor = vec4(body + rimColor * rim, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 8, pitch: -14, autoRotate: 16 });
  const { app } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('rimColor', [0.3, 0.8, 1]);
  material.setParameter('rimPower', 2.5);
  addShape(app, 'sphere', material, [-2.5, 0, 0], 2.2);
  addShape(app, 'torus', material, [0, 0, 0], 2.2);
  addShape(app, 'capsule', material, [2.5, 0, 0], [1.4, 2.4, 1.4]);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('rimPower', 0.5, 8, 0.1, 2.5, (v) => material.setParameter('rimPower', v));
    panel.select('rim colour', ['cyan', 'amber', 'magenta'] as const, 'cyan', (name) => {
      const colours = { cyan: [0.3, 0.8, 1], amber: [1, 0.7, 0.2], magenta: [1, 0.3, 0.8] };
      material.setParameter('rimColor', colours[name]);
    });
    panel.readout('drag to orbit: the rim follows view_position');
  }

  return () => scene.dispose();
};

export default mount;
