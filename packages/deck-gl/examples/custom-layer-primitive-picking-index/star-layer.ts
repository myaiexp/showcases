// StarLayer: a primitive layer whose picking index is the row's group, not its own row
import { Layer, picking, project32 } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, GetPickingInfoParams, LayerDataSource, PickingInfo, Position, UpdateParameters } from '@deck.gl/core';
import { Geometry, Model } from '@luma.gl/engine';
import type { ShaderModule } from '@luma.gl/shadertools';

type StarUniforms = { radiusPixels: number };
const starUniforms = {
  name: 'star',
  vs: `\
layout(std140) uniform starUniforms {
  float radiusPixels;
} star;
`,
  uniformTypes: { radiusPixels: 'f32' },
} as const satisfies ShaderModule<StarUniforms>;

const vs = `\
#version 300 es
#define SHADER_NAME star-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceColors;
in float rowIndexes;
out vec4 vColor;
out vec2 vUv;
void main(void) {
  geometry.worldPosition = instancePositions;
  geometry.uv = positions.xy;
  vUv = positions.xy;
  // Not the instance id: the logical object this instance belongs to.
  geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
  vec3 offset = vec3(positions.xy * project_pixel_size(star.radiusPixels), 0.0);
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
  vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

const fs = `\
#version 300 es
#define SHADER_NAME star-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vUv;
out vec4 fragColor;
void main(void) {
  geometry.uv = vUv;
  // A four-pointed star: |x|^0.5 + |y|^0.5 < 1.
  if (sqrt(abs(vUv.x)) + sqrt(abs(vUv.y)) > 1.0) discard;
  fragColor = vColor;
  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;

export type StarLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  getColor?: Accessor<DataT, Color>;
  /** The group (constellation) index of each star: what picking reports. */
  getGroup?: Accessor<DataT, number>;
  /** The objects the group indexes refer to. */
  groups?: unknown[];
  radiusPixels?: number;
};

export type StarPickingInfo = PickingInfo & { groupIndex?: number; decoded?: number };

export class StarLayer<DataT = unknown> extends Layer<Required<StarLayerProps<DataT>>> {
  static override layerName = 'StarLayer';
  static override defaultProps: DefaultProps<StarLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getColor: { type: 'accessor', value: [255, 255, 255, 255] },
    getGroup: { type: 'accessor', value: 0 },
    groups: { type: 'array', value: [], compare: true },
    radiusPixels: { type: 'number', value: 8, min: 1 },
  };

  declare state: { model?: Model };

  override getShaders() {
    return super.getShaders({ vs, fs, modules: [project32, picking, starUniforms] });
  }

  override initializeState(): void {
    this.getAttributeManager()?.addInstanced({
      instancePositions: { size: 3, type: 'float64', fp64: this.use64bitPositions(), accessor: 'getPosition' },
      instanceColors: { size: 4, type: 'unorm8', accessor: 'getColor', defaultValue: [255, 255, 255, 255] },
      // The attribute name rowIndexes also tells deck.gl how to find rows when picking deeply.
      rowIndexes: { size: 1, type: 'uint32', accessor: 'getGroup' },
    });
    this.setState({
      model: new Model(this.context.device, {
        ...this.getShaders(),
        id: this.props.id,
        bufferLayout: this.getAttributeManager()?.getBufferLayouts() ?? [],
        geometry: new Geometry({
          topology: 'triangle-strip',
          attributes: { positions: { size: 3, value: new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]) } },
        }),
        isInstanced: true,
      }),
    });
  }

  override updateState(params: UpdateParameters<this>): void {
    super.updateState(params);
    this.state.model?.shaderInputs.setProps({ star: { radiusPixels: params.props.radiusPixels } satisfies StarUniforms });
  }

  override finalizeState(context: Parameters<Layer['finalizeState']>[0]): void {
    super.finalizeState(context);
    this.state.model?.destroy();
  }

  // info.index is now a group index (decoded from the picking colour), so info.object has to
  // come from `groups`: the default implementation would look it up in `data`.
  override getPickingInfo({ info }: GetPickingInfoParams): StarPickingInfo {
    const out: StarPickingInfo = info;
    if (info.index >= 0) {
      out.object = this.props.groups[info.index];
      out.groupIndex = info.index;
      out.decoded = info.color ? this.decodePickingColor(info.color) : undefined;
    }
    return out;
  }
}
