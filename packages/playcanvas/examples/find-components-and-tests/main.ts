// Finding with a test of your own, or by component: find(fn), findOne(fn), findComponents, forEach
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTown } from '../../shared/town.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 13, pitch: -28, autoRotate: 6 }, floor: 24 });
  const { app } = scene;
  const town = buildTown(app);

  // Some lights, so findComponents('light') has something to find.
  for (const [i, x] of [-4, 4].entries()) {
    const lamp = new pc.Entity(`lamp-${i + 1}`);
    lamp.addComponent('light', { type: 'omni', range: 7, intensity: 1.4, color: new pc.Color(1, 0.85, 0.6) });
    lamp.setLocalPosition(x, 3, 3);
    town.root.addChild(lamp);
    // The same entity also draws a small bulb, so highlighting it shows.
    lamp.addComponent('render', { type: 'sphere', material: material('#e8e2d0'), castShadows: false });
    lamp.setLocalScale(0.4, 0.4, 0.4);
    town.track(lamp);
  }

  const lights = (): pc.Component[] => town.root.findComponents('light');
  const QUERIES: Record<string, () => (pc.GraphNode | pc.Component)[]> = {
    "find(e => e.name.startsWith('house'))": () => town.root.find((e: pc.GraphNode) => e.name.startsWith('house')),
    "find(e => e.render && e.getPosition().y > 1.5)": () => town.root.find((e: pc.GraphNode) => !!(e as pc.Entity).render && e.getPosition().y > 1.5),
    "findOne(e => e.tags.has('boss'))": () => [town.root.findOne((e: pc.GraphNode) => (e as pc.Entity).tags.has('boss'))].filter((x): x is pc.GraphNode => !!x),
    "findComponents('render') in a house": () => (town.root.findByName('house-A') as pc.Entity).findComponents('render'),
    "findComponent('light')  (the first)": () => {
      const first = town.root.findComponent('light');
      return first ? [first] : [];
    },
    "findComponents('light')": lights,
  };
  const keys = Object.keys(QUERIES);
  const run = (key: string): (pc.GraphNode | pc.Component)[] => {
    const hits = QUERIES[key]!();
    town.highlight(hits as pc.Entity[]);
    return hits;
  };

  let t = 0;
  let last = -1;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      const step = Math.floor(t / 2.2) % keys.length;
      if (step !== last) {
        last = step;
        run(keys[step]!);
      }
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const out = panel.readout();
    const show = (key: string): void => {
      const hits = run(key);
      const names = hits.map((h) => ('entity' in h ? (h.entity as pc.Entity).name : h.name));
      out.textContent = `${hits.length} found: ${names.join(', ') || 'none'}   (component searches return components; each has .entity)`;
    };
    panel.select('query', keys, keys[0]!, show);
    panel.row();
    panel.button('forEach: list every path', () => {
      const paths: string[] = [];
      town.root.forEach((e: pc.GraphNode) => paths.push(e.path));
      out.textContent = `${paths.length} entities, e.g. ${paths.slice(0, 5).join(' | ')} ...`;
    });
    panel.row();
    panel.readout('A search visits every entity below it, so search once and keep the result rather than searching every frame.');
    show(keys[0]!);
  }

  return () => scene.dispose();
};

export default mount;
