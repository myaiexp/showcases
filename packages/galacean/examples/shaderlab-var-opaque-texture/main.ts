// ShaderLab camera_OpaqueTexture sampled from a transparent surface
import type { Mount } from '@/types.ts';
import { add, caption, demo, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { backdrop } from '../../shared/mat-demo.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/OpaqueLens" {
  SubShader "Default" {
    Pass "Forward" {
      RenderQueueType = Transparent;

      mat4 renderer_MVPMat;
      vec4 scene_ElapsedTime;
      sampler2D camera_OpaqueTexture;

      struct Attributes { vec4 POSITION; vec2 TEXCOORD_0; };
      struct Varyings { vec4 clip; vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        gl_Position = renderer_MVPMat * attr.POSITION;
        output.clip = gl_Position;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        vec2 screen = varying.clip.xy / varying.clip.w * 0.5 + 0.5;
        float ripple = sin(screen.y * 60.0 + scene_ElapsedTime.x * 4.0) * 0.012;
        vec3 behind = texture2D(camera_OpaqueTexture, screen + vec2(ripple, 0.0)).rgb;
        float edge = smoothstep(0.0, 0.08, min(min(varying.uv.x, 1.0 - varying.uv.x), min(varying.uv.y, 1.0 - varying.uv.y)));
        gl_FragColor = vec4(mix(vec3(0.9), behind * vec3(0.9, 1.0, 1.0), edge), 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 7], light: false, hint: 'camera.opaqueTextureEnabled = true; the lens reads camera_OpaqueTexture.' });
  camera.opaqueTextureEnabled = true;
  caption(stage, 'camera_OpaqueTexture');
  backdrop(root, engine, 14, 6, -2);
  const lens = add(root, quadMesh(engine, 3.4, 3.4), materialOf(engine, SOURCE), [0, 0, 1], 'lens').entity;
  tick(lens, (_dt, t) => lens.transform.setPosition(Math.sin(t * 0.7) * 3, Math.sin(t * 1.1) * 0.6, 1));
  return stage.dispose;
};

export default mount;
