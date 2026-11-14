// getCursor: the canvas cursor follows hovering and dragging state
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Move over a city, over the map, then drag');

  const layer = (highlighted: number | null) =>
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [255, 150, 70, 220],
      radiusMinPixels: 4,
      pickable: true,
      highlightColor: [255, 255, 255],
      ...(highlighted === null ? {} : { highlightedObjectIndex: highlighted }),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer(null)],
    // isHovering: the pointer is over a pickable object; isDragging: a drag is in progress.
    getCursor: ({ isDragging, isHovering }) => {
      const cursor = isDragging ? 'grabbing' : isHovering ? 'pointer' : 'crosshair';
      if (!ctx.preview) label.textContent = `getCursor returned '${cursor}'`;
      return cursor;
    },
  });

  // A card has no pointer: the highlight walks the cities and the label names the cursor
  // the callback would give while the pointer sat on each (or on empty map in between).
  const stop = ctx.preview
    ? animate((t) => {
        const over = Math.floor(t / 1.2) % 2 === 0;
        deck.setProps({ layers: [landLayer(), layer(over ? Math.floor(t / 2.4) % CITIES.length : -1)] });
        label.textContent = over ? "over a city: 'pointer'" : "over the map: 'crosshair'";
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
