// ZoomSwitchLayer: renders two sublayers once and shows one with filterSubLayer
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, DefaultProps, FilterContext, LayerDataSource, Position } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';

export type ZoomSwitchLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  getText?: Accessor<DataT, string>;
  /** Below this zoom only the overview sublayer is drawn. */
  switchZoom?: number;
  /** Called every time renderLayers runs (to show it does not run on zoom). */
  onRenderLayers?: () => void;
};

export class ZoomSwitchLayer<DataT = unknown> extends CompositeLayer<Required<ZoomSwitchLayerProps<DataT>>> {
  static override layerName = 'ZoomSwitchLayer';
  static override defaultProps: DefaultProps<ZoomSwitchLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getText: { type: 'accessor', value: (d: unknown) => String((d as { text: string }).text) },
    switchZoom: { type: 'number', value: 3 },
    onRenderLayers: { type: 'function', value: () => {} },
  };

  renderLayers() {
    const { data, getPosition, getText, onRenderLayers } = this.props;
    onRenderLayers();
    return [
      new ScatterplotLayer<DataT>(
        this.getSubLayerProps({
          id: 'overview',
          data,
          getPosition,
          getRadius: 600_000,
          getFillColor: [255, 140, 60, 70],
          radiusMinPixels: 10,
        }),
      ),
      new ScatterplotLayer<DataT>(
        this.getSubLayerProps({
          id: 'detail-dots',
          data,
          getPosition,
          getRadius: 30_000,
          getFillColor: [120, 220, 255],
          radiusMinPixels: 3,
        }),
      ),
      new TextLayer<DataT>(
        this.getSubLayerProps({
          id: 'detail-labels',
          data,
          getPosition,
          getText,
          getSize: 12,
          getColor: [235, 240, 250],
          getTextAnchor: 'start',
          getPixelOffset: [8, 0],
        }),
      ),
    ];
  }

  // Evaluated before every redraw, so a zoom gesture switches sublayers without re-running
  // renderLayers or re-creating a single layer.
  override filterSubLayer({ layer, viewport }: FilterContext): boolean {
    const near = viewport.zoom >= this.props.switchZoom;
    return near ? layer.id.includes('-detail-') : layer.id.endsWith('-overview');
  }
}
