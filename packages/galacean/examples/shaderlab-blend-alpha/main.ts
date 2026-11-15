// ShaderLab BlendState for ordinary alpha transparency
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop } from '../../shared/mat-demo.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/BlendAlpha" {
  SubShader "Default" {
    Pass "Forward" {
      BlendState alphaBlend {
        Enabled = true;
        SourceColorBlendFactor = BlendFactor.SourceAlpha;
        DestinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
        SourceAlphaBlendFactor = BlendFactor.One;
        DestinationAlphaBlendFactor = BlendFactor.OneMinusSourceAlpha;
      }
      DepthState noWrite {
        WriteEnabled = false;
      }
      BlendState = alphaBlend;
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
        float shade = 0.55 + 0.45 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        gl_FragColor = vec4(material_Color.rgb * shade, material_Color.a);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0.5, 7], light: false, hint: 'material_Color.a is the blend alpha.' });
  const say = caption(stage);
  backdrop(root, engine, 14, 6, -3);
  const colors = [new Color(1, 0.3, 0.3, 0.5), new Color(0.3, 1, 0.4, 0.5), new Color(0.35, 0.5, 1, 0.5)];
  const materials = colors.map((c) => {
    const m = materialOf(engine, SOURCE);
    m.shaderData.setColor('material_Color', c);
    return m;
  });
  const mesh = PrimitiveMesh.createSphere(engine, 1.4, 40);
  materials.forEach((m, i) => add(root, mesh, m, [(i - 1) * 1.5, i % 2 ? 0.5 : -0.3, i * 0.3]));
  const set = (a: number): void => {
    colors.forEach((c) => (c.a = a));
    say(`SourceAlpha, OneMinusSourceAlpha   alpha ${a.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(0.5 + 0.35 * Math.sin(t)));
  else slider(stage.bar, 'alpha', 0, 1, 0.01, 0.5, set);
  return stage.dispose;
};

export default mount;
