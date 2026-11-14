// colorFormat: 'RGB' ignores the alpha an accessor returns; opacity still applies
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Format = 'RGBA' | 'RGB';
const DATA = pointCloud(140, { seed: 6, spread: 2.2 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let format: Format = 'RGBA';

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'discs',
      data: DATA,
      getPosition: (d) => d.position,
      getRadius: 220_000,
      // Alpha fades with the distance from the cluster centre.
      getFillColor: (d) => [255, 140 + d.cluster * 25, 70, 255 - d.value * 230],
      colorFormat: format,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = format === 'RGBA' ? "colorFormat 'RGBA': the alpha channel fades the discs" : "colorFormat 'RGB': alpha ignored, discs are opaque";
  };
  apply();

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      format = format === 'RGBA' ? 'RGB' : 'RGBA';
      apply();
    }, 1800);
  } else {
    select(controlBar(el), 'colorFormat', ['RGBA', 'RGB'] as const, (v) => {
      format = v;
      apply();
    }, format);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
