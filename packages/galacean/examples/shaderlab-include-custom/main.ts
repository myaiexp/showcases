// ShaderFactory.registerInclude registers a snippet that #include pulls in
import { Color, PrimitiveMesh, ShaderFactory, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';

const SNIPPET = `
vec3 showcaseToon(vec3 normal, vec3 lightDir, float bands) {
  float ndl = max(dot(normalize(normal), normalize(lightDir)), 0.0);
  return vec3(floor(ndl * bands + 0.5) / bands);
}
`;

let registered = false;

const SOURCE = `
Shader "Showcase/IncludeCustom" {
  SubShader "Default" {
    Pass "Forward" {
      #include "ShowcaseToon"

      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      vec4 material_Color;
      float material_Bands;
      vec3 material_LightDir;

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
        vec3 toon = showcaseToon(varying.normal, material_LightDir, material_Bands);
        gl_FragColor = vec4(material_Color.rgb * (0.2 + 0.8 * toon), 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  if (!registered) {
    registered = true;
    ShaderFactory.registerInclude('ShowcaseToon', SNIPPET);
  }
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 7], light: false, hint: 'Bands 2, 3 and 6 from one registered snippet.' });
  caption(stage, 'registerInclude("ShowcaseToon") + #include');
  const mesh = PrimitiveMesh.createSphere(engine, 1.2, 48);
  const bands = [2, 3, 6];
  const materials = bands.map((b, i) => {
    const m = materialOf(engine, SOURCE);
    m.shaderData.setColor('material_Color', new Color(0.95 - i * 0.3, 0.55 + i * 0.1, 0.3 + i * 0.3, 1));
    m.shaderData.setFloat('material_Bands', b);
    add(root, mesh, m, [(i - 1) * 3, 0, 0]);
    return m;
  });
  tick(root, (_dt, t) => materials.forEach((m) => m.shaderData.setVector3('material_LightDir', new Vector3(Math.sin(t), 0.6, Math.cos(t)))));
  return stage.dispose;
};

export default mount;
