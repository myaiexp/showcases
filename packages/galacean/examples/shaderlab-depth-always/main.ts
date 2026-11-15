// ShaderLab DepthState.CompareFunction from a variable: Always draws through walls
import { BlinnPhongMaterial, CompareFunction, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/DepthAlways" {
  SubShader "Default" {
    Pass "Forward" {
      CompareFunction depthCompare;

      DepthState customDepth {
        Enabled = true;
        WriteEnabled = false;
        CompareFunction = depthCompare;
      }
      DepthState = customDepth;
      RenderQueueType = Transparent;

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
        float shade = 0.4 + 0.6 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        gl_FragColor = vec4(vec3(1.0, 0.35, 0.3) * shade, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.2, 7], hint: 'depthCompare: LessEqual (hidden) or Always (visible through the wall).' });
  const say = caption(stage);
  const wall = new BlinnPhongMaterial(engine);
  wall.baseColor.set(0.4, 0.5, 0.65, 1);
  add(root, PrimitiveMesh.createCuboid(engine, 5, 3.2, 0.3), wall, [0, 0, 0], 'wall');
  const material = materialOf(engine, SOURCE);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1, 40), material, [0, 0, -2]).entity, [0, 30, 0]);
  add(root, PrimitiveMesh.createPlane(engine, 14, 14), blinn(engine, [0.35, 0.4, 0.45], 4), [0, -1.6, 0], 'floor');
  const apply = (mode: 'LessEqual' | 'Always'): void => {
    material.shaderData.setInt('depthCompare', CompareFunction[mode]);
    say(`CompareFunction.${mode}`);
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => apply(i === 0 ? 'LessEqual' : 'Always'));
  else {
    apply('LessEqual');
    select(stage.bar, 'depthCompare', ['LessEqual', 'Always'] as const, apply);
  }
  return stage.dispose;
};

export default mount;
