// ShaderLab macros: enableMacro and disableMacro pick the compiled variant
import { Color, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';
import { canvasTexture, checker } from '../../shared/textures.ts';

const SOURCE = `
Shader "Showcase/MacroToggle" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      vec4 scene_ElapsedTime;
      vec4 material_BaseColor;
      sampler2D material_BaseTexture;

      struct Attributes { vec4 POSITION; vec2 TEXCOORD_0; };
      struct Varyings { vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        vec4 pos = attr.POSITION;
        #ifdef ENABLE_ANIMATION
          pos.xyz *= 1.0 + 0.18 * sin(pos.y * 4.0 + scene_ElapsedTime.x * 3.0);
        #endif
        gl_Position = renderer_MVPMat * pos;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        vec4 color = material_BaseColor;
        #ifdef USE_TEXTURE
          color *= texture2D(material_BaseTexture, varying.uv * 2.0);
        #endif
        gl_FragColor = color;
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], light: false, hint: 'USE_TEXTURE and ENABLE_ANIMATION are independent macros.' });
  const say = caption(stage);
  const material = materialOf(engine, SOURCE);
  material.shaderData.setColor('material_BaseColor', new Color(0.95, 0.65, 0.25, 1));
  material.shaderData.setTexture('material_BaseTexture', canvasTexture(engine, checker('#ffffff', '#555d70', 8), { size: 256 }));
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.6, 48), material).entity, [0, 25, 0]);
  const apply = (texture: boolean, animation: boolean): void => {
    if (texture) material.shaderData.enableMacro('USE_TEXTURE');
    else material.shaderData.disableMacro('USE_TEXTURE');
    if (animation) material.shaderData.enableMacro('ENABLE_ANIMATION');
    else material.shaderData.disableMacro('ENABLE_ANIMATION');
    say(`USE_TEXTURE ${texture ? 'on' : 'off'}   ENABLE_ANIMATION ${animation ? 'on' : 'off'}`);
  };
  if (stage.preview) steps(root, 2.2, 4, (i) => apply(i % 2 === 1, i >= 2));
  else {
    let texture = false;
    let animation = false;
    apply(texture, animation);
    checkbox(stage.bar, 'USE_TEXTURE', texture, (v) => apply((texture = v), animation));
    checkbox(stage.bar, 'ENABLE_ANIMATION', animation, (v) => apply(texture, (animation = v)));
  }
  return stage.dispose;
};

export default mount;
