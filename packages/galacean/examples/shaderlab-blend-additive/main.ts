// ShaderLab additive BlendState (One, One) for glow effects
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/BlendAdditive" {
  SubShader "Default" {
    Pass "Forward" {
      BlendState additive {
        Enabled = true;
        SourceColorBlendFactor = BlendFactor.One;
        DestinationColorBlendFactor = BlendFactor.One;
      }
      DepthState noWrite {
        WriteEnabled = false;
      }
      BlendState = additive;
      DepthState = noWrite;
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 material_Color;

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
        gl_FragColor = vec4(material_Color.rgb * (0.25 + rim), 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 7], light: false, hint: 'One + One: the framebuffer colour is added to.' });
  caption(stage, 'BlendFactor.One, BlendFactor.One');
  const mesh = PrimitiveMesh.createSphere(engine, 1.5, 40);
  const colors = [new Color(0.9, 0.2, 0.15, 1), new Color(0.15, 0.8, 0.3, 1), new Color(0.2, 0.35, 1, 1)];
  const balls = colors.map((c, i) => {
    const m = materialOf(engine, SOURCE);
    m.shaderData.setColor('material_Color', c);
    return add(root, mesh, m, [0, 0, 0], `orb${i}`).entity;
  });
  tick(root, (_dt, t) => balls.forEach((b, i) => b.transform.setPosition(Math.cos(t * 0.8 + (i * Math.PI * 2) / 3) * 1.1, Math.sin(t * 0.8 + (i * Math.PI * 2) / 3) * 1.1, 0)));
  return stage.dispose;
};

export default mount;
