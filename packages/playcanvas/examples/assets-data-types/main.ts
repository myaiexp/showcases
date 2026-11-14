// json, binary, text, css, html and shader assets loaded from blob URLs
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { BlobUrls } from '../../shared/assets.ts';

const CONFIG = { count: 9, radius: 3, colours: ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'] };

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, orbit: { distance: 13, pitch: -30 } });
  const { app } = scene;
  const registry = app.assets;
  const urls = new BlobUrls();
  let disposed = false;

  // Float32 heights as raw bytes, for the binary asset.
  const heights = new Float32Array(14).map((_, i) => 0.6 + 1.6 * Math.abs(Math.sin(i * 0.7)));
  const FILES: { type: string; filename: string; body: BlobPart }[] = [
    { type: 'json', filename: 'config.json', body: JSON.stringify(CONFIG) },
    { type: 'binary', filename: 'heights.bin', body: heights.buffer },
    { type: 'text', filename: 'notes.txt', body: 'Plain text keeps its line breaks.\nSecond line.' },
    { type: 'css', filename: 'theme.css', body: '.badge { color: #e8794a; padding: 2px 6px; }' },
    { type: 'html', filename: 'card.html', body: '<section><h2>Title</h2><p>Markup stays a string.</p></section>' },
    { type: 'shader', filename: 'tint.glsl', body: 'void main() {\n  gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);\n}' },
  ];

  const loaded = new Map<string, pc.Asset>();
  await Promise.all(
    FILES.map(
      (f) =>
        new Promise<void>((resolve) => {
          const asset = new pc.Asset(f.filename, f.type, { url: urls.from(f.body), filename: f.filename });
          asset.once('load', () => {
            loaded.set(f.type, asset);
            resolve();
          });
          asset.once('error', () => resolve());
          registry.add(asset);
          registry.load(asset);
        }),
    ),
  );
  if (disposed) return () => scene.dispose();

  // The json resource is the parsed object: it decides how many spheres and what colours.
  const cfg = loaded.get('json')?.resource as typeof CONFIG | undefined;
  const ring: pc.Entity[] = [];
  if (cfg) {
    for (let i = 0; i < cfg.count; i++) {
      const a = (i / cfg.count) * Math.PI * 2;
      ring.push(addShape(app.root, 'sphere', material(cfg.colours[i % cfg.colours.length]!), [Math.cos(a) * cfg.radius - 3.5, 0.7, Math.sin(a) * cfg.radius], 1, `json ${i}`));
    }
  }
  // The binary resource is an ArrayBuffer: view it as floats for bar heights.
  const buf = loaded.get('binary')?.resource as ArrayBuffer | undefined;
  const bars: pc.Entity[] = [];
  if (buf) {
    new Float32Array(buf).forEach((h, i, all) => {
      bars.push(addShape(app.root, 'box', material('#4ab3e8'), [3.5 + (i - all.length / 2) * 0.4, h / 2, -0.5], [0.3, h, 0.3], `bin ${i}`));
    });
  }

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    ring.forEach((s, i) => {
      const p = s.getLocalPosition();
      s.setLocalPosition(p.x, 0.7 + Math.abs(Math.sin(t * 2 + i * 0.7)) * 0.5, p.z);
    });
    bars.forEach((b, i) => b.setLocalEulerAngles(0, Math.sin(t + i * 0.3) * 25, 0));
  });

  if (!ctx.preview) {
    const table = document.createElement('pre');
    Object.assign(table.style, {
      margin: '0',
      width: '100%',
      boxSizing: 'border-box',
      padding: 'var(--space-2) var(--space-3)',
      background: 'var(--bg)',
      color: 'var(--fg-2)',
      fontSize: '0.78rem',
      lineHeight: '1.35',
      overflow: 'auto',
    });
    table.textContent = FILES.map((f) => {
      const r = loaded.get(f.type)?.resource;
      const kind = r instanceof ArrayBuffer ? `ArrayBuffer(${r.byteLength} bytes)` : typeof r === 'string' ? `string ${JSON.stringify(r.length > 44 ? `${r.slice(0, 44)}...` : r)}` : `${typeof r} ${JSON.stringify(r).slice(0, 44)}...`;
      return `${f.type.padEnd(7)} ${f.filename.padEnd(12)} resource: ${kind}`;
    }).join('\n');
    el.append(table);
  }
  return () => {
    disposed = true;
    urls.dispose();
    scene.dispose();
  };
};

export default mount;
