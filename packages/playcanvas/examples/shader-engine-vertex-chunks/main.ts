// Engine vertex chunks: #include transformCoreVS and normalCoreVS
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// transformCoreVS declares vertex_position, matrix_model and matrix_viewProjection and provides
// getModelMatrix() and getLocalPosition(); normalCoreVS declares vertex_normal and provides
// getNormalMatrix() and getLocalNormal(). Skinning, morphing and instancing then come for free.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderEngineVertexChunks',
  vertexGLSL: /* glsl */ `
    #include "transformCoreVS"
    #include "normalCoreVS"

    uniform vec3 uLightDir;
    varying float brightness;

    void main(void) {
        mat4 modelMatrix = getModelMatrix();
        vec3 localPos = getLocalPosition(vertex_position.xyz);
        vec4 worldPos = modelMatrix * vec4(localPos, 1.0);

        mat3 normalMatrix = getNormalMatrix(modelMatrix);
        vec3 localNormal = getLocalNormal(vertex_normal);
        vec3 worldNormal = normalize(normalMatrix * localNormal);

        // wrap-around diffuse: the dark side is lifted instead of going black
        brightness = (dot(worldNormal, uLightDir) + 1.0) * 0.5;

        gl_Position = matrix_viewProjection * worldPos;
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying float brightness;
    uniform vec3 uColor;
    void main(void) {
        gl_FragColor = vec4(uColor * brightness, 1.0);
    }
  `,
  // the chunks declare these two attributes, so the map names them the same way
  attributes: {
    vertex_position: pc.SEMANTIC_POSITION,
    vertex_normal: pc.SEMANTIC_NORMAL,
  },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 8, pitch: -15, autoRotate: 0 });
  const { app } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uColor', [1, 0.7, 0.35]);

  const light = new pc.Vec3();
  let angle = 0;
  let spin = 40;
  const setLight = (): void => {
    light.set(Math.cos(angle), 0.55, Math.sin(angle)).normalize();
    material.setParameter('uLightDir', [light.x, light.y, light.z]);
  };
  setLight();

  const shapes = [
    addShape(app, 'sphere', material, [-2.5, 0, 0], 2),
    addShape(app, 'box', material, [0, 0, 0], 1.7),
    addShape(app, 'cone', material, [2.5, 0, 0], [1.8, 2.2, 1.8]),
  ];
  onTick(app, (_t, dt) => {
    angle += dt * 1.2;
    setLight();
    // Rotating the models changes matrix_normal, which getNormalMatrix() returns.
    shapes.forEach((s, i) => s.rotate(0, spin * dt * (i + 1) * 0.5, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('model spin (deg/s)', 0, 120, 1, spin, (v) => (spin = v));
  }

  return () => scene.dispose();
};

export default mount;
