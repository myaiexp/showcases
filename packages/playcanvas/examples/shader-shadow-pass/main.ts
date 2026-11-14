// SHADOW_PASS in a custom shader: shadowCasterPS makes a mesh cast shadows
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addGeometry, addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The same vertex shader renders the shadow map, so the sway below shows up in the shadow too.
// matrix_normal does not exist in that pass, which is why the lighting is skipped under SHADOW_PASS.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderShadowPass',
  vertexGLSL: /* glsl */ `
    #include "transformCoreVS"
    #include "normalCoreVS"

    uniform float uTime;
    uniform float uSway;
    varying float vLight;

    void main(void) {
        mat4 modelMatrix = getModelMatrix();
        vec3 localPos = getLocalPosition(vertex_position.xyz);
        // bend the column sideways, more towards the top
        float h = localPos.y + 1.5;
        localPos.x += sin(h * 2.2 - uTime * 2.5) * uSway * h * 0.25;
        localPos.z += cos(h * 1.7 - uTime * 2.0) * uSway * h * 0.25;
        vec4 worldPos = modelMatrix * vec4(localPos, 1.0);

        #ifdef SHADOW_PASS
            vLight = 1.0;
        #else
            vec3 worldNormal = normalize(getNormalMatrix(modelMatrix) * getLocalNormal(vertex_normal));
            vLight = 0.35 + 0.65 * max(dot(worldNormal, normalize(vec3(0.3, 0.9, 0.4))), 0.0);
        #endif
        gl_Position = matrix_viewProjection * worldPos;
    }
  `,
  fragmentGLSL: /* glsl */ `
    #ifdef SHADOW_PASS
        #include "shadowCasterPS"
    #endif

    varying float vLight;
    uniform vec3 uColor;

    void main(void) {
        #ifdef SHADOW_PASS
            gl_FragColor = getShadowOutput();
        #else
            gl_FragColor = vec4(uColor * vLight, 1.0);
        #endif
    }
  `,
  attributes: { vertex_position: pc.SEMANTIC_POSITION, vertex_normal: pc.SEMANTIC_NORMAL },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, {
    distance: 11,
    pitch: -32,
    autoRotate: 8,
    clear: '#1a1f2b',
    sun: { angles: [55, 35, 0], shadows: true, intensity: 1.1 },
  });
  const { app } = scene;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.33);

  const floor = new pc.StandardMaterial();
  floor.diffuse = new pc.Color().fromString('#6a7284');
  floor.update();
  addShape(app, 'plane', floor, [0, -1.5, 0], [16, 1, 16], { castShadows: false, receiveShadows: true });

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uColor', [1, 0.6, 0.25]);
  material.setParameter('uSway', 1);
  const column = new pc.CylinderGeometry({ radius: 0.4, height: 3, heightSegments: 24, capSegments: 24 });
  const columns = [-2.6, 0, 2.6].map((x) => addGeometry(app, column, material, [x, 0, 0], { castShadows: true, receiveShadows: false }));
  addShape(app, 'sphere', floor, [-1.3, -0.7, 2.2], 1.6, { castShadows: true });

  onTick(app, (t) => material.setParameter('uTime', t));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uSway', 0, 2, 0.05, 1, (v) => material.setParameter('uSway', v));
    panel.check('columns castShadows', true, (on) => columns.forEach((c) => (c.render!.castShadows = on)));
  }

  return () => scene.dispose();
};

export default mount;
