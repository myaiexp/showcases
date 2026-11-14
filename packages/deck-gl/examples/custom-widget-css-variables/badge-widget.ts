// BadgeWidget: styled only through its class name and CSS variables, which apps can override
import { Widget } from '@deck.gl/core';
import type { WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type BadgeWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  text?: string;
};

export class BadgeWidget extends Widget<BadgeWidgetProps> {
  static override defaultProps: Required<BadgeWidgetProps> = {
    ...Widget.defaultProps,
    id: 'badge',
    placement: 'top-left',
    viewId: null,
    text: 'deck.gl widget',
  };

  // The base class adds `deck-widget`, this class name and props.className to the root element.
  className = 'deck-widget-badge';
  placement: WidgetPlacement = 'top-left';

  constructor(props: BadgeWidgetProps = {}) {
    super(props);
    this.setProps(this.props);
  }

  override setProps(props: Partial<BadgeWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  onRenderHTML(rootElement: HTMLElement): void {
    rootElement.textContent = this.props.text;
  }
}
