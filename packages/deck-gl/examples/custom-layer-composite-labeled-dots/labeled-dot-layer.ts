// LabeledDotLayer: a CompositeLayer that renders a ScatterplotLayer and a TextLayer
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, LayerDataSource, Position } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';

export type LabeledDotLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  // Shared accessor
  getPosition?: Accessor<DataT, Position>;
  // Dot props and accessors
  dotRadiusScale?: number;
  getDotRadius?: Accessor<DataT, number>;
  getDotColor?: Accessor<DataT, Color>;
  // Label props and accessors
  showLabels?: boolean;
  getText?: Accessor<DataT, string>;
  getTextSize?: Accessor<DataT, number>;
  getTextColor?: Accessor<DataT, Color>;
};

export class LabeledDotLayer<DataT = unknown> extends CompositeLayer<Required<LabeledDotLayerProps<DataT>>> {
  static override layerName = 'LabeledDotLayer';
  static override defaultProps: DefaultProps<LabeledDotLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    dotRadiusScale: { type: 'number', value: 1, min: 0 },
    getDotRadius: { type: 'accessor', value: 10_000 },
    getDotColor: { type: 'accessor', value: [255, 140, 60] },
    showLabels: true,
    getText: { type: 'accessor', value: (d: unknown) => String((d as { text: string }).text) },
    getTextSize: { type: 'accessor', value: 12 },
    getTextColor: { type: 'accessor', value: [235, 240, 250] },
  };

  renderLayers() {
    const p = this.props;
    const triggers = p.updateTriggers;
    return [
      // getSubLayerProps prefixes the id ('<parent>-dots'), forwards pickable, opacity, visible,
      // coordinateSystem...  and merges the parent's updateTriggers into the sublayer's own.
      new ScatterplotLayer<DataT>(
        this.getSubLayerProps({
          id: 'dots',
          data: p.data,
          getPosition: p.getPosition,
          radiusScale: p.dotRadiusScale,
          radiusMinPixels: 3,
          getRadius: p.getDotRadius,
          getFillColor: p.getDotColor,
          // Our prop names differ from the sublayer's, so remap the triggers.
          updateTriggers: { getRadius: triggers.getDotRadius, getFillColor: triggers.getDotColor },
        }),
      ),
      p.showLabels &&
        new TextLayer<DataT>(
          this.getSubLayerProps({
            id: 'labels',
            data: p.data,
            getPosition: p.getPosition,
            getText: p.getText,
            getSize: p.getTextSize,
            getColor: p.getTextColor,
            getTextAnchor: 'start',
            getAlignmentBaseline: 'center',
            getPixelOffset: [9, 0],
            updateTriggers: { getText: triggers.getText, getSize: triggers.getTextSize, getColor: triggers.getTextColor },
          }),
        ),
    ];
  }
}
