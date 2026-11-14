// Accessors read outside state: updateTriggers tells deck.gl when to call them again
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PALETTES: Record<string, Color[]> = {
  warm: [[255, 90, 60], [255, 160, 40], [255, 220, 90], [200, 60, 120]],
  cool: [[60, 120, 255], [60, 210, 230], [140, 100, 240], [90, 230, 160]],
};
type Palette = keyof typeof PALETTES;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const data = pointCloud(400, { seed: 8, spread: 2.2 });
  let palette: Palette = 'warm';
  let triggers = true;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      // The accessor's function identity is not compared: its output depends on `palette`,
      // which deck.gl cannot see, so it is declared below.
      getFillColor: (d) => PALETTES[palette]![d.cluster]!,
      getRadius: 6,
      radiusUnits: 'pixels',
      updateTriggers: triggers ? { getFillColor: [palette] } : {},
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `palette ${palette}, updateTriggers ${triggers ? 'on' : 'off'}`;
  };
  label.textContent = `palette ${palette}, updateTriggers on`;

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      palette = palette === 'warm' ? 'cool' : 'warm';
      apply();
    }, 1600);
  } else {
    const bar = controlBar(el);
    select(bar, 'palette', ['warm', 'cool'] as const, (v) => {
      palette = v;
      apply();
    }, palette);
    check(bar, 'updateTriggers: getFillColor', true, (v) => {
      triggers = v;
      apply();
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
