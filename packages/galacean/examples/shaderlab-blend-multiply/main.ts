// ShaderLab multiplicative BlendState (DestinationColor, Zero)
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { backdrop } from '../../shared/mat-demo.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/BlendMultiply" {
  SubShader "Default" {
    Pass "Forward" {
      BlendState multiply {
        Enabled = true;
        SourceColorBlendFactor = BlendFactor.DestinationColor;
        DestinationColorBlendFactor = BlendFactor.Zero;
      }
      DepthState noWrite {
        WriteEnabled = false;
      }
      BlendState = multiply;
      DepthState = noWrite;
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      vec4 material_Color;

      struct Attributes { vec4 POSITION; };

      VertexShader = vert;
      FragmentShader = frag;

      void vert(Attributes attr) {
        gl_Position = renderer_MVPMat * attr.POSITION;
      }

      void frag() {
        gl_FragColor = vec4(material_Color.rgb, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 7], light: false, hint: 'Result = source colour x what is already on screen.' });
  caption(stage, 'DestinationColor, Zero');
  backdrop(root, engine, 14, 6, -2);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.6, 3.2, 0.1);
  const colors = [new Color(1, 0.3, 0.3, 1), new Color(0.3, 1, 0.4, 1), new Color(0.35, 0.5, 1, 1)];
  const panes = colors.map((c, i) => {
    const m = materialOf(engine, SOURCE);
    m.shaderData.setColor('material_Color', c);
    return add(root, mesh, m, [(i - 1) * 1.2, 0, 0], `pane${i}`).entity;
  });
  tick(root, (_dt, t) => panes.forEach((p, i) => p.transform.setPosition((i - 1) * 1.2 + Math.sin(t * 0.7 + i * 2) * 1.5, 0, 0.2 * i)));
  return stage.dispose;
};

export default mount;
