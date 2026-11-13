// Drop or pick a local splat file, load it, frame it with getBoundingBox
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox, controlBar, overlay, readout } from '../../shared/controls.ts';
import { pushButterfly } from '../../shared/subjects.ts';
import { formatBytes } from '../../shared/bytes.ts';

const FORMATS = '.ply, .spz, .splat, .ksplat, .sog';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.5, 3], orbit: 0.25 });
  const caption = overlay(el, ctx.preview ? 'drop a splat file' : `drop a file here (${FORMATS})`);
  caption.style.fontSize = ctx.preview ? '13px' : '12px';

  // The stand-in shown until a file arrives.
  let mesh = new SplatMesh({ constructSplats: (s) => pushButterfly(s, ctx.preview ? 9000 : 16000) });
  stage.scene.add(mesh);
  stage.run((t) => {
    if (mesh.userData.standIn) mesh.rotation.y = Math.sin(t * 0.6) * 0.4;
  });
  mesh.userData.standIn = true;
  if (ctx.preview) return () => stage.dispose();

  const bar = controlBar(el);
  const info = readout(el, 'Nothing loaded yet. The file stays in your browser; nothing is uploaded.');
  let flip = false;
  let useStream = false;
  let run = 0;

  /** Scale and move the mesh so its bounding box fits the camera's view of the origin. */
  const frame = (m: SplatMesh): THREE.Box3 => {
    const box = m.getBoundingBox();
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const s = 2 / Math.max(size.x, size.y, size.z, 1e-6);
    m.scale.setScalar(s);
    // The flip happens about the mesh origin, so rotate the centre the same way before offsetting.
    m.position.copy(centre).applyQuaternion(m.quaternion).multiplyScalar(-s);
    return box;
  };

  const orient = (m: SplatMesh): void => {
    if (flip) m.quaternion.set(1, 0, 0, 0);
    else m.quaternion.identity();
  };

  const load = async (file: File): Promise<void> => {
    const mine = ++run;
    info.textContent = `loading ${file.name} (${formatBytes(file.size)})…`;
    // fileName lets Spark use the extension for .splat and .ksplat, which can't be sniffed.
    const next = useStream
      ? new SplatMesh({ stream: file.stream(), streamLength: file.size, fileName: file.name })
      : new SplatMesh({ fileBytes: new Uint8Array(await file.arrayBuffer()), fileName: file.name });
    try {
      await next.initialized;
    } catch (err) {
      next.dispose();
      if (mine === run) info.textContent = `${file.name}: could not decode (${err instanceof Error ? err.message : String(err)})`;
      return;
    }
    if (mine !== run) return next.dispose();
    stage.scene.remove(mesh);
    mesh.dispose();
    mesh = next;
    orient(next);
    const box = frame(next);
    stage.scene.add(next);
    const size = box.getSize(new THREE.Vector3());
    caption.textContent = file.name;
    info.textContent = `${file.name}: ${formatBytes(file.size)}, ${next.numSplats} splats, bounding box ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`;
  };

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = FORMATS;
  input.style.display = 'none';
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) void load(f);
    input.value = '';
  });
  button(bar, 'Choose file…', () => input.click());
  checkbox(bar, 'stream instead of fileBytes', false, (v) => (useStream = v));
  checkbox(bar, 'flip (OpenCV axes)', false, (v) => {
    flip = v;
    if (mesh.userData.standIn) return;
    orient(mesh);
    frame(mesh);
  });
  bar.append(input);

  const ac = new AbortController();
  const stageBox = el;
  const over = (on: boolean): void => {
    stage.canvas.style.outline = on ? '2px dashed #8aa4ff' : 'none';
    stage.canvas.style.outlineOffset = '-4px';
  };
  stageBox.addEventListener('dragover', (e) => (e.preventDefault(), over(true)), { signal: ac.signal });
  stageBox.addEventListener('dragleave', () => over(false), { signal: ac.signal });
  stageBox.addEventListener(
    'drop',
    (e) => {
      e.preventDefault();
      over(false);
      const f = e.dataTransfer?.files[0];
      if (f) void load(f);
    },
    { signal: ac.signal },
  );

  return () => {
    run++;
    ac.abort();
    stage.dispose();
  };
};

export default mount;
