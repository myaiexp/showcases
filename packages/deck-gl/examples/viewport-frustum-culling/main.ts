// getFrustumPlanes() and projectPosition(): testing points against the camera
import { Deck, MapView, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const SIDES = ['near', 'far', 'left', 'right', 'top', 'bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const info = ctx.preview ? null : readout(el, 'Pan, rotate and tilt: dots outside the frustum turn grey.');
  let main: MapViewState = { longitude: 10, latitude: 46, zoom: ctx.preview ? 4.2 : 5, pitch: 55 };
  // Points over much of Europe; the camera sees only part of them when pitched.
  const data = pointCloud(ctx.preview ? 600 : 1500, { seed: 4, spread: 7, centres: [[10, 46], [20, 52], [0, 40], [30, 40]] });
  const outside = new Set<SamplePoint>();

  const cull = (): void => {
    const viewport = new WebMercatorViewport({ ...main, width: stage.box.clientWidth, height: stage.box.clientHeight });
    const planes = viewport.getFrustumPlanes();
    outside.clear();
    for (const d of data) {
      // The planes live in common space, so the point is projected there first.
      const p = viewport.projectPosition(d.position);
      for (const side of SIDES) {
        const { normal, distance } = planes[side];
        if (p[0] * normal[0]! + p[1] * normal[1]! + p[2] * normal[2]! > distance) {
          outside.add(d);
          break;
        }
      }
    }
    if (info) info.textContent = `${data.length - outside.size} of ${data.length} points inside the frustum`;
  };

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      radiusUnits: 'pixels',
      getRadius: 3,
      getFillColor: (d) => (outside.has(d) ? [90, 100, 120] : [255, 170, 70]),
      updateTriggers: { getFillColor: [main.longitude, main.latitude, main.zoom, main.pitch, main.bearing] },
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    views: new MapView({ id: 'main', controller: !ctx.preview }),
    viewState: main,
    onViewStateChange: ({ viewState }) => {
      main = viewState as MapViewState;
      cull();
      deck.setProps({ viewState: main, layers: layers() });
    },
    layers: layers(),
  });
  cull();
  deck.setProps({ layers: layers() });

  const stop = ctx.preview
    ? animate((t) => {
        main = { ...main, longitude: wrapLng(10 + Math.sin(t * 0.4) * 20), bearing: t * 15 };
        cull();
        deck.setProps({ viewState: main, layers: layers() });
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
