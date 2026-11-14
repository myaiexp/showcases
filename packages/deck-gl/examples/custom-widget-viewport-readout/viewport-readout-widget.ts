// ViewportReadoutWidget: onViewportChange and updateHTML, rendering only on change
import { Widget } from '@deck.gl/core';
import type { Viewport, WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type ViewportReadoutWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  /** Decimal places for longitude and latitude. */
  precision?: number;
};

export class ViewportReadoutWidget extends Widget<ViewportReadoutWidgetProps> {
  static override defaultProps: Required<ViewportReadoutWidgetProps> = {
    ...Widget.defaultProps,
    id: 'viewport-readout',
    placement: 'top-left',
    viewId: null,
    precision: 2,
  };

  className = 'deck-widget-viewport-readout';
  placement: WidgetPlacement = 'top-left';
  private text = 'waiting for a viewport';
  renders = 0;

  constructor(props: ViewportReadoutWidgetProps = {}) {
    super(props);
    this.setProps(this.props);
  }

  override setProps(props: Partial<ViewportReadoutWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  // Called with the viewport of the widget's view on every redraw.
  override onViewportChange(viewport: Viewport): void {
    const { precision } = this.props;
    // The centre of the view, unprojected from its pixel position.
    const [lng = 0, lat = 0] = viewport.unproject([viewport.width / 2, viewport.height / 2]);
    const text = [
      `lng ${lng.toFixed(precision)}  lat ${lat.toFixed(precision)}`,
      `zoom ${viewport.zoom.toFixed(2)}  ${viewport.width}x${viewport.height}px`,
    ].join('\n');
    // Redraws are frequent: only touch the DOM when the visible text changes.
    if (text !== this.text) {
      this.text = text;
      this.updateHTML();
    }
  }

  onRenderHTML(rootElement: HTMLElement): void {
    this.renders++;
    rootElement.textContent = this.text;
  }
}
