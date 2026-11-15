// ShaderLab Normal.glsl: derivative TBN plus a normal texture in a custom shader
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { domeNormals } from '../../shared/mat-maps.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SOURCE = `
Shader "Showcase/ApiNormal" {
  SubShader "Default" {
    Pass "Forward" {
      #include "Transform.glsl"
      #include "Normal.glsl"

      sampler2D material_NormalTexture;
      float material_NormalIntensity;

      struct Attributes { vec4 POSITION; vec3 NORMAL; vec2 TEXCOORD_0; };
      struct Varyings { vec3 worldPos; vec3 worldNormal; vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        output.worldPos = (renderer_ModelMat * attr.POSITION).xyz;
        output.worldNormal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        output.uv = attr.TEXCOORD_0 * vec2(3.0, 2.0);
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }

      void frag(Varyings varying) {
        vec3 normal = normalize(varying.worldNormal);
        mat3 tbn = getTBNByDerivatives(varying.uv, normal, varying.worldPos, gl_FrontFacing);
        vec3 bumped = getNormalByNormalTexture(tbn, material_NormalTexture, material_NormalIntensity, varying.uv, gl_FrontFacing);
        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
        vec3 viewDir = normalize(camera_Position - varying.worldPos);
        float diffuse = max(dot(bumped, lightDir), 0.0);
        float spec = pow(max(dot(bumped, normalize(lightDir + viewDir)), 0.0), 40.0);
        gl_FragColor = vec4(vec3(0.75, 0.8, 0.9) * (0.15 + 0.85 * diffuse) + spec * 0.6, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], light: false, hint: 'material_NormalIntensity scales getNormalByNormalTexture.' });
  const say = caption(stage);
  const material = materialOf(engine, SOURCE);
  material.shaderData.setTexture('material_NormalTexture', domeNormals(engine, 3));
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.7, 64), material).entity, [0, 22, 0]);
  const set = (v: number): void => {
    material.shaderData.setFloat('material_NormalIntensity', v);
    say(`getNormalByNormalTexture  intensity ${v.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(1 + 0.8 * Math.sin(t)));
  else {
    set(1);
    slider(stage.bar, 'intensity', 0, 3, 0.01, 1, set);
  }
  return stage.dispose;
};

export default mount;
