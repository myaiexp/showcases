// Util.wrapNum folds any heading into [0, 360), and includeMax decides what 360 does
import { CircleMarker, DivIcon, LeafletMap, Marker, Util } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the heading past 360 or below 0: the needle shows wrapNum(heading, [0, 360]). With includeMax on, exactly 360 stays 360 instead of becoming 0.' });
  const log = stage.log('wrapNum');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new CircleMarker([30, 10], { radius: 50, color: '#9ca3af', weight: 2, fillOpacity: 0.12, interactive: false }).addTo(map);
  const needle = new Marker([30, 10], {
    interactive: false,
    keyboard: false,
    icon: new DivIcon({ html: '<div class="needle"></div>', className: '', iconSize: [0, 0] }),
  }).addTo(map);

  let includeMax = false;
  let heading = 45;
  // The needle element turns by the wrapped value; the raw one would spin the long way round.
  let turns = 0;
  let lastWrapped = 0;
  const show = (): void => {
    const wrapped = Util.wrapNum(heading, [0, 360], includeMax);
    // Keep the needle from spinning backwards across 0: follow the shortest way round.
    const delta = ((wrapped - lastWrapped + 540) % 360) - 180;
    turns += delta;
    lastWrapped = wrapped;
    const inner = needle.getElement()?.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = `rotate(${turns}deg)`;
    const text = `wrapNum(${heading}, [0, 360]${includeMax ? ', true' : ''}) = ${wrapped}`;
    log(text);
    stage.say(text);
  };
  stage.slider('heading', -720, 720, 15, heading, (v) => {
    heading = v;
    show();
  });
  stage.toggle('includeMax', false, (on) => {
    includeMax = on;
    show();
  });
  stage.button('heading = 360', () => {
    heading = 360;
    show();
  });
  show();

  if (stage.preview) {
    const script: [number, boolean][] = [[45, false], [400, false], [-90, false], [720, false], [360, false], [360, true], [-450, true]];
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            const [h, max] = script[i++ % script.length] as [number, boolean];
            heading = h;
            includeMax = max;
            show();
          },
        },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
