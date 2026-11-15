// SubShader replacementTag with camera.setReplacementShader(shader, tagName)
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { materialOf, shaderOf } from '../../shared/shaderlab-setup.ts';

const BODY = `
      mat4 renderer_MVPMat;
      mat4 renderer_NormalMat;
      struct Attributes { vec4 POSITION; vec3 NORMAL; };
      struct Varyings { vec3 normal; };
      VertexShader = vert;
      FragmentShader = frag;
      Varyings vert(Attributes attr) {
        Varyings output;
        output.normal = (renderer_NormalMat * vec4(attr.NORMAL, 0.0)).xyz;
        gl_Position = renderer_MVPMat * attr.POSITION;
        return output;
      }`;

const ROCK = `
Shader "Showcase/TagRock" {
  SubShader "Default" {
    Tags { replacementTag = "Rock" }
    Pass "Forward" {${BODY}
      void frag(Varyings varying) {
        float shade = 0.4 + 0.6 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        gl_FragColor = vec4(vec3(0.7, 0.55, 0.4) * shade, 1.0);
      }
    }
  }
}`;

const ICE = `
Shader "Showcase/TagIce" {
  SubShader "Default" {
    Tags { replacementTag = "Ice" }
    Pass "Forward" {${BODY}
      void frag(Varyings varying) {
        float shade = 0.4 + 0.6 * max(dot(normalize(varying.normal), normalize(vec3(0.4, 0.8, 0.6))), 0.0);
        gl_FragColor = vec4(vec3(0.6, 0.8, 0.95) * shade, 1.0);
      }
    }
  }
}`;

const REPLACEMENT = `
Shader "Showcase/TagReplacement" {
  SubShader "ForRocks" {
    Tags { replacementTag = "Rock" }
    Pass "Forward" {${BODY}
      void frag(Varyings varying) {
        gl_FragColor = vec4(0.95, 0.2, 0.2, 1.0);
      }
    }
  }
  SubShader "ForIce" {
    Tags { replacementTag = "Ice" }
    Pass "Forward" {${BODY}
      void frag(Varyings varying) {
        gl_FragColor = vec4(0.2, 0.9, 0.35, 1.0);
      }
    }
  }
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1.5, 8], light: false, hint: 'Rock and Ice SubShaders; the replacement shader has one SubShader per tag.' });
  const say = caption(stage);
  const rock = materialOf(engine, ROCK);
  const ice = materialOf(engine, ICE);
  const replacement = shaderOf(REPLACEMENT);
  [0, 1, 2, 3].forEach((i) => {
    const mesh = i % 2 ? PrimitiveMesh.createSphere(engine, 1, 40) : PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5);
    spin(add(root, mesh, i % 2 ? ice : rock, [(i - 1.5) * 2.6, 0, 0]).entity, [10, 30, 0]);
  });
  const set = (on: boolean): void => {
    if (on) camera.setReplacementShader(replacement, 'replacementTag');
    else camera.resetReplacementShader();
    say(on ? 'setReplacementShader(shader, "replacementTag")' : 'original materials (Rock cubes, Ice spheres)');
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => set(i === 1));
  else {
    set(false);
    checkbox(stage.bar, 'replacement shader', false, set);
  }
  return stage.dispose;
};

export default mount;
