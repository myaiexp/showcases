// A PointCloudLayer of lit points on a sphere, seen through an orbiting OrbitView
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import { PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { sphereCloud, type CloudPoint } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0d1117' });
  const zoom = ctx.preview ? -0.4 : 0.6;
  const viewState = (rotationOrbit: number) => ({ target: [0, 0, 0] as [number, number, number], rotationX: 20, rotationOrbit, zoom });

  const deck = new Deck({
    device: stage.device,
    // A non-geospatial camera that orbits around a target: it is not a map.
    views: new OrbitView({ orbitAxis: 'Y' }),
    initialViewState: viewState(30),
    controller: !ctx.preview,
    layers: [
      new PointCloudLayer<CloudPoint>({
        id: 'cloud',
        data: sphereCloud(ctx.preview ? 2500 : 6000),
        // Positions are plain x/y/z numbers, not longitude and latitude.
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getPosition: (d) => d.position,
        getNormal: (d) => d.normal,
        getColor: (d) => d.color,
        pointSize: 3,
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: viewState(30 + t * 25) })) : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
