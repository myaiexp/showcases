// ShaderLab RasterState.DepthBias settles z-fighting between planes
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const BODY = `
      mat4 renderer_MVPMat;
      vec4 material_Color;
      struct Attributes { vec4 POSITION; };
      VertexShader = vert;
      FragmentShader = frag;
      void vert(Attributes attr) { gl_Position = renderer_MVPMat * attr.POSITION; }
      void frag() { gl_FragColor = material_Color; }`;

const PLAIN = `
Shader "Showcase/BiasOff" {
  SubShader "Default" {
    Pass "Forward" {${BODY}
    }
  }
}`;

const BIASED = `
Shader "Showcase/BiasOn" {
  SubShader "Default" {
    Pass "Forward" {
      RasterState biased {
        DepthBias = 4.0;
        SlopeScaledDepthBias = 4.0;
      }
      RasterState = biased;${BODY}
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 3.2, 3.2], target: [0, 0, 0], light: false, hint: 'Both pairs draw blue first, red second. Right: DepthBias pushes the red plane back.' });
  caption(stage, 'no bias: red on top | DepthBias = 4 on red: blue on top');
  const mesh = PrimitiveMesh.createPlane(engine, 2.6, 2.6);
  const pair = (x: number, redShader: string): void => {
    const red = materialOf(engine, redShader);
    red.shaderData.setColor('material_Color', new Color(0.9, 0.2, 0.2, 1));
    const blue = materialOf(engine, PLAIN);
    blue.shaderData.setColor('material_Color', new Color(0.2, 0.4, 0.95, 1));
    add(root, mesh, blue, [x, 0, 0]);
    add(root, mesh, red, [x, 0, 0]);
  };
  pair(-1.6, PLAIN);
  pair(1.6, BIASED);
  tick(root, (_dt, t) => stage.engine.sceneManager.activeScene.rootEntities[0]!.transform.setRotation(0, Math.sin(t * 0.5) * 20, 0));
  return stage.dispose;
};

export default mount;
