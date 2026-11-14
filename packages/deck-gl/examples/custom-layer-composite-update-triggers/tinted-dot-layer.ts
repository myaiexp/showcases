// TintedDotLayer: a composite whose getDotColor trigger is remapped to a sublayer
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerDataSource, Position } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';

export type TintedDotLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  getDotRadius?: Accessor<DataT, number>;
  getDotColor?: Accessor<DataT, Color>;
  /** Copy updateTriggers.getDotColor to the sublayer's getFillColor trigger. */
  remapTriggers?: boolean;
};

export class TintedDotLayer<DataT = unknown> extends CompositeLayer<Required<TintedDotLayerProps<DataT>>> {
  static override layerName = 'TintedDotLayer';
  static override defaultProps: DefaultProps<TintedDotLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getDotRadius: { type: 'accessor', value: 10_000 },
    getDotColor: { type: 'accessor', value: [255, 255, 255] },
    remapTriggers: true,
  };

  renderLayers() {
    const { data, getPosition, getDotRadius, getDotColor, remapTriggers, updateTriggers } = this.props;
    return new ScatterplotLayer<DataT>(
      this.getSubLayerProps({
        id: 'dots',
        data,
        getPosition,
        getRadius: getDotRadius,
        getFillColor: getDotColor,
        radiusMinPixels: 4,
        // Sublayer accessor names are not ours: `updateTriggers.getDotColor` means nothing to a
        // ScatterplotLayer unless it is copied to `getFillColor`.
        updateTriggers: remapTriggers
          ? { getRadius: updateTriggers.getDotRadius, getFillColor: updateTriggers.getDotColor }
          : {},
      }),
    );
  }
}
