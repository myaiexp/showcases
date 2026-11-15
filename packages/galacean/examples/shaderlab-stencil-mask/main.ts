// ShaderLab StencilState: one shader writes the mask, another tests against it
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const WRITE = `
Shader "Showcase/StencilWrite" {
  SubShader "Default" {
    Pass "StencilWrite" {
      StencilState writeMask {
        Enabled = true;
        ReferenceValue = 1;
        CompareFunctionFront = CompareFunction.Always;
        PassOperationFront = StencilOperation.Replace;
        CompareFunctionBack = CompareFunction.Always;
        PassOperationBack = StencilOperation.Replace;
      }
      BlendState noColor {
        ColorWriteMask = 0;
      }
      DepthState noDepthWrite {
        WriteEnabled = false;
      }
      StencilState = writeMask;
      BlendState = noColor;
      DepthState = noDepthWrite;

      mat4 renderer_MVPMat;
      struct Attributes { vec4 POSITION; };

      VertexShader = vert;
      FragmentShader = frag;

      void vert(Attributes attr) { gl_Position = renderer_MVPMat * attr.POSITION; }
      void frag() { gl_FragColor = vec4(0.0); }
    }
  }
}`;

const TEST = `
Shader "Showcase/StencilTest" {
  SubShader "Default" {
    Pass "StencilTest" {
      StencilState testMask {
        Enabled = true;
        ReferenceValue = 1;
        CompareFunctionFront = CompareFunction.Equal;
        CompareFunctionBack = CompareFunction.Equal;
      }
      StencilState = testMask;
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      struct Attributes { vec4 POSITION; vec3 NORMAL; vec2 TEXCOORD_0; };
      struct Varyings { vec3 normal; vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.normal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        output.uv = attr.TEXCOORD_0;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        float stripes = step(0.5, fract(varying.uv.x * 12.0));
        vec3 base = mix(vec3(0.95, 0.65, 0.2), vec3(0.2, 0.55, 0.95), stripes);
        float shade = 0.5 + 0.5 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        gl_FragColor = vec4(base * shade, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 7], light: false, hint: 'The window writes stencil 1 (no colour); the sphere draws only where stencil == 1.' });
  caption(stage, 'StencilState Replace -> Equal');
  const window = add(root, PrimitiveMesh.createCylinder(engine, 1.4, 1.4, 0.05, 48), materialOf(engine, WRITE), [0, 0, 1.5], 'window');
  window.entity.transform.setRotation(90, 0, 0);
  const sphere = add(root, PrimitiveMesh.createSphere(engine, 2.4, 48), materialOf(engine, TEST), [0, 0, -1], 'content');
  spin(sphere.entity, [10, 35, 0]);
  tick(window.entity, (_dt, t) => window.entity.transform.setPosition(Math.sin(t * 0.8) * 2.2, Math.cos(t * 0.6) * 0.8, 1.5));
  return stage.dispose;
};

export default mount;
