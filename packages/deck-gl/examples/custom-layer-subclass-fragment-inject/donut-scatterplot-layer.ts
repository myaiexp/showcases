// DonutScatterplotLayer: a fragment hook cuts a hole in every dot, sized by a prop
import type { DefaultProps, UpdateParameters } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { ScatterplotLayerProps } from '@deck.gl/layers';
import type { ShaderModule } from '@luma.gl/shadertools';

type DonutUniforms = { inner: number };

const donutUniforms = {
  name: 'donut',
  fs: `\
layout(std140) uniform donutUniforms {
  float inner;
} donut;
`,
  uniformTypes: { inner: 'f32' },
} as const satisfies ShaderModule<DonutUniforms>;

export type DonutProps = {
  /** Hole radius as a fraction of the dot radius, 0 (solid) to 1. */
  holeRatio: number;
};

export class DonutScatterplotLayer<DataT = unknown> extends ScatterplotLayer<DataT, DonutProps> {
  static override layerName = 'DonutScatterplotLayer';
  static override defaultProps = {
    holeRatio: { type: 'number', value: 0.5, min: 0, max: 1 },
  } as DefaultProps<ScatterplotLayerProps & DonutProps>;

  override getShaders() {
    const shaders = super.getShaders();
    return {
      ...shaders,
      modules: [...shaders.modules, donutUniforms],
      inject: {
        ...shaders.inject,
        // geometry.uv is the position inside the dot's quad: length 1 at the circle's edge.
        'fs:DECKGL_FILTER_COLOR': 'if (length(geometry.uv) < donut.inner) discard;',
      },
    };
  }

  override updateState(params: UpdateParameters<this>): void {
    super.updateState(params);
    if (params.changeFlags.extensionsChanged || params.props.holeRatio !== params.oldProps.holeRatio) {
      this.setShaderModuleProps({ donut: { inner: params.props.holeRatio } satisfies DonutUniforms });
    }
  }
}
