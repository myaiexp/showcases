// PingRingLayer: turns each object into many sublayer rows, keeping its accessors
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerData, LayerDataSource, Position, UpdateParameters } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';

/** One ring: how long ago the ping was (0..1). The user's object is attached by getSubLayerRow. */
export interface Ring {
  age: number;
}

export type PingRingLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  /** Ping ages for this object, 0 (now) to 1 (oldest). One ring per entry. */
  getPings?: Accessor<DataT, number[]>;
  getRingColor?: Accessor<DataT, Color>;
  maxRadius?: number;
};

export class PingRingLayer<DataT = unknown> extends CompositeLayer<Required<PingRingLayerProps<DataT>>> {
  static override layerName = 'PingRingLayer';
  static override defaultProps: DefaultProps<PingRingLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getPings: { type: 'accessor', value: [0] },
    getRingColor: { type: 'accessor', value: [255, 255, 255] },
    maxRadius: { type: 'number', value: 500_000, min: 0 },
  };

  declare state: { rows: Ring[] };

  override updateState({ props, changeFlags }: UpdateParameters<this>): void {
    if (!changeFlags.dataChanged && !changeFlags.updateTriggersChanged) return;
    const rows: Ring[] = [];
    let index = 0;
    for (const object of props.data as Iterable<DataT>) {
      const pings = typeof props.getPings === 'function' ? props.getPings(object, { index, data: props.data as LayerData<DataT>, target: [] }) : props.getPings;
      for (const age of pings) {
        // getSubLayerRow decorates the row with a reference to the original object and index.
        rows.push(this.getSubLayerRow({ age }, object, index));
      }
      index++;
    }
    this.setState({ rows });
  }

  renderLayers() {
    const { getPosition, getRingColor, maxRadius } = this.props;
    return new ScatterplotLayer<Ring>(
      this.getSubLayerProps({
        id: 'rings',
        data: this.state.rows,
        // getSubLayerAccessor lets the app's accessors keep receiving the objects it supplied.
        getPosition: this.getSubLayerAccessor(getPosition) as Accessor<Ring, Position>,
        getFillColor: this.getSubLayerAccessor(getRingColor) as Accessor<Ring, Color>,
        // This accessor is ours, so it reads the row.
        getRadius: (row: Ring) => 40_000 + row.age * maxRadius,
        getLineColor: [255, 255, 255, 40],
        stroked: true,
        lineWidthMinPixels: 1,
        radiusMinPixels: 2,
        updateTriggers: { getRadius: maxRadius },
      }),
    );
  }
}
