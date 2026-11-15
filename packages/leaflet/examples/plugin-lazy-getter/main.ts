// A lazy prototype getter versus addInitHook, for a plugin that loads after some layers exist
import { LeafletMap, Polyline, type LatLng, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface Stats {
  km: number;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Route A and B exist before the plugin is installed, C after. Install it, then read stats on each route.' });
  const pre = stage.side('Plugin state');
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Own subclass: a getter on Polyline.prototype itself would change every line on the page.
  class Route extends Polyline {}
  const path = (lat: number): LatLngExpression[] => [[lat, 2], [lat + 1.5, 9], [lat, 16]];
  const routes = { A: new Route(path(52), { color: '#60a5fa' }), B: new Route(path(47), { color: '#facc15' }) } as Record<string, Route>;
  let installed = false;
  let built = 0;
  const hookSaw = new Set<Route>();
  const helpers = new WeakMap<Route, Stats>();
  for (const [name, r] of Object.entries(routes)) r.addTo(map).bindTooltip(`Route ${name}`, { permanent: true, direction: 'top' });

  const statsOf = (r: Route): Stats | undefined => (r as unknown as { stats?: Stats }).stats;
  const show = (): void => {
    const rows = Object.entries(routes).map(([name, r]) => {
      const has = 'stats' in r;
      return `Route ${name}  stats getter: ${has ? 'yes' : 'no'}   helper built: ${helpers.has(r)}   init hook ran: ${hookSaw.has(r)}`;
    });
    const text = `${installed ? 'plugin installed' : 'plugin not installed'}   helpers built: ${built}\n${rows.join('\n')}`;
    if (pre) pre.textContent = text;
    else stage.say(text.replace('\n', ' | ').replaceAll('Route ', ''));
  };
  const install = (): void => {
    if (installed) return;
    installed = true;
    // 1. the lazy getter: built on first read, for any Route, whenever it was created
    Object.defineProperty(Route.prototype, 'stats', {
      configurable: true,
      get(this: Route): Stats {
        let helper = helpers.get(this);
        if (!helper) {
          built++;
          const pts = this.getLatLngs() as LatLng[];
          let m = 0;
          for (let i = 1; i < pts.length; i++) m += (pts[i - 1] as LatLng).distanceTo(pts[i] as LatLng);
          helper = { km: Math.round(m / 1000) };
          helpers.set(this, helper);
        }
        return helper;
      },
    });
    // 2. an init hook: only runs for routes constructed from now on
    Route.addInitHook(function (this: Route) {
      hookSaw.add(this);
    });
    routes['C'] = new Route(path(42), { color: '#4ade80' }).addTo(map).bindTooltip('Route C', { permanent: true, direction: 'top' });
    show();
  };
  const read = (name: string): void => {
    const r = routes[name];
    if (!r) return;
    const s = statsOf(r);
    r.setTooltipContent(s ? `Route ${name}: ${s.km} km` : `Route ${name}: no stats`);
    show();
  };

  stage.button('Install the plugin', install);
  for (const n of ['A', 'B', 'C']) stage.button(`read route ${n}.stats`, () => read(n));
  show();

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'Before the plugin: A and B have no stats', run: () => (read('A'), undefined) },
        { say: 'Installed: the getter is on the prototype, the hook only sees C', run: install },
        { run: () => read('A') },
        { run: () => read('C') },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
