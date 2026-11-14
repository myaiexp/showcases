// Toggle a 15,000-point layer two ways and count how often its accessor runs
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Mode = 'remove from the list' | 'visible prop';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const DATA = pointCloud(ctx.preview ? 3000 : 15_000, { seed: 90, spread: 2.5 });
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Toggle the layer.');
  let mode: Mode = ctx.preview ? 'visible prop' : 'remove from the list';
  let shown = true;
  let calls = 0;

  const layers = () => {
    const points = (visible: boolean) =>
      new ScatterplotLayer<SamplePoint>({
        id: 'points',
        data: DATA,
        visible,
        getPosition: (d) => {
          calls++;
          return d.position;
        },
        getRadius: 4,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70, 170],
      });
    return [landLayer(), mode === 'visible prop' ? points(shown) : shown && points(true)];
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const toggle = (v: boolean): void => {
    shown = v;
    calls = 0;
    deck.setProps({ layers: layers() });
    window.setTimeout(() => {
      label.textContent = `layer ${shown ? 'on' : 'off'} (${mode}): getPosition ran ${calls} times for this change`;
    }, 250);
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => toggle(!shown), 1500);
  } else {
    const bar = controlBar(el);
    select(bar, 'hide by', ['remove from the list', 'visible prop'] as Mode[], (v) => (mode = v), mode);
    check(bar, 'show points', true, toggle);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
