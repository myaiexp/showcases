// ShaderLab uniforms of every kind, each written with its shaderData setter
import { Color, PrimitiveMesh, Vector2, Vector3, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { materialOf } from '../../shared/shaderlab-setup.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const SOURCE = `
Shader "Showcase/UniformTypes" {
  SubShader "Default" {
    Pass "Forward" {
      mat4 renderer_MVPMat;
      float material_Frequency;
      vec2 material_Scroll;
      vec3 material_Tint;
      vec4 material_Mix;
      int material_Bands;
      sampler2D material_Map;

      struct Attributes { vec4 POSITION; vec2 TEXCOORD_0; };
      struct Varyings { vec2 uv; };

      VertexShader = vert;
      FragmentShader = frag;

      Varyings vert(Attributes attr) {
        Varyings output;
        gl_Position = renderer_MVPMat * attr.POSITION;
        output.uv = attr.TEXCOORD_0;
        return output;
      }

      void frag(Varyings varying) {
        vec2 uv = varying.uv + material_Scroll;
        vec3 map = texture2D(material_Map, uv).rgb;
        float bands = floor(uv.y * float(material_Bands)) / float(material_Bands);
        float wave = 0.5 + 0.5 * sin(uv.x * material_Frequency * 6.2831);
        vec3 pattern = material_Tint * (0.3 + 0.7 * wave) * (0.4 + 0.6 * bands);
        gl_FragColor = vec4(mix(pattern, map, material_Mix.x) * material_Mix.y + material_Mix.z, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1, 6], light: false, hint: 'setFloat, setVector2, setVector3, setVector4, setInt, setTexture.' });
  const say = caption(stage);
  const m = materialOf(engine, SOURCE);
  const { shaderData } = m;
  shaderData.setTexture('material_Map', canvasTexture(engine, uvGrid, { size: 256 }));
  const state = { freq: 4, scroll: 0, bands: 6, mix: 0.3, tint: new Color(0.9, 0.5, 0.2, 1) };
  const push = (): void => {
    shaderData.setFloat('material_Frequency', state.freq);
    shaderData.setVector2('material_Scroll', new Vector2(state.scroll, 0));
    shaderData.setVector3('material_Tint', new Vector3(state.tint.r, state.tint.g, state.tint.b));
    shaderData.setVector4('material_Mix', new Vector4(state.mix, 1, 0, 0));
    shaderData.setInt('material_Bands', state.bands);
    say(`freq ${state.freq.toFixed(1)}  scroll ${state.scroll.toFixed(2)}  bands ${state.bands}  mix ${state.mix.toFixed(2)}`);
  };
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.7, 48), m).entity, [0, 20, 0]);
  if (stage.preview) {
    tick(root, (_dt, t) => {
      state.scroll = (t * 0.1) % 1;
      state.freq = 4 + 3 * Math.sin(t * 0.8);
      state.mix = 0.5 + 0.5 * Math.sin(t * 0.5);
      state.bands = 4 + Math.floor(4 * (0.5 + 0.5 * Math.sin(t * 0.3)));
      push();
    });
  } else {
    push();
    slider(stage.bar, 'Frequency (float)', 1, 12, 0.1, state.freq, (v) => { state.freq = v; push(); });
    slider(stage.bar, 'Scroll (vec2)', 0, 1, 0.01, 0, (v) => { state.scroll = v; push(); });
    slider(stage.bar, 'Bands (int)', 1, 16, 1, state.bands, (v) => { state.bands = v; push(); });
    slider(stage.bar, 'Mix (vec4.x)', 0, 1, 0.01, state.mix, (v) => { state.mix = v; push(); });
  }
  return stage.dispose;
};

export default mount;
