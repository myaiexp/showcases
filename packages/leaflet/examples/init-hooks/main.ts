// addInitHook timing: before the constructor body, or after it with static initHooks and callInitHooks
import { LayerGroup, LeafletMap, Marker, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface Hooked {
  _tag?: string;
  _order?: string[];
  bindTooltip(text: string, options: object): unknown;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tooltip is written by a hook. The first marker\'s hook ran before its constructor set the tag; the second\'s ran after.' });
  const log = stage.log('Init hooks');
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const group = new LayerGroup().addTo(map);

  // All classes belong to this mount: hooks added to Marker itself would run for every marker on the page.
  class Plain extends Marker {
    _tag?: string;
    constructor(latlng: LatLngExpression, tag: string) {
      super(latlng);
      this._tag = tag; // runs after the hooks
    }
  }
  Plain.addInitHook(function (this: Hooked) {
    this.bindTooltip(`tag = ${this._tag}`, { permanent: true, direction: 'bottom', offset: [0, 0] });
  });

  class Ready extends Marker {
    static override initHooks = true;
    _tag?: string;
    constructor(latlng: LatLngExpression, tag: string) {
      super(latlng);
      this._tag = tag;
      this.callInitHooks(); // hooks run here, once the tag is set
    }
  }
  Ready.addInitHook(function (this: Hooked) {
    this.bindTooltip(`tag = ${this._tag}`, { permanent: true, direction: 'bottom', offset: [0, 0] });
  });

  // Parent hooks run first; a hook can also be the name of a method plus its arguments.
  class Base extends Marker {
    static override initHooks = true;
    _order: string[] = [];
    constructor(latlng: LatLngExpression) {
      super(latlng);
      this.callInitHooks();
    }
    _stamp(name: string, tip: boolean): void {
      this._order = [...(this._order ?? []), name];
      if (tip) this.bindTooltip(`hooks ran: ${this._order.join(' then ')}`, { permanent: true, direction: 'bottom', offset: [0, 0] });
    }
  }
  Base.addInitHook('_stamp', 'Base', false);
  // No flag of its own: Base's constructor already ends with callInitHooks(), which runs Child's hooks too.
  class Child extends Base {}
  Child.addInitHook('_stamp', 'Child', true);

  const build = (): void => {
    group.clearLayers();
    group.addLayer(new Plain([49, 4], 'Paris'));
    group.addLayer(new Ready([49, 16], 'Prague'));
    group.addLayer(new Child([45, 10]));
    for (const m of group.getLayers() as (Marker & Hooked)[]) {
      const text = m.getTooltip()?.getContent();
      log(`${m.constructor === Plain ? 'Plain' : m.constructor === Ready ? 'Ready' : 'Child'}: ${typeof text === 'string' ? text : ''}`);
    }
  };
  build();
  stage.say('Plain: the hook ran before the constructor body. Ready: callInitHooks() ran it after. Child: parent hook first.');
  stage.button('Create the markers again', build);

  if (stage.preview) {
    const lines = [
      'Plain: hook ran before the body: tag = undefined',
      'Ready: callInitHooks() at the end: tag = Prague',
      'Child: Base hook, then Child hook (method name + args)',
    ];
    let i = 0;
    stage.cycle([{ run: () => stage.say(lines[i++ % lines.length] ?? '') }], 2300);
  }
  return () => stage.dispose();
};

export default mount;
