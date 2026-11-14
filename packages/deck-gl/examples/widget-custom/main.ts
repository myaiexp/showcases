// A custom Widget subclass: a live view readout using onViewportChange, onClick and updateHTML
import { Deck, Widget, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState, PickingInfo, Viewport, WidgetPlacement, WidgetProps } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

type ViewReadoutProps = WidgetProps & {
  placement?: WidgetPlacement;
  /** Decimal places for the coordinates. */
  precision?: number;
};

class ViewReadoutWidget extends Widget<ViewReadoutProps> {
  static override defaultProps: Required<ViewReadoutProps> = {
    ...Widget.defaultProps,
    id: 'view-readout',
    placement: 'bottom-left',
    precision: 2,
  };

  className = 'view-readout';
  placement: WidgetPlacement = 'bottom-left';
  private viewport: Viewport | null = null;
  private lastClicked = 'nothing yet';

  constructor(props: ViewReadoutProps = {}) {
    super(props);
    this.placement = this.props.placement;
  }

  override setProps(props: Partial<ViewReadoutProps>): void {
    this.placement = props.placement ?? this.placement;
    super.setProps(props);
  }

  // Deck calls this whenever the viewport this widget watches changes.
  override onViewportChange(viewport: Viewport): void {
    this.viewport = viewport;
    this.updateHTML();
  }

  override onClick(info: PickingInfo): void {
    const city = info.object as City | undefined;
    if (city) {
      this.lastClicked = city.name;
      this.updateHTML();
    }
  }

  onRenderHTML(el: HTMLElement): void {
    const v = this.viewport;
    const p = this.props.precision;
    const pos = v instanceof WebMercatorViewport ? `${v.longitude.toFixed(p)}, ${v.latitude.toFixed(p)}` : 'n/a';
    el.style.cssText = 'padding:6px 10px;border-radius:8px;font:12px/1.4 monospace;background:var(--menu-background,#fff);color:var(--menu-text,#222);box-shadow:var(--menu-shadow,none);pointer-events:none';
    el.textContent = `lng, lat ${pos} | zoom ${v?.zoom.toFixed(1) ?? '-'} | last click: ${this.lastClicked}`;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        pickable: true,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 4,
      }),
    ],
    widgets: [new ViewReadoutWidget({ precision: 1 })],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t, 5) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
