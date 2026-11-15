// Three ways to read positions from a running layout, and what each costs
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { plainView } from '../../shared/plain-view.ts';
import { scatter, randomLinks } from '../../shared/data.ts';

type Mode = 'texture' | 'async' | 'sync';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout steps on every frame; the read mode decides how positions reach the page.' });
  const view = plainView(stage);
  const rb = rebuilder(stage);
  const side = stage.side();
  let mode: Mode = 'async';
  let count = stage.preview ? 2000 : 10000;
  let out = new Float32Array(count * 2);
  let latest: Float32Array | undefined;
  let pending = false;
  let callMs = 0; // main-thread time spent inside the read call, smoothed
  let lagMs = 0; // from the async call to its result, smoothed
  let version = 0;
  let size = 0;
  let reads = 0;

  const build = (): void => {
    out = new Float32Array(count * 2);
    latest = undefined;
    pending = false;
    const graph = rb.adopt(new Graph(null, { simulationDecay: 100000, simulationRepulsion: 0.4 }, rb.device));
    graph.setPointPositions(scatter(count, 600, 3));
    graph.setLinks(randomLinks(count, count, 3));
    graph.render(1);
  };
  build();

  let raf = 0;
  const frame = (): void => {
    raf = requestAnimationFrame(frame);
    const graph = rb.current;
    if (!graph?.isReady) return;
    graph.step();
    const t0 = performance.now();
    if (mode === 'texture') {
      // No copy at all: a handle to the live GPU texture. `version` says when it changed.
      const tex = graph.getPointPositionTexture();
      if (tex) ({ version, textureSize: size } = tex);
      callMs += (performance.now() - t0 - callMs) * 0.1;
    } else if (mode === 'sync') {
      latest = graph.getPointPositionsArray(out); // blocks until the GPU has finished
      callMs += (performance.now() - t0 - callMs) * 0.1;
      reads++;
    } else if (!pending) {
      pending = true;
      const p = graph.getPointPositionsAsync(out); // returns at once, resolves when the copy lands
      callMs += (performance.now() - t0 - callMs) * 0.1;
      p.then((a) => {
        pending = false;
        latest = a;
        reads++;
        lagMs += (performance.now() - t0 - lagMs) * 0.2;
      }, () => (pending = false));
    }
  };
  raf = requestAnimationFrame(frame);
  stage.onDispose(() => cancelAnimationFrame(raf));

  const names: Record<Mode, string> = {
    texture: 'getPointPositionTexture()',
    async: 'getPointPositionsAsync(out)',
    sync: 'getPointPositionsArray(out)',
  };
  stage.every(150, () => {
    if (latest?.length) view.draw(latest, { radius: 1.5 });
    const extra = mode === 'texture' ? `texture ${size}×${size}, version ${version}: nothing is copied, so nothing to draw here` : mode === 'async' ? `result arrives about ${lagMs.toFixed(1)} ms after the call` : 'the page waits for the GPU on every call';
    stage.say(`${names[mode]}: ${callMs.toFixed(2)} ms blocked per call. ${extra}`, mode === 'sync' && callMs > 8 ? 'warn' : 'info');
    if (side) side.textContent = `${count} points\nreads: ${reads}\ncall: ${callMs.toFixed(2)} ms\nlag: ${lagMs.toFixed(1)} ms`;
  });
  stage.select<Mode>(
    'Read with',
    [
      { value: 'texture', label: 'getPointPositionTexture' },
      { value: 'async', label: 'getPointPositionsAsync' },
      { value: 'sync', label: 'getPointPositionsArray' },
    ],
    mode,
    (v) => (mode = v),
  );
  stage.select<string>(
    'Points',
    [2000, 10000, 50000].map((n) => ({ value: String(n), label: n.toLocaleString() })),
    String(count),
    (v) => {
      count = Number(v);
      build();
    },
  );
  stage.cycle([{ run: () => (mode = 'texture') }, { run: () => (mode = 'async') }, { run: () => (mode = 'sync') }], 2800);
  return () => stage.dispose();
};

export default mount;
