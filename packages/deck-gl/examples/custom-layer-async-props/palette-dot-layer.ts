// PaletteDotLayer: an async object prop (a Promise or URL) with transform, release
import { CompositeLayer } from '@deck.gl/core';
import type { Accessor, Color, DefaultProps, Layer, LayerDataSource, Position } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';

export type PaletteDotLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  /** 0..1 */
  getValue?: Accessor<DataT, number>;
  /** Hex strings, or a Promise of them. The layer reads `props.palette` once it resolved. */
  palette?: string[] | Promise<string[]> | null;
  onPaletteLoad?: (colors: number) => void;
  onPaletteRelease?: (colors: number) => void;
};

const hex = (s: string): Color => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];

export class PaletteDotLayer<DataT = unknown> extends CompositeLayer<Required<PaletteDotLayerProps<DataT>>> {
  static override layerName = 'PaletteDotLayer';
  // The documented transform and release options are missing from the ObjectPropType typings, hence the cast.
  static override defaultProps = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getValue: { type: 'accessor', value: 0.5 },
    palette: {
      type: 'object',
      value: null,
      async: true,
      // Called with each newly resolved value; whatever it returns becomes props.palette.
      transform: (value: unknown, _propType: unknown, layer: Layer): Color[] | null => {
        if (!value) return null; // the default (null) goes through transform too
        const colors = (value as string[]).map(hex);
        (layer.props as { onPaletteLoad?: (n: number) => void }).onPaletteLoad?.(colors.length);
        return colors;
      },
      // Called when a transformed value is replaced or the layer is removed.
      release: (value: unknown, _propType: unknown, layer: Layer): void => {
        if (!value) return;
        (layer.props as { onPaletteRelease?: (n: number) => void }).onPaletteRelease?.((value as Color[]).length);
      },
    },
    onPaletteLoad: { type: 'function', value: () => {} },
    onPaletteRelease: { type: 'function', value: () => {} },
  } as unknown as DefaultProps<PaletteDotLayerProps>;

  renderLayers() {
    const { data, getPosition, getValue } = this.props;
    // Until the Promise resolves, props.palette is the default: null.
    const palette = this.props.palette as unknown as Color[] | null;
    return new ScatterplotLayer<DataT>(
      this.getSubLayerProps({
        id: 'dots',
        data,
        getPosition,
        getRadius: 260_000,
        radiusMinPixels: 5,
        getFillColor: (d: DataT, ctx: { index: number; data: unknown; target: number[] }): Color => {
          if (!palette) return [110, 120, 135, 160];
          const v = typeof getValue === 'function' ? getValue(d, ctx as never) : getValue;
          return palette[Math.min(palette.length - 1, Math.floor(v * palette.length))]!;
        },
        updateTriggers: { getFillColor: palette },
      }),
    );
  }
}
