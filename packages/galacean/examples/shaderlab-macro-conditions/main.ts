// ShaderLab #if defined / #ifdef / #ifndef / #else decide what compiles
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/MacroConditions" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;

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
        vec3 color;
        #if defined(RED) && defined(STRIPES)
          color = vec3(0.95, 0.25, 0.25) * (0.5 + 0.5 * step(0.5, fract(varying.uv.x * 10.0)));
        #else
          #ifdef RED
            color = vec3(0.95, 0.25, 0.25);
          #else
            color = vec3(0.3, 0.55, 0.95);
          #endif
          #ifndef RED
            #ifdef STRIPES
              color *= 0.5 + 0.5 * step(0.5, fract(varying.uv.x * 10.0));
            #endif
          #endif
        #endif
        gl_FragColor = vec4(color, 1.0);
      }
    }
  }
}`;

const COMBOS: [boolean, boolean][] = [[false, false], [true, false], [false, true], [true, true]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 8], light: false, hint: 'Macros per sphere: none, RED, STRIPES, RED + STRIPES.' });
  caption(stage, 'none | RED | STRIPES | RED + STRIPES');
  const mesh = PrimitiveMesh.createSphere(engine, 1.2, 40);
  COMBOS.forEach(([red, stripes], i) => {
    const material = materialOf(engine, SOURCE);
    if (red) material.shaderData.enableMacro('RED');
    if (stripes) material.shaderData.enableMacro('STRIPES');
    spin(add(root, mesh, material, [(i - 1.5) * 2.8, 0, 0]).entity, [10, 30, 0]);
  });
  return stage.dispose;
};

export default mount;
