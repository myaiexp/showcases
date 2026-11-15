// A custom effect whose shader is configured by preprocessor defines, recompiled on change
import { Effect } from 'postprocessing';

// Macro values are code: LEVELS is the text "4.0", MODE the text "0" or "1". The pass prefixes
// the macro names per effect, like uniforms, so two effects can both define LEVELS.
const fragmentShader = /* glsl */ `
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 colour = inputColor.rgb;
  #if MODE == 1
    colour = vec3(dot(colour, vec3(0.299, 0.587, 0.114)));
  #endif
  outputColor = vec4(floor(colour * LEVELS + 0.5) / LEVELS, inputColor.a);
}
`;

export class PosterizeEffect extends Effect {
  /** How many times the shader was rebuilt after construction. */
  recompiles = 0;

  constructor(levels = 4, greyscale = false) {
    super('PosterizeEffect', fragmentShader, {
      defines: new Map<string, string>([
        ['LEVELS', levels.toFixed(1)],
        ['MODE', greyscale ? '1' : '0'],
      ]),
    });
  }

  get levels(): number {
    return Number(this.defines.get('LEVELS'));
  }

  /** Changing a macro needs setChanged(): the EffectPass then rebuilds and recompiles its shader. */
  setLevels(levels: number): void {
    this.defines.set('LEVELS', levels.toFixed(1));
    this.recompiles++;
    this.setChanged();
  }

  // Switch by value, not by deleting the key: a pass keeps macros it once set.
  setGreyscale(on: boolean): void {
    this.defines.set('MODE', on ? '1' : '0');
    this.recompiles++;
    this.setChanged();
  }
}
