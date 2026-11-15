// ShaderLab camera_Position and renderer_ModelMat for a view-dependent rim
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, orbit, spin } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/VarCamera" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      mat4 renderer_ModelMat;
      mat4 renderer_NormalMat;
      vec3 camera_Position;

      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 worldPos; vec3 worldNormal; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.worldPos = (renderer_ModelMat * attr.POSITION).xyz;
        output.worldNormal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        vec3 viewDir = normalize(camera_Position - varying.worldPos);
        float facing = max(dot(normalize(varying.worldNormal), viewDir), 0.0);
        float rim = pow(1.0 - facing, 3.0);
        vec3 color = mix(vec3(0.08, 0.1, 0.2), vec3(0.4, 0.9, 1.0), rim);
        gl_FragColor = vec4(color, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 7], light: false, hint: 'camera_Position minus the world position gives the view direction.' });
  caption(stage, 'rim = pow(1 - dot(N, V), 3)');
  const material = materialOf(engine, SOURCE);
  const mesh = PrimitiveMesh.createSphere(engine, 1.3, 48);
  [-1.8, 1.8].forEach((x) => spin(add(root, mesh, material, [x, 0, 0]).entity, [0, 20, 0]));
  orbit(camera.entity, [0, 0, 0], 7, 1.5, 0.5);
  return stage.dispose;
};

export default mount;
