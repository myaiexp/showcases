// BarLayer: pixel-space bars with transitioned height and colour attributes
import { Layer, picking, project32 } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerDataSource, Position } from '@deck.gl/core';
import { Geometry, Model } from '@luma.gl/engine';
import type { ShaderModule } from '@luma.gl/shadertools';

type BarUniforms = { widthPixels: number; heightScale: number };
const barUniforms = {
  name: 'bar',
  vs: `\
layout(std140) uniform barUniforms {
  float widthPixels;
  float heightScale;
} bar;
`,
  uniformTypes: { widthPixels: 'f32', heightScale: 'f32' },
} as const satisfies ShaderModule<BarUniforms>;

const vs = `\
#version 300 es
#define SHADER_NAME bar-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceHeights;
in vec4 instanceColors;
out vec4 vColor;
out vec2 vUv;
void main(void) {
  geometry.worldPosition = instancePositions;
  geometry.uv = positions.xy;
  vUv = positions.xy;
  geometry.pickingColor = picking_getPickingColorFromInstanceID();
  // x in -0.5..0.5, y in 0..1: a column standing on the position, sized in screen pixels.
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
  vec2 pixels = vec2(positions.x * bar.widthPixels, positions.y * instanceHeights * bar.heightScale);
  gl_Position.xy += project_pixel_size_to_clipspace(pixels);
  vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

const fs = `\
#version 300 es
#define SHADER_NAME bar-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vUv;
out vec4 fragColor;
void main(void) {
  geometry.uv = vUv;
  fragColor = vec4(vColor.rgb * (0.65 + 0.35 * vUv.y), vColor.a);
  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;

export type BarLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  /** Bar height in pixels (times heightScale). */
  getHeight?: Accessor<DataT, number>;
  getColor?: Accessor<DataT, Color>;
  widthPixels?: number;
  heightScale?: number;
};

export class BarLayer<DataT = unknown> extends Layer<Required<BarLayerProps<DataT>>> {
  static override layerName = 'BarLayer';
  static override defaultProps: DefaultProps<BarLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getHeight: { type: 'accessor', value: 10 },
    getColor: { type: 'accessor', value: [255, 255, 255, 255] },
    widthPixels: { type: 'number', value: 10, min: 1 },
    heightScale: { type: 'number', value: 1, min: 0 },
  };

  declare state: { model?: Model };

  override getShaders() {
    return super.getShaders({ vs, fs, modules: [project32, picking, barUniforms] });
  }

  override initializeState(): void {
    this.getAttributeManager()?.addInstanced({
      instancePositions: { size: 3, type: 'float64', fp64: this.use64bitPositions(), accessor: 'getPosition' },
      // transition: true lets props.transitions interpolate this attribute when its data changes.
      instanceHeights: { size: 1, accessor: 'getHeight', transition: true, defaultValue: 10 },
      instanceColors: {
        size: 4,
        type: 'unorm8',
        accessor: 'getColor',
        transition: true,
        defaultValue: [255, 255, 255, 255],
      },
    });
    this.setState({
      model: new Model(this.context.device, {
        ...this.getShaders(),
        id: this.props.id,
        bufferLayout: this.getAttributeManager()?.getBufferLayouts() ?? [],
        geometry: new Geometry({
          topology: 'triangle-strip',
          attributes: { positions: { size: 3, value: new Float32Array([-0.5, 0, 0, 0.5, 0, 0, -0.5, 1, 0, 0.5, 1, 0]) } },
        }),
        isInstanced: true,
      }),
    });
  }

  override draw(): void {
    const { widthPixels, heightScale } = this.props;
    this.state.model?.shaderInputs.setProps({ bar: { widthPixels, heightScale } satisfies BarUniforms });
    this.state.model?.draw(this.context.renderPass);
  }

  override finalizeState(context: Parameters<Layer['finalizeState']>[0]): void {
    super.finalizeState(context);
    this.state.model?.destroy();
  }
}
