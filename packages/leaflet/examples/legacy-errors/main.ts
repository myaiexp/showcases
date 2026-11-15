// The errors 1.x-style code gets in Leaflet 2, and the 2.0 spelling of each
import { Class, DomUtil, Draggable, LeafletMap, Marker, Popup } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface Attempt {
  title: string;
  old: string;
  fix: string;
  run: () => string;
  runFixed: () => string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button runs the 1.x line and catches what Leaflet 2 says; the second line shows the 2.0 version working.' });
  const log = stage.log('Attempts');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const message = (err: unknown): string => (err instanceof Error ? `${err.name}: ${err.message}` : String(err));
  const attempts: Attempt[] = [
    {
      title: 'initialize()',
      old: 'class Old extends Class { initialize() {} }; new Old()',
      fix: 'class Fresh extends Class { constructor() { super(); … } }',
      run: () => {
        class Old extends Class {
          initialize(): void {}
        }
        try {
          new Old();
          return 'no error';
        } catch (err) {
          return message(err);
        }
      },
      runFixed: () => {
        class Fresh extends Class {
          ready = true;
        }
        return `new Fresh().ready = ${new Fresh().ready}`;
      },
    },
    {
      title: 'Draggable preventOutline',
      old: 'new Draggable(el, el, true)',
      fix: 'new Draggable(el, el, {clickTolerance: 5})',
      run: () => {
        const div = DomUtil.create('div');
        try {
          new Draggable(div, div, true as never);
          return 'no error';
        } catch (err) {
          return message(err);
        }
      },
      runFixed: () => {
        const div = DomUtil.create('div');
        const d = new Draggable(div, div, { clickTolerance: 5 });
        return `Draggable made, clickTolerance = ${d.options.clickTolerance}`;
      },
    },
    {
      title: 'prototype.options',
      old: 'Marker.prototype.options.opacity = 0.5',
      fix: 'class Pin extends Marker {}; Pin.mergeOptions({opacity: 0.5})',
      run: () => {
        try {
          (Marker.prototype as unknown as { options: { opacity: number } }).options.opacity = 0.5;
          return 'no error';
        } catch (err) {
          return message(err);
        }
      },
      runFixed: () => {
        class Pin extends Marker {}
        Pin.mergeOptions({ opacity: 0.5 });
        return `new Pin([0, 0]).options.opacity = ${new Pin([0, 0]).options.opacity}; Marker default stays ${Marker.defaultOptions?.['opacity']}`;
      },
    },
  ];
  let popup: Popup | undefined;
  const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const run = (a: Attempt): void => {
    const bad = a.run();
    const good = a.runFixed();
    log(`${a.old}\n  → ${bad}\n${a.fix}\n  → ${good}`);
    popup?.remove();
    popup = new Popup({ autoPan: stage.preview, maxWidth: stage.preview ? 200 : 420, closeButton: false })
      .setLatLng([stage.preview ? 20 : 30, 10])
      .setContent(
        stage.preview
          ? `<code>${esc(a.old)}</code><br><span style="color:#b91c1c;font-size:10px">${esc(bad)}</span>`
          : `<b>${esc(a.old)}</b><br><span style="color:#b91c1c">${esc(bad)}</span><hr><b>${esc(a.fix)}</b><br>${esc(good)}`,
      )
      .openOn(map);
    stage.say(`${a.title}: ${bad}`, 'bad');
  };
  for (const a of attempts) stage.button(a.title, () => run(a));
  stage.onDispose(() => popup?.remove());

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => run(attempts[i++ % attempts.length] as Attempt) }], 3200);
  } else {
    run(attempts[0] as Attempt);
  }
  return () => stage.dispose();
};

export default mount;
