// GaugeDotLayer: defaultProps with explicit prop types, and an updateState counter
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerDataSource, Position, UpdateParameters } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';

export type GaugeDotLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  getValue?: Accessor<DataT, number>;
  ringWidth?: number;
  ringColor?: Color;
  formatLabel?: (value: number) => string;
  style?: { glow: boolean };
  showLabels?: boolean;
};

/** Counts the layer's real updates, whatever the app re-creates in between. */
export const stats = { updates: 0 };

export class GaugeDotLayer<DataT = unknown> extends CompositeLayer<Required<GaugeDotLayerProps<DataT>>> {
  static override layerName = 'GaugeDotLayer';
  static override defaultProps: DefaultProps<GaugeDotLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getValue: { type: 'accessor', value: 0 },
    // number: finite and inside [min, max] (checked in debug mode); compared with ===
    ringWidth: { type: 'number', value: 4, min: 1, max: 12 },
    // color: an array of 3 or 4 numbers; compared deeply, so a new array with equal numbers is no change
    ringColor: { type: 'color', value: [255, 204, 0] },
    // function: ignored by the comparison unless `ignore: false`
    formatLabel: { type: 'function', value: (v: number) => v.toFixed(0) },
    // object: shallow compare by default, `compare: true` compares one level deep
    style: { type: 'object', value: { glow: true }, compare: true },
    // boolean: compared by truthiness
    showLabels: { type: 'boolean', value: true },
  };

  override updateState(params: UpdateParameters<this>): void {
    super.updateState(params);
    stats.updates++;
  }

  renderLayers() {
    const { data, getPosition, getValue, ringWidth, ringColor, formatLabel, style, showLabels } = this.props;
    return [
      new ScatterplotLayer<DataT>(
        this.getSubLayerProps({
          id: 'rings',
          data,
          getPosition,
          getRadius: (d: DataT, ctx: { index: number; data: unknown; target: number[] }) => (typeof getValue === 'function' ? getValue(d, ctx as never) : getValue) * 25_000,
          stroked: true,
          filled: style.glow,
          getFillColor: [ringColor[0] ?? 0, ringColor[1] ?? 0, ringColor[2] ?? 0, 60],
          getLineColor: ringColor,
          getLineWidth: ringWidth,
          lineWidthUnits: 'pixels',
          radiusMinPixels: 4,
          updateTriggers: { getRadius: this.props.updateTriggers.getValue },
        }),
      ),
      showLabels &&
        new TextLayer<DataT>(
          this.getSubLayerProps({
            id: 'labels',
            data,
            getPosition,
            getText: (d: DataT, ctx: { index: number; data: unknown; target: number[] }) => formatLabel(typeof getValue === 'function' ? getValue(d, ctx as never) : getValue),
            getSize: 12,
            getColor: [235, 240, 250],
            updateTriggers: { getText: this.props.updateTriggers.getValue },
          }),
        ),
    ];
  }
}
