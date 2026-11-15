// ShaderLab Skin.glsl: getSkinMatrix on a skinned glTF built in code
import { AnimationClip, Animator, AssetType, type GLTFResource, SkinnedMeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo } from '../../shared/gfx-kit.ts';
import { tentacleGlb } from '../../shared/gltf-models.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/SkinnedUnlit" {
  SubShader "Default" {
    Pass "Forward" {
      #include "Transform.glsl"

      struct Attributes {
        vec4 POSITION;
        vec3 NORMAL;
        vec2 TEXCOORD_0;
        #ifdef RENDERER_HAS_SKIN
          vec4 JOINTS_0;
          vec4 WEIGHTS_0;
        #endif
      };
      struct Varyings { vec3 normal; vec2 uv; };

      #include "Skin.glsl"

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        vec4 position = attr.POSITION;
        vec3 normal = attr.NORMAL;
        #ifdef RENDERER_HAS_SKIN
          mat4 skinMatrix = getSkinMatrix(attr);
          position = skinMatrix * position;
          normal = (skinMatrix * vec4(normal, 0.0)).xyz;
        #endif
        gl_Position = renderer_MVPMat * position;
        output.normal = (renderer_NormalMat * vec4(normal, 0.0)).xyz;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        float shade = 0.4 + 0.6 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.7, 0.6))), 0.0);
        float rings = 0.8 + 0.2 * step(0.5, fract(varying.uv.y * 12.0));
        gl_FragColor = vec4(vec3(0.85, 0.4, 0.95) * shade * rings, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.2, 6], target: [0, 1.2, 0], light: false, hint: 'The glTF is generated in code; its renderer gets a ShaderLab material that includes Skin.glsl.' });
  caption(stage, 'getSkinMatrix(attr)');
  const url = tentacleGlb().url();
  stage.own(() => URL.revokeObjectURL(url));
  const gltf = await engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF });
  if (ctx.signal.aborted) return stage.dispose;
  const model = gltf.instantiateSceneRoot();
  root.addChild(model);
  model.transform.setPosition(0, -0.8, 0);
  const material = materialOf(engine, SOURCE);
  for (const r of model.getComponentsIncludeChildren(SkinnedMeshRenderer, [])) r.setMaterial(material);
  const animator = model.getComponent(Animator);
  const clip = gltf.animations?.find((a: AnimationClip) => a.name === 'Sway') ?? gltf.animations?.[0];
  if (animator && clip) animator.play(clip.name);
  return stage.dispose;
};

export default mount;
