// ShaderLab renderer_ModelMat turns vertices into world positions
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/VarWorldSpace" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      mat4 renderer_ModelMat;

      struct Attributes { vec4 POSITION; };
      struct Varyings { vec3 worldPos; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.worldPos = (renderer_ModelMat * attr.POSITION).xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        vec3 cell = floor(varying.worldPos * 2.0);
        float parity = mod(cell.x + cell.y + cell.z, 2.0);
        gl_FragColor = vec4(mix(vec3(0.95, 0.75, 0.25), vec3(0.2, 0.3, 0.55), parity), 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 8], light: false, hint: 'World-space checker: the pattern does not follow the sphere.' });
  caption(stage, 'worldPos = renderer_ModelMat * POSITION');
  const ball = add(root, PrimitiveMesh.createSphere(engine, 1.5, 48), materialOf(engine, SOURCE)).entity;
  tick(ball, (_dt, t) => {
    ball.transform.setPosition(Math.sin(t * 0.8) * 3, Math.sin(t * 1.3) * 0.6, 0);
    ball.transform.setRotation(t * 20, t * 35, 0);
  });
  return stage.dispose;
};

export default mount;
