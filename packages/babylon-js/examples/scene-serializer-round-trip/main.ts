// SceneSerializer to .babylon JSON, appended back from a File
import { AppendSceneAsync, ArcRotateCamera, Color4, HemisphericLight, SceneSerializer, Vector3 } from '@babylonjs/core';
import type { Node } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildSampleModel } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const WHAT = ['whole scene', 'mesh: head', 'mesh: hat', 'mesh: body'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 11, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);

  const model = buildSampleModel(scene);
  const copies: Node[][] = [];
  let disposed = false;
  let readout: HTMLElement | undefined;
  let preview: HTMLElement | undefined;

  async function roundTrip(what: (typeof WHAT)[number]): Promise<void> {
    // Serialize returns a plain object; JSON.stringify makes the .babylon file's text.
    const serialized =
      what === 'whole scene' ? SceneSerializer.Serialize(scene) : SceneSerializer.SerializeMesh(model.meshes[what.slice(6) as keyof typeof model.meshes]);
    const json = JSON.stringify(serialized);
    const before = new Set<Node>(scene.rootNodes);
    // A File named *.babylon is routed to the built-in .babylon loader.
    await AppendSceneAsync(new File([json], 'saved.babylon'), scene);
    if (disposed) return;
    const added = scene.rootNodes.filter((n) => !before.has(n));
    copies.push(added);
    const x = 2.6 * copies.length;
    for (const node of added) if ('position' in node) (node as Node & { position: Vector3 }).position.x += x;
    if (readout) readout.textContent = `${what}: ${(json.length / 1024).toFixed(1)} KB of JSON, ${added.length} new root nodes, ${scene.meshes.length} meshes in the scene`;
    if (preview) preview.textContent = json.slice(0, 420) + ' ...';
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout('Serialize something and append the result next to the original.');
    panel.row();
    let what: (typeof WHAT)[number] = 'whole scene';
    panel.select('Serialize', WHAT, what, (v) => (what = v));
    panel.button('Serialize and load back', () => void roundTrip(what));
    preview = document.createElement('pre');
    Object.assign(preview.style, { width: '100%', margin: '0', padding: 'var(--space-2) var(--space-3)', boxSizing: 'border-box', background: 'var(--bg-surface)', color: 'var(--fg-3)', fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', height: '6.5em', overflow: 'hidden' });
    panel.el.append(preview);
  }
  void roundTrip('whole scene');
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
