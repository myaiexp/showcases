// OBJExport and STLExport producing text shown on the page
import { ArcRotateCamera, Color4, HemisphericLight, Vector3 } from '@babylonjs/core';
import { OBJExport, STLExport } from '@babylonjs/serializers';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildSampleModel } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['OBJ', 'MTL (material of the body)', 'STL ascii', 'STL binary (hex dump)'] as const;
const PARTS = ['whole totem', 'head', 'hat'] as const;

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 8, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  const { meshes } = buildSampleModel(scene);

  const pre = document.createElement('pre');
  const state = { format: FORMATS[0] as (typeof FORMATS)[number], part: PARTS[0] as (typeof PARTS)[number], materials: true, global: true, individual: false };

  /** Runs the exporter chosen in the panel and returns its text. */
  function exportText(): string {
    const chosen = state.part === 'whole totem' ? Object.values(meshes) : [meshes[state.part]];
    switch (state.format) {
      case 'OBJ':
        // materials adds usemtl lines, the name points at the .mtl file, global bakes world positions.
        return OBJExport.OBJ(chosen, state.materials, 'totem.mtl', state.global);
      case 'MTL (material of the body)':
        return OBJExport.MTL(meshes.body, 'body-material');
      case 'STL ascii':
        return STLExport.CreateSTL(chosen, false, 'totem', false, true, false, false, state.individual) as string;
      default: {
        const view = STLExport.CreateSTL(chosen, false, 'totem', true) as DataView;
        const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
        const rows: string[] = [`${bytes.length} bytes: 80 byte header, triangle count, then 50 bytes per triangle`];
        for (let i = 0; i < Math.min(bytes.length, 320); i += 16) {
          rows.push(`${i.toString(16).padStart(4, '0')}  ${Array.from(bytes.slice(i, i + 16), (b) => b.toString(16).padStart(2, '0')).join(' ')}`);
        }
        return rows.join('\n');
      }
    }
  }

  let timer = 0;
  if (ctx.preview) {
    // The exported text types itself out beside the model.
    Object.assign(pre.style, { position: 'absolute', top: '0', right: '0', width: '52%', height: '100%', margin: '0', padding: '6px', boxSizing: 'border-box', overflow: 'hidden', fontSize: '10px', lineHeight: '1.25', color: 'var(--green)', background: 'rgba(8,9,14,0.75)', pointerEvents: 'none' });
    wrap.append(pre);
    const lines = OBJExport.OBJ(Object.values(meshes), true, 'totem.mtl', true).split('\n');
    let n = 0;
    timer = window.setInterval(() => {
      n = (n + 1) % (lines.length + 12);
      pre.textContent = lines.slice(Math.max(0, n - 14), n).join('\n');
    }, 90);
  } else {
    const panel = createPanel(el);
    const readout = panel.readout();
    Object.assign(pre.style, { width: '100%', margin: '0', padding: 'var(--space-2) var(--space-3)', boxSizing: 'border-box', background: 'var(--bg-surface)', color: 'var(--fg-2)', fontSize: '0.75rem', height: '14em', overflow: 'auto' });
    const refresh = (): void => {
      const text = exportText();
      const lines = text.split('\n');
      pre.textContent = lines.slice(0, 120).join('\n') + (lines.length > 120 ? `\n... ${lines.length - 120} more lines` : '');
      readout.textContent = `${state.format}: ${text.length} characters, ${lines.length} lines`;
    };
    panel.row();
    panel.select('Exporter', FORMATS, state.format, (v) => ((state.format = v), refresh()));
    panel.select('Meshes', PARTS, state.part, (v) => ((state.part = v), refresh()));
    panel.row();
    panel.check('OBJ materials', state.materials, (on) => ((state.materials = on), refresh()));
    panel.check('OBJ globalposition', state.global, (on) => ((state.global = on), refresh()));
    panel.check('STL exportIndividualMeshes', state.individual, (on) => ((state.individual = on), refresh()));
    el.append(pre);
    refresh();
  }
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  return () => {
    window.clearInterval(timer);
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
