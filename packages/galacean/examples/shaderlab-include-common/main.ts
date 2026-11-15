// ShaderLab #include "Common.glsl" after registerIncludes()
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';
import { quadMesh } from '../../shared/gfx-kit.ts';

const SOURCE = `
Shader "Showcase/IncludeCommon" {
  SubShader "Default" {
    Pass "Forward" {
      #include "Common.glsl"

      mat4 renderer_MVPMat;
      float material_Phase;

      struct Attributes { vec4 POSITION; vec2 TEXCOORD_0; };
      struct Varyings { vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        gl_Position = renderer_MVPMat * attr.POSITION;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        float u = varying.uv.x;
        float x = saturate(u);
        float row = floor(varying.uv.y * 3.0);
        vec4 color = vec4(vec3(x), 1.0);
        if (row == 1.0) {
          color = vec4(vec3(pow2(x)), 1.0);
        } else if (row == 2.0) {
          color = linearToGamma(vec4(vec3(x), 1.0));
        }
        float wave = 0.5 + 0.5 * sin(varying.uv.x * PI * 2.0 + material_Phase);
        color.rgb = mix(color.rgb, color.rgb * wave, step(0.97, fract(varying.uv.y * 3.0)));
        gl_FragColor = color;
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false, hint: 'Top: x. Middle: pow2(x). Bottom: linearToGamma(x). All from Common.glsl.' });
  caption(stage, 'x | pow2(x) | linearToGamma(x)');
  const material = materialOf(engine, SOURCE);
  add(root, quadMesh(engine, 6, 3.4), material);
  tick(root, (_dt, t) => material.shaderData.setFloat('material_Phase', t));
  return stage.dispose;
};

export default mount;
