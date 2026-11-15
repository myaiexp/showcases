// ShaderLab scene_ElapsedTime drives vertex and colour animation on the GPU
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/VarTime" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 scene_ElapsedTime;

      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 normal; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        float pulse = 0.5 + 0.5 * sin(scene_ElapsedTime.x * 3.0 + attr.POSITION.y * 4.0);
        vec4 pos = attr.POSITION;
        pos.xyz += attr.NORMAL * 0.22 * pulse;
        output.normal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        gl_Position = renderer_MVPMat * pos;
        return output;
      }

      void frag(Varyings varying) {
        float shade = 0.4 + 0.6 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        vec3 base = vec3(0.6 + 0.4 * scene_ElapsedTime.y, 0.6 + 0.4 * scene_ElapsedTime.z, 0.9 - 0.3 * scene_ElapsedTime.y);
        gl_FragColor = vec4(base * shade, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], light: false, hint: 'scene_ElapsedTime = (t, sin t, cos t, 0); nothing in the script animates the shader.' });
  caption(stage, 'scene_ElapsedTime (x, y, z)');
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.4, 64), materialOf(engine, SOURCE)).entity, [0, 15, 0]);
  return stage.dispose;
};

export default mount;
