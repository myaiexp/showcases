// A driver's view and a minimap: layerFilter keeps the car out of the first-person camera
import { Deck, FirstPersonView, MapView } from '@deck.gl/core';
import type { FirstPersonViewState, MapViewState } from '@deck.gl/core';
import { PathLayer, PolygonLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { HOME } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { car, ROAD, roadside, type CarPose, type House } from '../../shared/views-scene.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#2a3d58' });
  let showCar = false;
  const houses = roadside(ctx.preview ? 40 : 72);

  const deck = new Deck({
    device: stage.device,
    views: [
      new FirstPersonView({ id: 'first-person', far: 3000 }),
      new MapView({
        id: 'minimap',
        x: 8,
        y: 8,
        width: ctx.preview ? 110 : '34%',
        height: ctx.preview ? 80 : '42%',
        clear: true,
        clearColor: [14, 24, 38, 255],
      }),
    ],
    viewState: poses(0),
    layerFilter: ({ layer, viewport }) => !(viewport.id === 'first-person' && layer.id === 'car' && !showCar),
    layers: layers(0),
  });

  function poses(a: number): { 'first-person': FirstPersonViewState; minimap: MapViewState } {
    const { position, heading } = car(a);
    return {
      'first-person': { longitude: position[0], latitude: position[1], bearing: heading, pitch: -2, position: [0, 0, 2] },
      minimap: { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.7 : 12.3 },
    };
  }
  function layers(a: number) {
    const pose = car(a);
    return [
      new PolygonLayer<{ p: [number, number, number][] }>({
        id: 'ground',
        // One metre below the road, so the road is not fighting the ground for depth.
        data: [{ p: [[HOME[0] - 0.1, HOME[1] - 0.1, -1], [HOME[0] + 0.1, HOME[1] - 0.1, -1], [HOME[0] + 0.1, HOME[1] + 0.1, -1], [HOME[0] - 0.1, HOME[1] + 0.1, -1]] }],
        getPolygon: (d) => d.p,
        getFillColor: [38, 50, 46],
        stroked: false,
      }),
      new PathLayer<{ path: [number, number][] }>({ id: 'road', data: [{ path: ROAD }], getPath: (d) => d.path, getColor: [120, 130, 150], getWidth: 10, widthUnits: 'meters' }),
      new PolygonLayer<House>({
        id: 'houses',
        data: houses,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: [150, 165, 195],
        material: { ambient: 0.5, diffuse: 0.7, shininess: 20 },
      }),
      // In the docs' version this is a SimpleMeshLayer car; a plain disc keeps the point.
      new ScatterplotLayer<CarPose>({
        id: 'car',
        data: [pose],
        getPosition: (d) => d.position,
        getRadius: 6,
        radiusUnits: 'meters',
        radiusMinPixels: 5,
        getFillColor: [255, 90, 90],
        parameters: { depthCompare: 'always' },
      }),
    ];
  }

  let a = 0;
  const stop = animate(() => {
    a += 0.004;
    deck.setProps({ viewState: poses(a), layers: layers(a) });
  });
  if (!ctx.preview) check(controlBar(el), 'draw the car in the first-person view too', false, (v) => { showCar = v; deck.setProps({ layerFilter: (info) => !(info.viewport.id === 'first-person' && info.layer.id === 'car' && !showCar) }); });
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
