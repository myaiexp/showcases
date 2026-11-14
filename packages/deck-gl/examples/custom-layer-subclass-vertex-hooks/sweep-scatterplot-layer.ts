// SweepScatterplotLayer: vertex hooks that read geometry.worldPosition to light a moving band
import type { DefaultProps } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { ScatterplotLayerProps } from '@deck.gl/layers';
import type { ShaderModule } from '@luma.gl/shadertools';

type SweepUniforms = { lng: number; width: number };

const sweepUniforms = {
  name: 'sweep',
  vs: `\
layout(std140) uniform sweepUniforms {
  float lng;
  float width;
} sweep;
`,
  uniformTypes: { lng: 'f32', width: 'f32' },
} as const satisfies ShaderModule<SweepUniforms>;

export type SweepProps = {
  /** Longitude of the band centre, in degrees. */
  sweepLng: number;
  /** Half-width of the band, in degrees. */
  sweepWidth: number;
};

export class SweepScatterplotLayer<DataT = unknown> extends ScatterplotLayer<DataT, SweepProps> {
  static override layerName = 'SweepScatterplotLayer';
  static override defaultProps = {
    sweepLng: { type: 'number', value: 0 },
    sweepWidth: { type: 'number', value: 25, min: 1 },
  } as DefaultProps<ScatterplotLayerProps & SweepProps>;

  override getShaders() {
    const shaders = super.getShaders();
    return {
      ...shaders,
      modules: [...shaders.modules, sweepUniforms],
      inject: {
        ...shaders.inject,
        // Both hooks see the VertexGeometry struct. worldPosition is the instance position as given
        // to the layer: [longitude, latitude, altitude] in the default coordinate system.
        'vs:#decl': 'float sweepGlow = 0.0;',
        'vs:#main-start': 'sweepGlow = max(0.0, 1.0 - abs(instancePositions.x - sweep.lng) / sweep.width);',
        'vs:DECKGL_FILTER_SIZE': 'size.xy *= 1.0 + 1.5 * sweepGlow;',
        'vs:DECKGL_FILTER_COLOR': 'color.rgb = mix(color.rgb, vec3(1.0), sweepGlow * 0.85);',
      },
    };
  }

  override draw(params: Parameters<ScatterplotLayer['draw']>[0]): void {
    const { sweepLng, sweepWidth } = this.props;
    this.setShaderModuleProps({ sweep: { lng: sweepLng, width: sweepWidth } satisfies SweepUniforms });
    super.draw(params);
  }
}
