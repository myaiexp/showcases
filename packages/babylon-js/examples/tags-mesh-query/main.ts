// Tags.AddTagsTo and scene.getMeshesByTags with boolean queries
import { ArcRotateCamera, Color3, Color4, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Tags, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const QUERIES = [
  'red',
  'sphere && red',
  'box || cone',
  'big && !box',
  '(red || green) && !small',
  '!(sphere || box)',
] as const;

const COLOURS: Record<string, Color3> = { red: new Color3(0.9, 0.2, 0.2), green: new Color3(0.2, 0.75, 0.3), blue: new Color3(0.25, 0.45, 0.95) };
const SHAPES = ['sphere', 'box', 'cone'] as const;

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 11, new Vector3(0, 0, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);

  // 3 colours x 3 shapes, each with one size tag: a different tag string per mesh.
  const all: Mesh[] = [];
  let n = 0;
  for (const [ci, colour] of Object.keys(COLOURS).entries()) {
    for (const [si, shape] of SHAPES.entries()) {
      const small = (ci + si) % 2 === 0;
      const options = { size: small ? 0.8 : 1.3, diameter: small ? 0.8 : 1.3, height: small ? 0.9 : 1.4, diameterBottom: small ? 0.8 : 1.3, diameterTop: 0 };
      const mesh =
        shape === 'sphere' ? MeshBuilder.CreateSphere(`m${n}`, options, scene) : shape === 'box' ? MeshBuilder.CreateBox(`m${n}`, options, scene) : MeshBuilder.CreateCylinder(`m${n}`, options, scene);
      mesh.position.set((si - 1) * 2.6, 0, (ci - 1) * 2.6);
      const material = new StandardMaterial(`${mesh.name}-mat`, scene);
      material.diffuseColor = COLOURS[colour]!;
      mesh.material = material;
      // Tags are a space-separated string; AddTagsTo enables tags for the object if needed.
      Tags.AddTagsTo(mesh, `${colour} ${shape} ${small ? 'small' : 'big'}`);
      all.push(mesh);
      n++;
    }
  }

  const caption = document.createElement('div');
  let matches = 0;
  /** Runs a tags query on the scene and outlines the meshes it returns. */
  const select = (query: string): void => {
    const found = scene.getMeshesByTags(query) as Mesh[];
    matches = found.length;
    for (const m of all) {
      const on = found.includes(m);
      m.renderOutline = on;
      m.outlineColor = new Color3(1, 0.9, 0.3);
      m.outlineWidth = 0.06;
      m.visibility = on ? 1 : 0.28;
    }
    caption.textContent = `getMeshesByTags("${query}") -> ${matches} meshes`;
  };

  // The same Tags class works on any JavaScript object, not only Babylon ones.
  const plain = {};
  Tags.EnableFor(plain);
  (plain as { addTags(t: string): void }).addTags('draft important');
  const plainReport = `plain object: hasTags=${(plain as { hasTags(): boolean }).hasTags()}, "important && !archived" -> ${(plain as { matchesTagsQuery(q: string): boolean }).matchesTagsQuery('important && !archived')}`;

  let timer = 0;
  if (ctx.preview) {
    Object.assign(caption.style, { position: 'absolute', left: '6px', bottom: '6px', padding: '2px 8px', fontSize: '11px', background: 'rgba(8,9,14,0.8)', color: 'var(--green)', borderRadius: '4px', pointerEvents: 'none' });
    wrap.append(caption);
    let i = 0;
    select(QUERIES[0]);
    timer = window.setInterval(() => select(QUERIES[++i % QUERIES.length]!), 1600);
    stage.run(() => (camera.alpha += 0.004));
  } else {
    const panel = createPanel(el);
    const input = document.createElement('input');
    Object.assign(input, { type: 'text', value: QUERIES[1], spellcheck: false });
    Object.assign(input.style, { flex: '1 1 18em', background: 'var(--bg)', color: 'var(--fg-1)', border: '1px solid var(--border, #333)', padding: '4px 8px', fontFamily: 'monospace' });
    input.addEventListener('input', () => select(input.value));
    panel.row();
    panel.el.lastElementChild?.append(input);
    panel.select('presets', QUERIES, QUERIES[1], (v) => {
      input.value = v;
      select(v);
    });
    panel.row();
    panel.el.lastElementChild?.append(caption);
    Object.assign(caption.style, { color: 'var(--fg-1)' });
    panel.readout(plainReport);
    select(input.value);
    stage.run();
  }

  return () => {
    window.clearInterval(timer);
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
