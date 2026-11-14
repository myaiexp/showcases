// Finding entities by name and path: findByName, find('name', ...), findByPath and path
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTown } from '../../shared/town.ts';

const QUERIES: Record<string, (from: pc.Entity) => pc.GraphNode[]> = {
  "findByName('door')": (e) => [e.findByName('door')].filter((x): x is pc.GraphNode => !!x),
  "find('name', 'door')": (e) => e.find('name', 'door'),
  "findByName('goblin')": (e) => [e.findByName('goblin')].filter((x): x is pc.GraphNode => !!x),
  "find('name', 'goblin')": (e) => e.find('name', 'goblin'),
  "findByPath('town/house-B/door')": (e) => [e.findByPath('town/house-B/door')].filter((x): x is pc.GraphNode => !!x),
  "findByPath('house-C/window') from town": (e) => {
    const town = e.findByName('town');
    return [town?.findByPath('house-C/window')].filter((x): x is pc.GraphNode => !!x);
  },
  "findByName('nothing')": (e) => [e.findByName('nothing')].filter((x): x is pc.GraphNode => !!x),
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 13, pitch: -28, autoRotate: 6 }, floor: 24, sun: { shadows: false } });
  const { app } = scene;
  const town = buildTown(app);
  const keys = Object.keys(QUERIES);

  const run = (key: string): { hits: pc.GraphNode[] } => {
    const hits = QUERIES[key]!(town.root);
    town.highlight(hits as pc.Entity[]);
    return { hits };
  };

  if (ctx.preview) {
    let t = 0;
    let last = -1;
    app.on('update', (dt: number) => {
      t += dt;
      const step = Math.floor(t / 2) % 4;
      if (step !== last) {
        last = step;
        run(keys[step]!);
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    const show = (key: string): void => {
      const { hits } = run(key);
      out.textContent = `${hits.length} match${hits.length === 1 ? '' : 'es'}${hits.length ? `, e.g. path '${hits[0]!.path}'` : ' (the single-result methods return null)'}`;
    };
    panel.select('search from app.root-level Root', keys, keys[0]!, show);
    panel.row();
    panel.readout('Names need not be unique: findByName returns the first it reaches (depth-first), find returns every match.');
    show(keys[0]!);
  }

  return () => scene.dispose();
};

export default mount;
