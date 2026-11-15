// ShaderLab multi-pass outline: inflated back faces, then the object itself
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { color, slider } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/Outline" {
  SubShader "Default" {
    Pass "Outline" {
      RasterState cullFront {
        CullMode = CullMode.Front;
      }
      DepthState depthOn {
        Enabled = true;
        WriteEnabled = true;
        CompareFunction = CompareFunction.LessEqual;
      }
      RasterState = cullFront;
      DepthState = depthOn;

      mat4 renderer_MVPMat;
      vec4 material_OutlineColor;
      float material_OutlineWidth;

      struct Attributes { vec4 POSITION; vec3 NORMAL; };

      VertexShader = outlineVert;
      FragmentShader = outlineFrag;

      void outlineVert(Attributes attr) {
        vec4 pos = attr.POSITION;
        pos.xyz += attr.NORMAL * material_OutlineWidth;
        gl_Position = renderer_MVPMat * pos;
      }

      void outlineFrag() {
        gl_FragColor = material_OutlineColor;
      }
    }

    Pass "Main" {
      RasterState cullBack {
        CullMode = CullMode.Back;
      }
      DepthState depthOn {
        Enabled = true;
        WriteEnabled = true;
        CompareFunction = CompareFunction.LessEqual;
      }
      RasterState = cullBack;
      DepthState = depthOn;

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 material_BaseColor;

      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 worldNormal; };

      VertexShader = mainVert;
      FragmentShader = mainFrag;

      Varyings mainVert(Attributes attr) {
        Varyings output;
        gl_Position = renderer_MVPMat * attr.POSITION;
        output.worldNormal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        return output;
      }

      void mainFrag(Varyings varying) {
        vec3 normal = normalize(varying.worldNormal);
        float NdotL = max(dot(normal, normalize(vec3(1.0, 1.0, 1.0))), 0.0);
        gl_FragColor = vec4(material_BaseColor.rgb * (NdotL + 0.3), material_BaseColor.a);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.5, 8], light: false, hint: 'material_OutlineWidth and material_OutlineColor feed the Outline pass.' });
  const say = caption(stage);
  const material = materialOf(engine, SOURCE);
  const outline = new Color(0.1, 0.9, 1, 1);
  material.shaderData.setColor('material_BaseColor', new Color(1, 0.7, 0.25, 1));
  material.shaderData.setColor('material_OutlineColor', outline);
  const meshes = [PrimitiveMesh.createSphere(engine, 1.2, 40), PrimitiveMesh.createTorus(engine, 1, 0.4, 24, 48), PrimitiveMesh.createCuboid(engine, 1.8, 1.8, 1.8)];
  meshes.forEach((mesh, i) => spin(add(root, mesh, material, [(i - 1) * 3.4, 0, 0]).entity, [15, 30, 0]));
  const width = (w: number): void => {
    material.shaderData.setFloat('material_OutlineWidth', w);
    say(`material_OutlineWidth ${w.toFixed(3)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => width(0.04 + 0.04 * Math.sin(t * 1.5)));
  else {
    width(0.08);
    slider(stage.bar, 'width', 0, 0.2, 0.005, 0.08, width);
    color(stage.bar, 'outline colour', [0.1, 0.9, 1], (c) => outline.set(...c, 1));
  }
  return stage.dispose;
};

export default mount;
