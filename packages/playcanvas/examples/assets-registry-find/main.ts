// AssetRegistry queries: get, find, findAll, findByTag (AND, OR), filter, list
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

interface Prop {
  shape: 'box' | 'sphere' | 'cone' | 'cylinder';
  colour: string;
}

// Assets with no file hold their data in memory; loading one makes the data its resource.
const SPECS: { name: string; type: 'json' | 'text'; tags: string[]; preload?: boolean; data: Prop | string }[] = [
  { name: 'crate', type: 'json', tags: ['level-1', 'prop'], preload: true, data: { shape: 'box', colour: '#c9a063' } },
  { name: 'barrel', type: 'json', tags: ['level-1', 'prop'], data: { shape: 'cylinder', colour: '#8a5a3c' } },
  { name: 'slime', type: 'json', tags: ['level-1', 'enemy'], data: { shape: 'sphere', colour: '#7bc67b' } },
  { name: 'bat', type: 'json', tags: ['level-2', 'enemy'], preload: true, data: { shape: 'cone', colour: '#a78bfa' } },
  { name: 'crate', type: 'json', tags: ['level-2', 'prop'], data: { shape: 'box', colour: '#4ab3e8' } },
  { name: 'totem', type: 'json', tags: ['level-2', 'boss'], data: { shape: 'cylinder', colour: '#e8794a' } },
  { name: 'crate', type: 'text', tags: ['level-1'], data: 'a text asset that shares the name' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 11, pitch: -38 } });
  const { app } = scene;
  const registry = app.assets;

  const tiles = new Map<pc.Asset, pc.Entity>();
  SPECS.forEach((spec, i) => {
    const asset = new pc.Asset(spec.name, spec.type, undefined, spec.data);
    asset.tags.add(spec.tags);
    // add() loads an asset whose preload flag is set; load() does the same for the rest.
    asset.preload = !!spec.preload;
    registry.add(asset);
    registry.load(asset);

    const a = (i / SPECS.length) * Math.PI * 2;
    const look = typeof asset.resource === 'object' ? (asset.resource as Prop) : { shape: 'box' as const, colour: '#888888' };
    const tile = addShape(app.root, look.shape, material(look.colour), [Math.cos(a) * 4, 0.7, Math.sin(a) * 4], 1.2, spec.name);
    if (spec.type === 'text') tile.setLocalScale(1.2, 0.3, 1.2);
    tiles.set(asset, tile);
  });

  const second = [...tiles.keys()][2]!;
  const QUERIES: Record<string, () => pc.Asset[]> = {
    [`get(${second.id})`]: () => [registry.get(second.id)!],
    "find('crate')": () => [registry.find('crate')!],
    "find('crate', 'text')": () => [registry.find('crate', 'text')!],
    "findAll('crate')": () => registry.findAll('crate'),
    "findByTag('level-1')": () => registry.findByTag('level-1'),
    "findByTag(['level-1', 'enemy'])": () => registry.findByTag(['level-1', 'enemy']),
    "findByTag('level-1', 'level-2')": () => registry.findByTag('level-1', 'level-2'),
    "filter(a => a.resource.shape === 'sphere')": () => registry.filter((a) => (a.resource as Prop | undefined)?.shape === 'sphere'),
    'list({ preload: true })': () => registry.list({ preload: true }),
  };

  let hits = new Set<pc.Asset>();
  const show = (key: string): string => {
    hits = new Set(QUERIES[key]!());
    return `${key} -> ${[...hits].map((a) => `${a.name}#${a.id}`).join(', ') || 'nothing'}`;
  };
  // Matches rise and glow; the rest shrink back.
  app.on('update', (dt: number) => {
    const k = 1 - Math.exp(-8 * dt);
    for (const [asset, tile] of tiles) {
      const on = hits.has(asset);
      const p = tile.getLocalPosition();
      tile.setLocalPosition(p.x, pc.math.lerp(p.y, on ? 1.4 : 0.5, k), p.z);
      const s = pc.math.lerp(tile.getLocalScale().x, on ? 1.5 : 0.8, k);
      tile.setLocalScale(s, tile.getLocalScale().y, s);
      const mat = tile.render!.meshInstances[0]!.material as pc.StandardMaterial;
      mat.emissive = on ? new pc.Color(0.35, 0.35, 0.3) : pc.Color.BLACK.clone();
      mat.update();
    }
  });

  const keys = Object.keys(QUERIES);
  if (ctx.preview) {
    let t = 0;
    let i = 0;
    show(keys[0]!);
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 1.5) {
        t = 0;
        show(keys[++i % keys.length]!);
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    out.textContent = show(keys[0]!);
    panel.select('query', keys, keys[0]!, (v) => (out.textContent = show(v)));
  }
  return () => scene.dispose();
};

export default mount;
