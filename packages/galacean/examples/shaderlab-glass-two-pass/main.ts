// ShaderLab two passes: back faces first, then front faces, both blended
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop } from '../../shared/mat-demo.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/GlassTwoPass" {
  SubShader "Default" {
    BlendState glassBlend {
      Enabled = true;
      SourceColorBlendFactor = BlendFactor.SourceAlpha;
      DestinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
    }
    DepthState noWrite {
      WriteEnabled = false;
    }
    RasterState cullFront {
      CullMode = CullMode.Front;
    }
    RasterState cullBack {
      CullMode = CullMode.Back;
    }

    Pass "BackFace" {
      RasterState = cullFront;
      BlendState = glassBlend;
      DepthState = noWrite;
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      vec4 material_GlassColor;
      float material_GlassAlpha;
      struct Attributes { vec4 POSITION; };

      VertexShader = vert;
      FragmentShader = frag;

      void vert(Attributes attr) { gl_Position = renderer_MVPMat * attr.POSITION; }
      void frag() { gl_FragColor = vec4(material_GlassColor.rgb * 0.6, material_GlassAlpha * 0.3); }
    }

    Pass "FrontFace" {
      RasterState = cullBack;
      BlendState = glassBlend;
      DepthState = noWrite;
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 material_GlassColor;
      float material_GlassAlpha;
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
        float rim = 1.0 - abs(normalize(varying.normal).z);
        gl_FragColor = vec4(material_GlassColor.rgb + rim * 0.5, material_GlassAlpha * (0.25 + rim));
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 7], light: false, hint: 'Pass BackFace (CullMode.Front) then Pass FrontFace (CullMode.Back).' });
  const say = caption(stage, 'BackFace pass, FrontFace pass');
  backdrop(root, engine, 14, 6, -3);
  const material = materialOf(engine, SOURCE);
  material.shaderData.setColor('material_GlassColor', new Color(0.3, 0.7, 1, 1));
  material.shaderData.setFloat('material_GlassAlpha', 0.8);
  spin(add(root, PrimitiveMesh.createTorus(engine, 1.3, 0.65, 32, 64), material).entity, [20, 30, 0]);
  if (!stage.preview) {
    slider(stage.bar, 'material_GlassAlpha', 0, 1, 0.01, 0.8, (v) => {
      material.shaderData.setFloat('material_GlassAlpha', v);
      say(`BackFace pass, FrontFace pass   alpha ${v.toFixed(2)}`);
    });
  }
  return stage.dispose;
};

export default mount;
