// ColorKeyExtension: keep only the fragments whose colour is dominated by one channel
import { LayerExtension } from '@deck.gl/core';
import type { CompositeLayer, Layer, UpdateParameters } from '@deck.gl/core';
import type { ShaderModule } from '@luma.gl/shadertools';

type KeyUniforms = { channel: number; enabled: number };

const keyUniforms = {
  name: 'colorKey',
  fs: `\
layout(std140) uniform colorKeyUniforms {
  float channel;
  float enabled;
} colorKey;
`,
  uniformTypes: { channel: 'f32', enabled: 'f32' },
} as const satisfies ShaderModule<KeyUniforms>;

export type ColorKeyProps = {
  /** 0 red, 1 green, 2 blue. */
  keyChannel?: number;
  keyEnabled?: boolean;
};

export class ColorKeyExtension extends LayerExtension {
  static override extensionName = 'ColorKeyExtension';
  // Props the extension adds to every layer it is attached to.
  static override defaultProps = {
    keyChannel: { type: 'number', value: 0, min: 0, max: 2 },
    keyEnabled: true,
  };

  override getShaders(this: Layer) {
    return {
      modules: [keyUniforms],
      inject: {
        'fs:DECKGL_FILTER_COLOR': `
          vec3 mask = vec3(float(colorKey.channel < 0.5), float(colorKey.channel > 0.5 && colorKey.channel < 1.5), float(colorKey.channel > 1.5));
          float own = dot(color.rgb, mask);
          vec3 rest = color.rgb * (1.0 - mask);
          float others = max(rest.r, max(rest.g, rest.b));
          if (colorKey.enabled > 0.5 && own < 2.0 * max(others, 0.001)) {
            discard;
          }
        `,
      },
    };
  }

  // Runs after the layer's own updateState; `this` is the layer.
  override updateState(this: Layer, params: UpdateParameters<Layer>): void {
    const props = params.props as ColorKeyProps;
    const uniforms: KeyUniforms = { channel: props.keyChannel ?? 0, enabled: props.keyEnabled === false ? 0 : 1 };
    for (const model of this.getModels()) model.shaderInputs.setProps({ colorKey: uniforms });
  }

  // A composite layer only passes on the props it knows: hand ours to the sublayers.
  override getSubLayerProps(this: CompositeLayer): ColorKeyProps {
    const { keyChannel, keyEnabled } = this.props as ColorKeyProps;
    return { keyChannel, keyEnabled };
  }
}
