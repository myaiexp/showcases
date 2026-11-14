// DistanceFadeExtension: constructor opts pick the shader, draw() feeds it a moving centre
import { LayerExtension } from '@deck.gl/core';
import type { Layer } from '@deck.gl/core';
import type { ShaderModule } from '@luma.gl/shadertools';

type FadeUniforms = { center: [number, number]; radius: number };

const fadeUniforms = {
  name: 'distanceFade',
  vs: `\
layout(std140) uniform distanceFadeUniforms {
  vec2 center;
  float radius;
} distanceFade;
`,
  uniformTypes: { center: 'vec2<f32>', radius: 'f32' },
} as const satisfies ShaderModule<FadeUniforms>;

export type DistanceFadeOptions = {
  /** 'fade' lowers alpha with distance; 'cut' discards everything outside the radius. */
  mode: 'fade' | 'cut';
};

export type DistanceFadeProps = {
  fadeCenter?: [number, number];
  /** In degrees of longitude / latitude. */
  fadeRadius?: number;
};

export class DistanceFadeExtension extends LayerExtension<DistanceFadeOptions> {
  static override extensionName = 'DistanceFadeExtension';
  static override defaultProps = {
    fadeCenter: { type: 'array', value: [0, 0], compare: true },
    fadeRadius: { type: 'number', value: 30, min: 0 },
  };

  constructor(opts: DistanceFadeOptions = { mode: 'fade' }) {
    super(opts);
  }

  // The options change the GLSL itself, so two extensions with different opts are not equal and
  // the layer recompiles its shaders when it gets a new one.
  override getShaders(this: Layer, extension: DistanceFadeExtension) {
    const body =
      extension.opts.mode === 'fade'
        ? 'color.a *= 1.0 - smoothstep(0.5 * distanceFade.radius, distanceFade.radius, d);'
        : 'if (d > distanceFade.radius) color.a = 0.0;';
    return {
      modules: [fadeUniforms],
      inject: {
        'vs:DECKGL_FILTER_COLOR': `float d = distance(geometry.worldPosition.xy, distanceFade.center);\n${body}`,
      },
    };
  }

  // Called before the layer's own draw.
  override draw(this: Layer, params: unknown, _extension: DistanceFadeExtension): void {
    void params;
    const { fadeCenter = [0, 0], fadeRadius = 30 } = this.props as DistanceFadeProps;
    const uniforms: FadeUniforms = { center: [fadeCenter[0] ?? 0, fadeCenter[1] ?? 0], radius: fadeRadius };
    this.setShaderModuleProps({ distanceFade: uniforms });
  }
}
