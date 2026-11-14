// Finding entities by tag: any of several tags, all of an array of tags, and tags.has
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTown } from '../../shared/town.ts';

const QUERIES: Record<string, (root: pc.Entity) => pc.GraphNode[]> = {
  "findByTag('enemy')": (r) => r.findByTag('enemy'),
  "findByTag('enemy', 'friend')  (any)": (r) => r.findByTag('enemy', 'friend'),
  "findByTag(['enemy', 'flying'])  (all)": (r) => r.findByTag(['enemy', 'flying']),
  "findByTag(['enemy', 'boss'])  (all)": (r) => r.findByTag(['enemy', 'boss']),
  "findByTag('locked')": (r) => r.findByTag('locked'),
  "findByTag('boss', 'locked')  (any)": (r) => r.findByTag('boss', 'locked'),
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 13, pitch: -28, autoRotate: 6 }, floor: 24 });
  const { app } = scene;
  const town = buildTown(app);
  const keys = Object.keys(QUERIES);
  const run = (key: string): pc.GraphNode[] => {
    const hits = QUERIES[key]!(town.root);
    town.highlight(hits as pc.Entity[]);
    return hits;
  };

  // The flying ones bob, so tags are visible in motion.
  let t = 0;
  let last = -1;
  app.on('update', (dt: number) => {
    t += dt;
    for (const e of town.root.findByTag('flying')) e.setLocalPosition(e.getLocalPosition().x, 1.8 + Math.sin(t * 2 + e.getLocalPosition().x) * 0.3, e.getLocalPosition().z);
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
      out.textContent = `${hits.length} found: ${hits.map((h) => `${h.name} [${(h as pc.Entity).tags.list().join(', ')}]`).join('; ') || 'none'}`;
    };
    panel.select('query', keys, keys[0]!, show);
    panel.row();
    panel.readout('Several tag arguments mean any of them; an array means all of them. findByTag searches the descendants, not the entity itself.');
    show(keys[0]!);
  }

  return () => scene.dispose();
};

export default mount;
