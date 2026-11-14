// Deck layerFilter: a bigger invisible layer that exists only while picking
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PROBES = ['Tokyo', 'Cairo', 'Lima', 'London'].map(city);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.8 : 1.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover near a dot');
  let halo = true;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    // `layerFilter` runs per layer, per viewport, per pass. The halo draws only when
    // isPicking is true, so the screen never shows it but the picking buffer has it.
    layerFilter: ({ layer, isPicking }) => layer.id !== 'pick-halo' || (halo && isPicking),
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'dots',
        data: CITIES,
        getPosition: (c) => c.coordinates,
        getRadius: 3,
        radiusUnits: 'pixels',
        getFillColor: [255, 140, 60],
        pickable: true,
      }),
      new ScatterplotLayer<City>({
        id: 'pick-halo',
        data: CITIES,
        getPosition: (c) => c.coordinates,
        getRadius: 16,
        radiusUnits: 'pixels',
        getFillColor: [0, 0, 0, 0],
        pickable: true,
      }),
    ],
    onHover: (info: PickingInfo<City>) => {
      label.textContent = info.object ? `${info.object.name} (picked from ${info.layer?.id})` : 'nothing under the pointer';
    },
  });

  // A card asks the picking engine about a spot 12 px right of a dot, with and without the halo.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      halo = i % 2 === 0;
      const c = PROBES[Math.floor(i / 2) % PROBES.length]!;
      const [x, y] = deck.getViewports()[0]?.project(c.coordinates) ?? [0, 0];
      const hit = deck.pickObject({ x: x! + 12, y: y! });
      label.textContent = `halo ${halo ? 'on ' : 'off'}: 12 px from ${c.name} -> ${(hit?.object as City | undefined)?.name ?? 'miss'}`;
    }, 1400);
  } else {
    check(controlBar(el), 'helper halo layer (picking pass only)', halo, (v) => {
      halo = v;
      deck.setProps({ layerFilter: ({ layer, isPicking }) => layer.id !== 'pick-halo' || (halo && isPicking) });
    });
  }

  return () => {
    window.clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
