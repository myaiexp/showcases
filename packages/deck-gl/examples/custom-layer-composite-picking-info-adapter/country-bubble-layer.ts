// CountryBubbleLayer: an adapter composite that groups rows, and rewrites picking info to match
import { CompositeLayer } from '@deck.gl/core';
import type {
  Accessor,
  DefaultProps,
  GetPickingInfoParams,
  LayerData,
  LayerDataSource,
  PickingInfo,
  Position,
  UpdateParameters,
} from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';

export interface Group<DataT> {
  key: string;
  rows: DataT[];
  position: [number, number];
}

export type CountryBubbleLayerProps<DataT = unknown> = {
  data: LayerDataSource<DataT>;
  getPosition?: Accessor<DataT, Position>;
  /** Rows with the same key share one bubble. */
  getGroup?: (d: DataT) => string;
};

export class CountryBubbleLayer<DataT = unknown> extends CompositeLayer<Required<CountryBubbleLayerProps<DataT>>> {
  static override layerName = 'CountryBubbleLayer';
  static override defaultProps: DefaultProps<CountryBubbleLayerProps> = {
    getPosition: { type: 'accessor', value: (d: unknown) => (d as { position: Position }).position },
    getGroup: { type: 'function', value: () => 'all' },
  };

  declare state: { groups: Group<DataT>[] };

  override updateState({ props, changeFlags }: UpdateParameters<this>): void {
    if (!changeFlags.dataChanged) return;
    const byKey = new Map<string, Group<DataT>>();
    let index = 0;
    for (const row of props.data as Iterable<DataT>) {
      const key = props.getGroup(row);
      const at = props.getPosition;
      const [x = 0, y = 0] = typeof at === 'function' ? at(row, { index: index++, data: props.data as LayerData<DataT>, target: [] }) : at;
      const g = byKey.get(key) ?? { key, rows: [], position: [0, 0] };
      g.position = [g.position[0] + x, g.position[1] + y];
      g.rows.push(row);
      byKey.set(key, g);
    }
    const groups = [...byKey.values()];
    for (const g of groups) g.position = [g.position[0] / g.rows.length, g.position[1] / g.rows.length];
    this.setState({ groups });
  }

  renderLayers() {
    return new ScatterplotLayer<Group<DataT>>(
      this.getSubLayerProps({
        id: 'groups',
        data: this.state.groups,
        getPosition: (g: Group<DataT>) => g.position,
        getRadius: (g: Group<DataT>) => 150_000 + g.rows.length * 160_000,
        getFillColor: [90, 200, 170, 150],
        getLineColor: [200, 255, 240],
        stroked: true,
        lineWidthMinPixels: 1,
        radiusMinPixels: 6,
      }),
    );
  }

  // The sublayer's info.object is a Group; the user asked for rows, so hand them the rows.
  override getPickingInfo({ info, sourceLayer }: GetPickingInfoParams): PickingInfo {
    const group = info.object as Group<DataT> | undefined;
    if (!group) return info;
    return Object.assign(info, { object: group.rows, groupKey: group.key, viaSublayer: sourceLayer?.id });
  }
}
