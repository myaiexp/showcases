// ShaderLab Attributes COLOR_0 and TEXCOORD_1 read from a ModelMesh
import { Color, ModelMesh, Vector2, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/VertexInputs" {
  SubShader "Default" {
    Pass "Forward" {
      RasterState both {
        CullMode = CullMode.Off;
      }
      RasterState = both;

      mat4 renderer_MVPMat;

      struct Attributes {
        vec4 POSITION;
        vec4 COLOR_0;
        vec2 TEXCOORD_0;
        vec2 TEXCOORD_1;
      };
      struct Varyings { vec4 color; vec2 uv; vec2 uv1; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.color = attr.COLOR_0;
        output.uv = attr.TEXCOORD_0;
        output.uv1 = attr.TEXCOORD_1;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        float ring = step(0.5, fract(length(varying.uv1 - 0.5) * 8.0));
        vec3 grid = vec3(step(0.5, fract(varying.uv.x * 4.0)) * 0.2);
        gl_FragColor = vec4(varying.color.rgb * (0.45 + 0.55 * ring) + grid, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false, hint: 'Vertex colours on the four corners, a second UV set for the rings.' });
  caption(stage, 'COLOR_0 | TEXCOORD_0 | TEXCOORD_1');
  const mesh = new ModelMesh(engine);
  mesh.setPositions([new Vector3(-1.6, 1.6, 0), new Vector3(1.6, 1.6, 0), new Vector3(1.6, -1.6, 0), new Vector3(-1.6, -1.6, 0)]);
  mesh.setColors([new Color(1, 0.2, 0.2, 1), new Color(0.2, 1, 0.3, 1), new Color(0.2, 0.4, 1, 1), new Color(1, 0.9, 0.2, 1)]);
  mesh.setUVs([new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)]);
  mesh.setUVs([new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)], 1);
  mesh.setIndices(new Uint16Array([0, 2, 1, 0, 3, 2]));
  mesh.addSubMesh(0, 6);
  mesh.uploadData(true);
  spin(add(root, mesh, materialOf(engine, SOURCE)).entity, [0, 30, 0]);
  return stage.dispose;
};

export default mount;
