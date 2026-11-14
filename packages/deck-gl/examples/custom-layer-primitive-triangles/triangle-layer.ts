// TriangleLayer: a layer from scratch: instanced luma.gl Model, own GLSL, project32 and picking
import { Layer, UNIT, picking, project32 } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerDataSource, Position, Unit, UpdateParameters } from '@deck.gl/core';
import { Geometry, Model } from '@luma.gl/engine';
import type { ShaderModule } from '@luma.gl/shadertools';

type TriangleUniforms = { sizeScale: number; sizeUnits: number; minPixels: number };

const triangleUniforms = {
  name: 'triangle',
  vs: `\
layout(std140) uniform triangleUniforms {
  float sizeScale;
  highp int sizeUnits;
  float minPixels;
} triangle;
`,
  uniformTypes: { sizeScale: 'f32', sizeUnits: 'i32', minPixels: 'f32' },
} as const satisfies ShaderModule<TriangleUniforms>;

const vs = `\
#version 300 es
#define SHADER_NAME triangle-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceAngles;
in float instanceSizes;
in vec4 instanceColors;
out vec4 vColor;
out vec2 vUv;
void main(void) {
  geometry.worldPosition = instancePositions;
  geometry.uv = positions.xy;
  vUv = positions.xy;
  geometry.pickingColor = picking_getPickingColorFromInstanceID();

  float c = cos(instanceAngles);
  float s = sin(instanceAngles);
  vec2 rotated = vec2(positions.x * c - positions.y * s, positions.x * s + positions.y * c);
  float sizePixels = max(project_size_to_pixel(instanceSizes * triangle.sizeScale, triangle.sizeUnits), triangle.minPixels);
  // An offset from the instance position, in common space.
  vec3 offset = vec3(rotated * project_pixel_size(sizePixels), 0.0);
  DECKGL_FILTER_SIZE(offset, geometry);

  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
  DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

const fs = `\
#version 300 es
#define SHADER_NAME triangle-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vUv;
out vec4 fragColor;
void main(void) {
  geometry.uv = vUv;
  fragColor = vColor;
  // Brighten towards the tip so the heading reads.
  fragColor.rgb *= 0.7 + 0.3 * smoothstep(-1.0, 1.0, vUv.y);
  DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;

export type TriangleLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  /** Heading in degrees, clockwise from north. */
  getAngle?: Accessor<DataT, number>;
  getSize?: Accessor<DataT, number>;
  getColor?: Accessor<DataT, Color>;
  sizeScale?: number;
  sizeUnits?: Unit;
  sizeMinPixels?: number;
};

export class TriangleLayer<DataT = unknown> extends Layer<Required<TriangleLayerProps<DataT>>> {
  static override layerName = 'TriangleLayer';
  static override defaultProps: DefaultProps<TriangleLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getAngle: { type: 'accessor', value: 0 },
    getSize: { type: 'accessor', value: 1 },
    getColor: { type: 'accessor', value: [255, 255, 255, 255] },
    sizeScale: { type: 'number', value: 1, min: 0 },
    sizeUnits: 'pixels',
    sizeMinPixels: { type: 'number', value: 0, min: 0 },
  };

  declare state: { model?: Model };

  override getShaders() {
    return super.getShaders({ vs, fs, modules: [project32, picking, triangleUniforms] });
  }

  override initializeState(): void {
    // Each accessor feeds one instanced attribute; the AttributeManager fills and uploads them.
    this.getAttributeManager()?.addInstanced({
      instancePositions: { size: 3, type: 'float64', fp64: this.use64bitPositions(), accessor: 'getPosition' },
      instanceAngles: { size: 1, accessor: 'getAngle', transform: (deg: number) => (deg * Math.PI) / 180 },
      instanceSizes: { size: 1, accessor: 'getSize', defaultValue: 1 },
      instanceColors: { size: 4, type: 'unorm8', accessor: 'getColor', defaultValue: [255, 255, 255, 255] },
    });
    this.setState({ model: this.createModel() });
  }

  override updateState(params: UpdateParameters<this>): void {
    super.updateState(params);
    // Extensions can change the shaders: rebuild the model and refill its buffers.
    if (params.changeFlags.extensionsChanged) {
      this.state.model?.destroy();
      this.setState({ model: this.createModel() });
      this.getAttributeManager()?.invalidateAll();
    }
  }

  override draw(): void {
    const { sizeScale, sizeUnits, sizeMinPixels } = this.props;
    const model = this.state.model;
    if (!model) return;
    model.shaderInputs.setProps({
      triangle: { sizeScale, sizeUnits: UNIT[sizeUnits], minPixels: sizeMinPixels } satisfies TriangleUniforms,
    });
    model.draw(this.context.renderPass);
  }

  override finalizeState(context: Parameters<Layer['finalizeState']>[0]): void {
    super.finalizeState(context);
    this.state.model?.destroy();
  }

  private createModel(): Model {
    return new Model(this.context.device, {
      ...this.getShaders(),
      id: this.props.id,
      bufferLayout: this.getAttributeManager()?.getBufferLayouts() ?? [],
      // One triangle, pointing along +y, instanced once per data row.
      geometry: new Geometry({
        topology: 'triangle-list',
        attributes: { positions: { size: 3, value: new Float32Array([0, 1, 0, -0.75, -1, 0, 0.75, -1, 0]) } },
      }),
      isInstanced: true,
    });
  }
}
