// TintScatterplotLayer: an attribute filled by an update function, invalidated by hand
import type { Accessor, Attribute, DefaultProps, UpdateParameters } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { ScatterplotLayerProps } from '@deck.gl/layers';

export type TintProps<DataT = unknown> = {
  /** Degrees added to every dot's hue. */
  tintHue: number;
  /** Recompute only these data rows [start, end) when tintHue changes; null for all of them. */
  tintRows: [number, number] | null;
  /** Called from the update function with the range it was asked to fill. */
  onTintUpdate: (startRow: number, endRow: number) => void;
  /** The colour a row starts from, before the hue shift. */
  getBaseHue: Accessor<DataT, number>;
};

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

export class TintScatterplotLayer<DataT = unknown> extends ScatterplotLayer<DataT, TintProps<DataT>> {
  static override layerName = 'TintScatterplotLayer';
  static override defaultProps = {
    tintHue: { type: 'number', value: 0 },
    tintRows: { type: 'array', value: null, optional: true, compare: true },
    onTintUpdate: { type: 'function', value: () => {} },
    getBaseHue: { type: 'accessor', value: 0 },
  } as DefaultProps<ScatterplotLayerProps & TintProps<unknown>>;

  override getShaders() {
    const shaders = super.getShaders();
    return {
      ...shaders,
      inject: {
        ...shaders.inject,
        'vs:#decl': 'in vec4 instanceTint;',
        'vs:DECKGL_FILTER_COLOR': 'color.rgb = mix(color.rgb, instanceTint.rgb, 0.9);',
      },
    };
  }

  override initializeState(): void {
    super.initializeState();
    this.getAttributeManager()?.addInstanced({
      // No accessor: the attribute is filled by `update`, which runs when it is invalidated.
      instanceTint: { size: 4, type: 'unorm8', update: this.calculateTint, defaultValue: [255, 255, 255, 255] },
    });
  }

  // `this` is the layer inside an update function. `startRow` and `endRow` bound the rows to fill,
  // so a partial invalidate does not rewrite the whole buffer.
  calculateTint = (attribute: Attribute, { startRow, endRow }: { startRow: number; endRow: number }): void => {
    const { data, tintHue, getBaseHue, onTintUpdate } = this.props;
    const rows = data as DataT[];
    const value = attribute.value as Uint8ClampedArray;
    // A full invalidate asks for [0, Infinity): clamp to the rows that exist.
    const end = Math.min(endRow, rows.length);
    for (let i = startRow; i < end; i++) {
      const base = typeof getBaseHue === 'function' ? getBaseHue(rows[i]!, { index: i, data: rows, target: [] }) : getBaseHue;
      const [r, g, b] = hslToRgb((base + tintHue + 360) % 360, 0.85, 0.6);
      value.set([r, g, b, 255], i * 4);
    }
    onTintUpdate(startRow, end);
  };

  override updateState(params: UpdateParameters<this>): void {
    super.updateState(params);
    const { props, oldProps } = params;
    if (props.tintHue !== oldProps.tintHue) {
      const rows = props.tintRows;
      this.getAttributeManager()?.invalidate('instanceTint', rows ? { startRow: rows[0], endRow: rows[1] } : undefined);
    }
  }
}
