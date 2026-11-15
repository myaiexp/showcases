// A world ray from the pointer, tested against Renderer.bounds
import { type MeshRenderer, PrimitiveMesh, Ray, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, lin, pbr, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 8], hint: 'Hover the shapes: the ray is tested against Renderer.bounds.' });
  const say = caption(stage);
  floor(root, engine, -1);
  const meshes = [PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2), PrimitiveMesh.createSphere(engine, 0.7), PrimitiveMesh.createCone(engine, 0.7, 1.4), PrimitiveMesh.createTorus(engine, 0.6, 0.25)];
  const items = meshes.map((m, i) => {
    const material = pbr(engine, [0.4, 0.55, 0.9], 0, 0.5);
    return { renderer: add(root, m, material, [(i - 1.5) * 2.2, 0, 0]).renderer as MeshRenderer, material };
  });
  const dot = document.createElement('div');
  dot.style.cssText = 'position:absolute;width:14px;height:14px;margin:-7px;border:2px solid #f4a259;border-radius:50%;pointer-events:none';
  const host = stage.canvas.parentElement!;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.append(dot);
  stage.own(() => dot.remove());
  const canvas = stage.canvas;
  let pointer: [number, number] | null = null;
  const onMove = (e: PointerEvent): void => {
    const r = canvas.getBoundingClientRect();
    pointer = [e.clientX - r.left, e.clientY - r.top];
  };
  if (!stage.preview) {
    canvas.addEventListener('pointermove', onMove);
    stage.own(() => canvas.removeEventListener('pointermove', onMove));
  }
  const ray = new Ray();
  const at = new Vector2();
  tick(root, (_dt, t) => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const css = pointer ?? [w * (0.5 + 0.38 * Math.sin(t * 0.7)), h * (0.55 + 0.1 * Math.sin(t * 1.9))];
    dot.style.left = `${css[0]! + canvas.offsetLeft}px`;
    dot.style.top = `${css[1]! + canvas.offsetTop}px`;
    at.set((css[0]! * canvas.width) / w, (css[1]! * canvas.height) / h);
    camera.screenPointToRay(at, ray);
    let best = -1;
    let bestDistance = Infinity;
    items.forEach((it, i) => {
      const d = ray.intersectBox(it.renderer.bounds);
      if (d >= 0 && d < bestDistance) [best, bestDistance] = [i, d];
    });
    items.forEach((it, i) => {
      if (i === best) it.material.baseColor.set(...lin([0.98, 0.7, 0.2]), 1);
      else it.material.baseColor.set(...lin([0.4, 0.55, 0.9]), 1);
      it.renderer.entity.transform.setScale(i === best ? 1.15 : 1, i === best ? 1.15 : 1, i === best ? 1.15 : 1);
    });
    say(best < 0 ? 'ray hits nothing' : `ray hits item ${best} at distance ${bestDistance.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
