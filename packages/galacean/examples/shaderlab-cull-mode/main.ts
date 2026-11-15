// ShaderLab RasterState.CullMode from a variable, set per material
import { CullMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/CullMode" {
  SubShader "Default" {
    Pass "Forward" {
      CullMode cullMode;

      RasterState customRaster {
        CullMode = cullMode;
      }
      RasterState = customRaster;

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;

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
        vec3 n = normalize(varying.normal);
        if (!gl_FrontFacing) n = -n;
        float shade = 0.35 + 0.65 * max(dot(n, normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        vec3 base = gl_FrontFacing ? vec3(0.95, 0.6, 0.25) : vec3(0.3, 0.6, 0.95);
        gl_FragColor = vec4(base * shade, 1.0);
      }
    }
  }
}`;

const MODES = ['Back', 'Front', 'Off'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 8], light: false, hint: 'CullMode.Back (default), CullMode.Front, CullMode.Off. Orange is the outside, blue the inside.' });
  caption(stage, 'CullMode Back | Front | Off');
  const mesh = PrimitiveMesh.createTorus(engine, 1.1, 0.5, 24, 48);
  MODES.forEach((mode, i) => {
    const material = materialOf(engine, SOURCE);
    material.shaderData.setInt('cullMode', CullMode[mode]);
    spin(add(root, mesh, material, [(i - 1) * 3.4, 0, 0]).entity, [30, 20, 0]);
  });
  return stage.dispose;
};

export default mount;
