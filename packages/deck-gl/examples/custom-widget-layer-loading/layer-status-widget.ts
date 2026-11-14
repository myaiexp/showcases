// LayerStatusWidget: onRedraw lists the top-level layers and whether their data has loaded
import { Widget } from '@deck.gl/core';
import type { Layer, WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type LayerStatusWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  /** Called when the overall loading state changes. */
  onLoadingChange?: (loading: boolean) => void;
};

export class LayerStatusWidget extends Widget<LayerStatusWidgetProps> {
  static override defaultProps: Required<LayerStatusWidgetProps> = {
    ...Widget.defaultProps,
    id: 'layer-status',
    placement: 'top-left',
    viewId: null,
    onLoadingChange: () => {},
  };

  className = 'deck-widget-layer-status';
  placement: WidgetPlacement = 'top-left';
  private layers: Layer[] = [];
  private loading = false;

  constructor(props: LayerStatusWidgetProps = {}) {
    super(props);
    this.setProps(this.props);
  }

  override setProps(props: Partial<LayerStatusWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  // `layers` includes the sublayers composite layers generate; keep the ones the app supplied.
  override onRedraw({ layers }: { layers: Layer[] }): void {
    const top = layers.filter((layer) => !layer.parent);
    const loading = top.some((layer) => !layer.isLoaded);
    const layersChanged = top.length !== this.layers.length || top.some((layer, i) => layer !== this.layers[i]);
    const loadingChanged = loading !== this.loading;
    if (loadingChanged) {
      this.loading = loading;
      this.props.onLoadingChange(loading);
    }
    // onRedraw can run every frame: re-render only when something visible changed.
    if (loadingChanged || layersChanged || this.statusKey(top) !== this.statusKey(this.layers)) {
      this.layers = top;
      this.updateHTML();
    }
  }

  private statusKey(layers: Layer[]): string {
    return layers.map((l) => `${l.id}:${l.isLoaded}`).join('|');
  }

  onRenderHTML(rootElement: HTMLElement): void {
    const status = document.createElement('div');
    status.className = 'status';
    status.textContent = this.loading ? 'Loading layers...' : 'All layers loaded';
    const list = document.createElement('ul');
    for (const layer of this.layers) {
      const item = document.createElement('li');
      item.textContent = `${layer.id}: ${layer.isLoaded ? 'loaded' : 'loading'}`;
      list.append(item);
    }
    rootElement.replaceChildren(status, list);
  }
}
