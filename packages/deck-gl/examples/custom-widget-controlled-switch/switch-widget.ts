// SwitchWidget: a toggle that works uncontrolled (initialOn) or controlled (the `on` prop)
import { Widget } from '@deck.gl/core';
import type { WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type SwitchWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  label?: string;
  /** Initial value for uncontrolled usage. */
  initialOn?: boolean;
  /** Controlled value. When provided, the widget reflects this prop and keeps no state of its own. */
  on?: boolean;
  /** Called when the user toggles the switch. */
  onChange?: (on: boolean) => void;
};

export class SwitchWidget extends Widget<SwitchWidgetProps> {
  static override defaultProps: Required<SwitchWidgetProps> = {
    ...Widget.defaultProps,
    id: 'switch',
    placement: 'top-left',
    viewId: null,
    label: 'switch',
    initialOn: false,
    on: undefined!, // no meaningful default: undefined means "uncontrolled"
    onChange: () => {},
  };

  className = 'deck-widget-switch';
  placement: WidgetPlacement = 'top-left';
  private on: boolean;

  constructor(props: SwitchWidgetProps = {}) {
    super(props);
    this.on = this.props.initialOn;
    this.setProps(this.props);
  }

  override setProps(props: Partial<SwitchWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  /** The current value in both modes. */
  getOn(): boolean {
    return this.props.on ?? this.on;
  }

  onRenderHTML(rootElement: HTMLElement): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.pointerEvents = 'auto';
    button.setAttribute('aria-pressed', String(this.getOn()));
    button.textContent = `${this.props.label}: ${this.getOn() ? 'on' : 'off'}`;
    button.onclick = () => this.handleClick();
    rootElement.replaceChildren(button);
  }

  handleClick(): void {
    const next = !this.getOn();
    // Always tell the application.
    this.props.onChange(next);
    // Only keep state when uncontrolled. A controlled app answers by passing a new `on` prop.
    if (this.props.on === undefined) {
      this.on = next;
      this.updateHTML();
    }
  }
}
