// ShaderLab render state assigned from variables and changed at runtime
import { BlendFactor, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { backdrop } from '../../shared/mat-demo.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/BlendVariable" {
  SubShader "Default" {
    Pass "Forward" {
      BlendFactor sourceColorBlendFactor;
      BlendFactor destinationColorBlendFactor;

      BlendState customBlendState {
        Enabled = true;
        SourceColorBlendFactor = sourceColorBlendFactor;
        DestinationColorBlendFactor = destinationColorBlendFactor;
      }
      DepthState noWrite {
        WriteEnabled = false;
      }
      BlendState = customBlendState;
      DepthState = noWrite;
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
        gl_FragColor = vec4(vec3(1.0, 0.55, 0.2) * shade, 0.55);
      }
    }
  }
}`;

const MODES = {
  'SourceAlpha / OneMinusSourceAlpha': [BlendFactor.SourceAlpha, BlendFactor.OneMinusSourceAlpha],
  'One / One': [BlendFactor.One, BlendFactor.One],
  'DestinationColor / Zero': [BlendFactor.DestinationColor, BlendFactor.Zero],
} as const;
type Mode = keyof typeof MODES;
const NAMES = Object.keys(MODES) as Mode[];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 6.5], light: false, hint: 'setInt("sourceColorBlendFactor", ...) and setInt("destinationColorBlendFactor", ...).' });
  const say = caption(stage);
  backdrop(root, engine, 14, 6, -2.5);
  const material = materialOf(engine, SOURCE);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.7, 40), material).entity, [0, 25, 0]);
  const apply = (mode: Mode): void => {
    material.shaderData.setInt('sourceColorBlendFactor', MODES[mode][0]);
    material.shaderData.setInt('destinationColorBlendFactor', MODES[mode][1]);
    say(mode);
  };
  if (stage.preview) steps(root, 2.4, NAMES.length, (i) => apply(NAMES[i]!));
  else {
    apply(NAMES[0]!);
    select(stage.bar, 'factors', NAMES, apply);
  }
  return stage.dispose;
};

export default mount;
