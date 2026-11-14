// PointCloudLayer getNormal: per-point normals shade a sphere, a constant one not
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import { PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { sphereCloud, type CloudPoint } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const zoom = ctx.preview ? -0.4 : 0.6;
  const viewState = (rotationOrbit: number) => ({ target: [0, 0, 0] as [number, number, number], rotationX: 25, rotationOrbit, zoom });
  const data = sphereCloud(ctx.preview ? 2500 : 7000);
  let useNormals = true;

  const build = (): PointCloudLayer<CloudPoint> =>
    new PointCloudLayer<CloudPoint>({
      id: 'cloud',
      data,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: (d) => d.position,
      // The default normal is [0, 0, 1] for every point: all points shade as if facing up.
      getNormal: useNormals ? (d) => d.normal : [0, 0, 1],
      getColor: [230, 230, 235],
      pointSize: 4,
    });
  const deck = new Deck({
    device: stage.device,
    views: new OrbitView({ orbitAxis: 'Y' }),
    initialViewState: viewState(0),
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      useNormals = Math.floor(t / 3) % 2 === 0;
      deck.setProps({ viewState: viewState(t * 25), layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'getNormal from the sphere', true, (v) => { useNormals = v; deck.setProps({ layers: [build()] }); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
