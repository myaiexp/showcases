// DomEvent.on and off: types, maps, context, duplicates and the three ways to remove
import { Control, DomEvent, DomUtil, LeafletMap, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import './style.css';

class Pad extends Control<{ position: ControlPosition }> {
  static override defaultOptions = { position: 'topright' as ControlPosition };
  override onAdd(): HTMLElement {
    const pad = DomUtil.create('div', 'pad');
    pad.textContent = 'event pad';
    return pad;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press "Next step" to change the listeners, then click or hover the pad (or use the Send buttons).' });
  const log = stage.log('Listeners');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: false, doubleClickZoom: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const control = new Pad().addTo(map);
  stage.onDispose(() => control.remove());
  const pad = control.getContainer() as HTMLElement;
  const g = ghost(map); // keeps a scripted click inside a card from opening the example
  stage.onDispose(() => g.remove());

  const counts: Record<string, number> = {};
  // `this` is the context object, not the pad.
  const counter = {
    name: 'ctx',
    hit(this: { name: string }, e: Event): void {
      const key = `${e.type} (this = ${this.name})`;
      counts[key] = (counts[key] ?? 0) + 1;
    },
  };
  const other = { name: 'second', hit: counter.hit };
  const hit = counter.hit;
  const summary = (): string => `calls so far: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}`;

  const steps: { say: string; run: () => void }[] = [
    { say: "on(pad, 'click pointerover', hit, counter)", run: () => DomEvent.on(pad, 'click pointerover', hit, counter) },
    { say: 'the same call again: still one listener per type', run: () => DomEvent.on(pad, 'click pointerover', hit, counter) },
    { say: "off(pad, 'pointerover'): every pointerover listener goes", run: () => DomEvent.off(pad, 'pointerover') },
    { say: "on(pad, {click: hit, dblclick: hit}, other): a map of types, a new context", run: () => DomEvent.on(pad, { click: hit, dblclick: hit }, other) },
    { say: 'off(pad, click, hit, counter): only the counter listener goes', run: () => DomEvent.off(pad, 'click', hit, counter) },
    { say: 'off(pad): everything on the element', run: () => DomEvent.off(pad) },
  ];
  let next = 0;
  const step = (): void => {
    const s = steps[next++ % steps.length];
    if (!s) return;
    if (next > steps.length && next % steps.length === 1) for (const k of Object.keys(counts)) delete counts[k];
    s.run();
    log(s.say);
    stage.say(s.say);
  };
  const send = (type: 'click' | 'pointerover' | 'dblclick'): void => {
    const before = summary();
    pad.dispatchEvent(type === 'click' ? new MouseEvent('click', { bubbles: true, cancelable: true }) : new MouseEvent(type, { bubbles: true }));
    log(`${type} sent; ${before === summary() ? 'no listener answered' : summary()}`);
  };
  stage.onDispose(() => DomEvent.off(pad));

  stage.button('Next step', step);
  stage.button('Send click', () => send('click'));
  stage.button('Send pointerover', () => send('pointerover'));
  stage.button('Send dblclick', () => send('dblclick'));

  if (stage.preview) {
    stage.cycle(
      [
        { run: step },
        { run: () => (send('click'), send('pointerover')) },
        { run: step },
        { run: () => (send('click'), send('pointerover')) },
        { run: step },
        { run: () => (send('click'), send('pointerover')) },
        { run: step },
        { run: () => (send('click'), send('dblclick')) },
        { run: step },
        { run: () => (send('click'), send('dblclick')) },
        { run: step },
        { run: () => (send('click'), send('dblclick')) },
      ],
      1100,
    );
  }
  return () => stage.dispose();
};

export default mount;
