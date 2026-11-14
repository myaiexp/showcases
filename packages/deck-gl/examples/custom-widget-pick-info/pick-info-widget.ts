// PickInfoWidget: onHover shows what is under the pointer, onClick pins it
import { Widget } from '@deck.gl/core';
import type { PickingInfo, WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type PickInfoWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  /** Turns a picked object into a line of text. */
  describe?: (object: unknown) => string;
};

export class PickInfoWidget extends Widget<PickInfoWidgetProps> {
  static override defaultProps: Required<PickInfoWidgetProps> = {
    ...Widget.defaultProps,
    id: 'pick-info',
    placement: 'bottom-left',
    viewId: null,
    describe: (object) => JSON.stringify(object),
  };

  className = 'deck-widget-pick-info';
  placement: WidgetPlacement = 'bottom-left';
  private hovered: string | null = null;
  private pinned: string | null = null;

  constructor(props: PickInfoWidgetProps = {}) {
    super(props);
    this.setProps(this.props);
  }

  override setProps(props: Partial<PickInfoWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  // Called for hover events in the widget's view (any view when viewId is null).
  override onHover(info: PickingInfo): void {
    this.showHover(info);
  }

  override onClick(info: PickingInfo): void {
    this.pinned = info.object ? this.props.describe(info.object) : null;
    this.updateHTML();
  }

  /** The hover logic, public so a card (which has no pointer) can feed it a picked info. */
  showHover(info: PickingInfo): void {
    const next = info.object ? this.props.describe(info.object) : null;
    if (next !== this.hovered) {
      this.hovered = next;
      this.updateHTML();
    }
  }

  onRenderHTML(rootElement: HTMLElement): void {
    const hover = document.createElement('div');
    hover.textContent = `hover: ${this.hovered ?? 'nothing'}`;
    const pin = document.createElement('div');
    pin.textContent = `pinned: ${this.pinned ?? 'click an object'}`;
    pin.style.opacity = this.pinned ? '1' : '0.6';
    rootElement.replaceChildren(hover, pin);
  }
}
