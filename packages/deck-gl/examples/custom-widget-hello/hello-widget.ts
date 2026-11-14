// HelloWidget: the smallest universal widget: props, placement, onRenderHTML
import { Widget } from '@deck.gl/core';
import type { WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type HelloWidgetProps = WidgetProps & {
  /** Widget positioning within the view. Default 'top-left'. */
  placement?: WidgetPlacement;
  /** View to attach to and interact with. Default `null`. */
  viewId?: string | null;
  /** Text to display. */
  text?: string;
};

export class HelloWidget extends Widget<HelloWidgetProps> {
  static override defaultProps: Required<HelloWidgetProps> = {
    ...Widget.defaultProps,
    id: 'hello',
    placement: 'top-left',
    viewId: null,
    text: 'Hello, deck.gl!',
  };

  className = 'deck-widget-hello';
  placement: WidgetPlacement = 'top-left';

  constructor(props: HelloWidgetProps = {}) {
    super(props);
    // Sync the placement and viewId members from the merged props.
    this.setProps(this.props);
  }

  override setProps(props: Partial<HelloWidgetProps>): void {
    // deck.gl reads the members (not the props) to decide where the widget goes.
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  onRenderHTML(rootElement: HTMLElement): void {
    rootElement.textContent = this.props.text;
  }
}
