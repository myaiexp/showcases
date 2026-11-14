// PulsingScatterplotLayer: ScatterplotLayer plus an instanced attribute and a size hook
import type { Accessor, DefaultProps } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { ScatterplotLayerProps } from '@deck.gl/layers';
import type { ShaderModule } from '@luma.gl/shadertools';

type PulseUniforms = { time: number; amount: number };

// A shader module: a GLSL uniform block plus the JS types that fill it.
const pulseUniforms = {
  name: 'pulse',
  vs: `\
layout(std140) uniform pulseUniforms {
  float time;
  float amount;
} pulse;
`,
  uniformTypes: { time: 'f32', amount: 'f32' },
} as const satisfies ShaderModule<PulseUniforms>;

export type PulsingProps<DataT> = {
  /** Phase offset in radians, one per object: becomes the instancePhase attribute. */
  getPhase: Accessor<DataT, number>;
  pulseTime: number;
  pulseAmount: number;
};

export class PulsingScatterplotLayer<DataT = unknown> extends ScatterplotLayer<DataT, PulsingProps<DataT>> {
  static override layerName = 'PulsingScatterplotLayer';
  static override defaultProps = {
    getPhase: { type: 'accessor', value: 0 },
    pulseTime: { type: 'number', value: 0 },
    pulseAmount: { type: 'number', value: 0.4, min: 0, max: 1 },
  } as DefaultProps<ScatterplotLayerProps & PulsingProps<unknown>>;

  override getShaders() {
    // Pass the parent's shaders on unmodified and only add to them.
    const shaders = super.getShaders();
    return {
      ...shaders,
      modules: [...shaders.modules, pulseUniforms],
      inject: {
        ...shaders.inject,
        'vs:#decl': 'in float instancePhase;',
        // Called before projection with the vertex's offset from the instance position.
        'vs:DECKGL_FILTER_SIZE': 'size.xy *= 1.0 + pulse.amount * sin(pulse.time * 3.0 + instancePhase);',
      },
    };
  }

  override initializeState(): void {
    super.initializeState();
    // One float per instance, filled from the getPhase accessor.
    this.getAttributeManager()?.addInstanced({
      instancePhase: { size: 1, accessor: 'getPhase', defaultValue: 0 },
    });
  }

  override draw(params: Parameters<ScatterplotLayer['draw']>[0]): void {
    const { pulseTime, pulseAmount } = this.props;
    this.setShaderModuleProps({ pulse: { time: pulseTime, amount: pulseAmount } satisfies PulseUniforms });
    super.draw(params);
  }
}
