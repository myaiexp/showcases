// GimbalWidget: nested rings that show an OrbitView's rotation; click resets it
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import type { OrbitViewState } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import { GimbalWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { axes, knot, type Axis, type KnotPoint } from '../../shared/views-scene.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  let viewState: OrbitViewState = { target: [0, 0, 0], zoom: ctx.preview ? 0 : 0.7, rotationX: -45, rotationOrbit: 30 };
  const log = ctx.preview ? null : readout(el, 'Drag to rotate the knot, then click the gimbal.');

  const deck: Deck<OrbitView> = new Deck<OrbitView>({
    device: stage.device,
    views: new OrbitView({ id: 'orbit', orbitAxis: 'Z' }),
    viewState,
    controller: !ctx.preview,
    onViewStateChange: ({ viewState: next }) => {
      viewState = next as OrbitViewState;
      deck.setProps({ viewState });
    },
    layers: [
      new PointCloudLayer<KnotPoint>({ id: 'knot', data: knot(ctx.preview ? 400 : 900), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getPosition: (d) => d.position, getColor: (d) => d.color, pointSize: 5 }),
      new LineLayer<Axis>({ id: 'axes', data: axes(), coordinateSystem: COORDINATE_SYSTEM.CARTESIAN, getSourcePosition: (d) => d.from, getTargetPosition: (d) => d.to, getColor: (d) => d.color, getWidth: 3 }),
    ],
    // GimbalWidget is typed for a Deck without views (Widget<..., null>), so the OrbitView deck needs a cast.
    widgets: [
      new GimbalWidget({
        placement: 'top-left',
        strokeWidth: 2,
        transitionDuration: 400,
        onReset: ({ rotationOrbit, rotationX }) => {
          if (log) log.textContent = `onReset: rotationOrbit ${rotationOrbit}, rotationX ${rotationX}`;
        },
      }) as never,
    ],
  });

  // A card turns the knot on its own and presses the gimbal now and then.
  const stopSpin = ctx.preview
    ? animate((t) => {
        viewState = { ...viewState, rotationOrbit: 30 + t * 30, rotationX: -45 + Math.sin(t) * 30, transitionDuration: 0 };
        deck.setProps({ viewState });
      })
    : () => {};
  const press = ctx.preview ? clickEvery(stage.box, '.deck-widget-gimbal button', 5000) : () => {};
  return () => {
    stopSpin();
    press();
    stage.release(deck);
  };
};

export default mount;
