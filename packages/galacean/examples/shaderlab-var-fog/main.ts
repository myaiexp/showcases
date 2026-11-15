// ShaderLab Fog.glsl: fog(color, positionVS) with the scene's fog settings
import { FogMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/VarFog" {
  SubShader "Default" {
    Pass "Forward" {
      #include "Transform.glsl"
      #include "Fog.glsl"

      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 normal; vec3 positionVS; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.normal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        output.positionVS = (renderer_MVMat * attr.POSITION).xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        float shade = 0.35 + 0.65 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        vec4 color = vec4(vec3(0.95, 0.6, 0.3) * shade, 1.0);
        #if SCENE_FOG_MODE != 0
          color = fog(color, varying.positionVS);
        #endif
        gl_FragColor = color;
      }
    }
  }
}`;

const SKY: [number, number, number] = [0.55, 0.62, 0.72];
const MODES = ['Linear', 'Exponential', 'ExponentialSquared'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 2, 5], target: [0, 1.2, -20], light: false, background: [...SKY, 1], hint: 'scene.fogMode, fogStart, fogEnd, fogDensity feed scene_FogParams.' });
  const say = caption(stage);
  const { scene } = stage;
  scene.fogColor.set(...SKY, 1);
  scene.fogStart = 3;
  scene.fogEnd = 30;
  scene.fogDensity = 0.08;
  const material = materialOf(engine, SOURCE);
  const mesh = PrimitiveMesh.createCylinder(engine, 0.5, 0.5, 2.6, 20);
  for (let i = 0; i < 14; i++) for (const side of [-1, 1]) add(root, mesh, material, [side * 2.4, 1.3 - 1.2, -i * 3.2]);
  const set = (name: (typeof MODES)[number]): void => {
    scene.fogMode = FogMode[name];
    say(`fogMode = ${name}`);
  };
  if (stage.preview) steps(root, 2.4, MODES.length, (i) => set(MODES[i]!));
  else {
    set('Linear');
    select(stage.bar, 'fogMode', MODES, set);
  }
  return stage.dispose;
};

export default mount;
