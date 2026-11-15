// ShaderLab #ifdef macros chosen per material with shaderData.enableMacro
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/DebugColors" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;

      struct Attributes {
        vec4 POSITION;
        vec3 NORMAL;
        vec2 TEXCOORD_0;
      };

      struct Varyings {
        vec2 uv;
        vec3 normal;
        vec3 position;
      };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.uv = attr.TEXCOORD_0;
        output.normal = normalize((renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz);
        output.position = attr.POSITION.xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        vec3 color = vec3(0.5);
        #ifdef DEBUG_UV
          color = vec3(varying.uv, 0.0);
        #endif
        #ifdef DEBUG_NORMAL
          color = normalize(varying.normal) * 0.5 + 0.5;
        #endif
        #ifdef DEBUG_POSITION
          color = varying.position * 0.5 + 0.5;
        #endif
        gl_FragColor = vec4(color, 1.0);
      }
    }
  }
}`;

const MACROS = ['DEBUG_UV', 'DEBUG_NORMAL', 'DEBUG_POSITION'];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.5, 7], light: false, hint: 'Each sphere enables one macro: DEBUG_UV, DEBUG_NORMAL, DEBUG_POSITION.' });
  caption(stage, 'DEBUG_UV | DEBUG_NORMAL | DEBUG_POSITION');
  const mesh = PrimitiveMesh.createSphere(engine, 1.2, 48);
  MACROS.forEach((macro, i) => {
    const material = materialOf(engine, SOURCE);
    material.shaderData.enableMacro(macro);
    spin(add(root, mesh, material, [(i - 1) * 3, 0, 0]).entity, [10, 30, 0]);
  });
  return stage.dispose;
};

export default mount;
