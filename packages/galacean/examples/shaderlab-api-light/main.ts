// ShaderLab Light.glsl: getDirectLight(index) in a hand-written Lambert shader
import { Color, DirectLight, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/ApiLight" {
  SubShader "Default" {
    Pass "Forward" {
      #include "Light.glsl"

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 material_Color;

      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 normal; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.normal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        vec3 normal = normalize(varying.normal);
        vec3 color = material_Color.rgb * 0.08;
        #ifdef SCENE_DIRECT_LIGHT_COUNT
          for (int i = 0; i < SCENE_DIRECT_LIGHT_COUNT; i++) {
            DirectLight light = getDirectLight(i);
            float ndl = max(dot(normal, -light.direction), 0.0);
            color += material_Color.rgb * light.color * ndl;
          }
        #endif
        gl_FragColor = vec4(color, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [0, 1.5, 7], light: true, hint: 'getDirectLight(i).color and .direction, for each directional light in the scene.' });
  caption(stage, 'getDirectLight(i): two suns');
  light.color.set(1, 0.45, 0.2, 1);
  const second = root.createChild('second sun');
  const other = second.addComponent(DirectLight);
  other.color.set(0.2, 0.5, 1, 1);
  tick(light.entity, (_dt, t) => light.entity.transform.setRotation(-30, t * 50, 0));
  tick(second, (_dt, t) => second.transform.setRotation(-30, -t * 35 + 180, 0));
  const material = materialOf(engine, SOURCE);
  material.shaderData.setColor('material_Color', new Color(0.9, 0.9, 0.9, 1));
  const meshes = [PrimitiveMesh.createSphere(engine, 1.1, 48), PrimitiveMesh.createTorus(engine, 0.9, 0.35, 24, 48), PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6)];
  meshes.forEach((mesh, i) => add(root, mesh, material, [(i - 1) * 3, 0, 0]));
  return stage.dispose;
};

export default mount;
