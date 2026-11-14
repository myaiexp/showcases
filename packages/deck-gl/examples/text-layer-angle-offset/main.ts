// TextLayer getAngle, getPixelOffset and billboard: rotated labels beside points
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, lngPerLat } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

interface Tag {
  text: string;
  position: [number, number];
  index: number;
}

const WORDS = ['north', 'east', 'south', 'west', 'above', 'below', 'inside', 'outside'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 11.4 : 12.1, pitch: 50 };
  const data: Tag[] = WORDS.map((text, index) => ({
    text,
    index,
    position: [HOME[0] + ((index % 4) - 1.5) * 0.04 * lngPerLat(HOME[1]), HOME[1] + (index < 4 ? 0.012 : -0.012)],
  }));
  const state = { angle: 0, offsetX: 12, offsetY: 0, billboard: true };

  const build = (): (ScatterplotLayer<Tag> | TextLayer<Tag>)[] => [
    new ScatterplotLayer<Tag>({ id: 'dots', data, getPosition: (d) => d.position, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 90, 90] }),
    new TextLayer<Tag>({
      id: 'tags',
      data,
      getText: (d) => d.text,
      getPosition: (d) => d.position,
      getSize: 18,
      getColor: [255, 214, 120],
      // Degrees, counter-clockwise; each label turns by a different multiple of the slider.
      getAngle: (d) => state.angle * (d.index % 2 === 0 ? 1 : -1),
      getTextAnchor: 'start',
      // Screen pixels away from the position, whatever the angle.
      getPixelOffset: [state.offsetX, state.offsetY],
      // true: always faces the camera. false: lies flat on the ground and tilts with the map.
      billboard: state.billboard,
      updateTriggers: { getAngle: [state.angle] },
    }),
  ];
  const update = (): void => deck.setProps({ layers: build() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: build(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.angle = (t * 40) % 360;
      state.billboard = Math.floor(t / 4) % 2 === 0;
      update();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'getAngle', -180, 180, 5, 0, (v) => { state.angle = v; update(); });
    slider(bar, 'offset x', -40, 40, 1, 12, (v) => { state.offsetX = v; update(); });
    slider(bar, 'offset y', -40, 40, 1, 0, (v) => { state.offsetY = v; update(); });
    check(bar, 'billboard', true, (v) => { state.billboard = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
