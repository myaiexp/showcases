// FirstPersonView: a camera standing in a street, set by position, bearing, pitch and fovy
import { Deck, FirstPersonView } from '@deck.gl/core';
import type { FirstPersonViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { blocks, HOME, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const GROUND: [number, number][] = [[HOME[0] - 0.05, HOME[1] - 0.05], [HOME[0] + 0.05, HOME[1] - 0.05], [HOME[0] + 0.05, HOME[1] + 0.05], [HOME[0] - 0.05, HOME[1] + 0.05]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#2a3d58' });
  const cam = { north: -500, bearing: 0, pitch: 0, eye: 2, fovy: 75 };
  const label = ctx.preview ? null : readout(el);

  const viewState = (): FirstPersonViewState => ({
    longitude: HOME[0],
    latitude: HOME[1],
    // Metres east, north and up from the longitude/latitude anchor.
    position: [0, cam.north, cam.eye],
    bearing: cam.bearing,
    pitch: cam.pitch,
  });
  const makeView = () => new FirstPersonView({ id: 'pov', fovy: cam.fovy, far: 4000, controller: !ctx.preview });
  const apply = (): void => {
    deck.setProps({ views: makeView(), viewState: viewState() });
    if (label) label.textContent = `position [0, ${cam.north}, ${cam.eye}]  bearing ${cam.bearing}  pitch ${cam.pitch}  fovy ${cam.fovy}`;
  };

  const deck = new Deck({
    device: stage.device,
    views: makeView(),
    viewState: viewState(),
    onViewStateChange: ({ viewState: next }) => {
      const s = next as FirstPersonViewState;
      cam.bearing = Math.round(s.bearing ?? 0);
      cam.pitch = Math.round(s.pitch ?? 0);
      apply();
    },
    layers: [
      new PolygonLayer<[number, number][]>({ id: 'ground', data: [GROUND], getPolygon: (d) => d, getFillColor: [38, 50, 46], stroked: false }),
      new PolygonLayer<Block>({
        id: 'blocks',
        data: blocks(8, 8, { cell: 0.002 }),
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        getFillColor: (d) => [90 + d.value * 120, 110 + d.value * 70, 150 + d.value * 60],
        material: { ambient: 0.45, diffuse: 0.7, shininess: 20 },
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Walk north along the street between two block columns, looking about.
    stop = animate((t) => {
      cam.north = ((t * 40) % 1000) - 500;
      cam.bearing = Math.sin(t * 0.5) * 40;
      apply();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'north (m)', -600, 600, 10, -500, (v) => { cam.north = v; apply(); });
    slider(bar, 'bearing', -180, 180, 1, 0, (v) => { cam.bearing = v; apply(); });
    slider(bar, 'pitch', -60, 60, 1, 0, (v) => { cam.pitch = v; apply(); });
    slider(bar, 'eye height (m)', 1, 200, 1, 2, (v) => { cam.eye = v; apply(); });
    slider(bar, 'fovy', 30, 120, 1, 75, (v) => { cam.fovy = v; apply(); });
    apply();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
