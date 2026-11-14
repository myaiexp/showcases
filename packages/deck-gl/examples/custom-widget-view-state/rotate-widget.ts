// RotateWidget: buttons that read and write the view state of the attached views
import { FlyToInterpolator, Widget } from '@deck.gl/core';
import type { WidgetPlacement, WidgetProps } from '@deck.gl/core';

export type RotateWidgetProps = WidgetProps & {
  placement?: WidgetPlacement;
  viewId?: string | null;
  /** Degrees per click. */
  step?: number;
  /** Transition time of each click in milliseconds. */
  transitionDuration?: number;
};

export class RotateWidget extends Widget<RotateWidgetProps> {
  static override defaultProps: Required<RotateWidgetProps> = {
    ...Widget.defaultProps,
    id: 'rotate',
    placement: 'top-right',
    viewId: null,
    step: 45,
    transitionDuration: 400,
  };

  className = 'deck-widget-rotate';
  placement: WidgetPlacement = 'top-right';

  constructor(props: RotateWidgetProps = {}) {
    super(props);
    this.setProps(this.props);
  }

  override setProps(props: Partial<RotateWidgetProps>): void {
    this.placement = props.placement ?? this.placement;
    this.viewId = props.viewId ?? this.viewId;
    super.setProps(props);
  }

  /** Changes bearing and pitch of every view this widget applies to. */
  adjust(bearingDelta: number, pitchDelta: number): void {
    const { transitionDuration } = this.props;
    for (const viewId of this.viewIds) {
      const viewState = this.getViewState(viewId);
      const bearing = Number(viewState.bearing ?? 0) + bearingDelta;
      const pitch = Math.max(0, Math.min(60, Number(viewState.pitch ?? 0) + pitchDelta));
      // Goes through the same path as a user interaction, so it works with initialViewState too.
      this.setViewState(viewId, {
        ...viewState,
        bearing,
        pitch,
        transitionDuration,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }

  onRenderHTML(rootElement: HTMLElement): void {
    const { step } = this.props;
    const make = (label: string, title: string, onClick: () => void): HTMLButtonElement => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.title = title;
      // Widget containers ignore the pointer; interactive elements opt back in.
      b.style.pointerEvents = 'auto';
      b.addEventListener('click', onClick);
      return b;
    };
    rootElement.replaceChildren(
      make('↺', `rotate ${step} degrees left`, () => this.adjust(-step, 0)),
      make('↻', `rotate ${step} degrees right`, () => this.adjust(step, 0)),
      make('▲', 'tilt up', () => this.adjust(0, 15)),
      make('▼', 'tilt down', () => this.adjust(0, -15)),
    );
  }
}
