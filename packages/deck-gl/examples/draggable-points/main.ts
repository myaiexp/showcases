// onDragStart, onDrag and onDragEnd on a layer: drag its points and the polygon follows
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { PolygonLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Handle {
  coordinates: [number, number];
}

const START: Handle[] = Array.from({ length: 6 }, (_, i) => ({
  coordinates: [10 + Math.cos((i / 6) * Math.PI * 2) * 6, 48 + Math.sin((i / 6) * Math.PI * 2) * 4] as [number, number],
}));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 48, zoom: ctx.preview ? 2.7 : 4.2 };
  const label = ctx.preview ? overlay(stage.box, 'drag a point: onDrag moves it', 'bottom') : readout(el, 'Drag a point');
  let handles = START;
  let dragging = -1;

  const layers = () => [
    landLayer(),
    new PolygonLayer<Handle[]>({
      id: 'shape',
      data: [handles],
      getPolygon: (d) => d.map((h) => h.coordinates),
      getFillColor: [90, 170, 255, 70],
      getLineColor: [90, 170, 255],
      lineWidthMinPixels: 2,
      stroked: true,
    }),
    new ScatterplotLayer<Handle>({
      id: 'handles',
      data: handles,
      getPosition: (d) => d.coordinates,
      getRadius: 9,
      radiusUnits: 'pixels',
      getFillColor: (_d, { index }) => (index === dragging ? [255, 220, 90] : [255, 150, 70]),
      updateTriggers: { getFillColor: [dragging] },
      pickable: true,
      onDragStart: (info: PickingInfo<Handle>) => {
        dragging = info.index;
        label.textContent = `dragging point ${dragging}`;
      },
      onDrag: (info: PickingInfo<Handle>) => {
        if (dragging < 0 || !info.coordinate) return;
        // info.coordinate is the pointer in lng/lat: move the dragged handle there.
        const next = handles.slice();
        next[dragging] = { coordinates: [info.coordinate[0]!, info.coordinate[1]!] };
        handles = next;
        deck.setProps({ layers: layers() });
      },
      onDragEnd: () => {
        label.textContent = `dropped point ${dragging}`;
        dragging = -1;
        deck.setProps({ layers: layers() });
      },
    }),
  ];

  // The controller would pan the map under the drag, so panning is off in "drag points" mode.
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: ctx.preview ? false : { dragPan: false },
    getCursor: ({ isDragging, isHovering }) => (isDragging ? 'grabbing' : isHovering ? 'grab' : 'default'),
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Stands in for a drag: point 1 and 4 wander about on their own.
    stop = animate((t) => {
      handles = START.map((h, i) =>
        i % 3 === 1 ? { coordinates: [h.coordinates[0] + Math.sin(t * 1.3 + i) * 2.2, h.coordinates[1] + Math.cos(t * 1.1 + i) * 1.6] } : h,
      );
      dragging = Math.floor(t / 2) % 2 ? 1 : 4;
      deck.setProps({ layers: layers() });
    });
  } else {
    select(controlBar(el), 'dragging', ['move points', 'pan the map'] as const, (v) => {
      deck.setProps({ controller: v === 'pan the map' ? true : { dragPan: false } });
    }, 'move points');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
