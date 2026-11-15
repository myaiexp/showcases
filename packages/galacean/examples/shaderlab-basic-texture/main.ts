// ShaderLab Shader > SubShader > Pass with texture sampling and a colour uniform
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const SOURCE = `
Shader "Showcase/01-BasicShader" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      vec4 material_BaseColor;
      sampler2D material_BaseTexture;

      struct Attributes {
        vec4 POSITION;
        vec2 TEXCOORD_0;
      };

      struct Varyings {
        vec2 uv;
      };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        gl_Position = renderer_MVPMat * attr.POSITION;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        vec4 texColor = texture2D(material_BaseTexture, varying.uv);
        gl_FragColor = texColor * material_BaseColor;
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], hint: 'material_BaseColor is a vec4 uniform set with shaderData.setColor.' });
  caption(stage, 'Shader > SubShader > Pass');
  const material = materialOf(engine, SOURCE);
  const tint = new Color(1, 1, 1, 1);
  material.shaderData.setColor('material_BaseColor', tint);
  material.shaderData.setTexture('material_BaseTexture', canvasTexture(engine, uvGrid, { size: 256 }));
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.6, 48), material).entity, [8, 30, 0]);
  if (stage.preview) tick(root, (_dt, t) => tint.set(0.6 + 0.4 * Math.sin(t), 0.6 + 0.4 * Math.sin(t + 2), 0.6 + 0.4 * Math.sin(t + 4), 1));
  else color(stage.bar, 'material_BaseColor', [1, 1, 1], (c) => tint.set(...c, 1));
  return stage.dispose;
};

export default mount;
