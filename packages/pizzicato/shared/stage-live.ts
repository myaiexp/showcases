// Live runner: plays the spec on the page's context with Play/Stop and a scope
import Pizzicato from 'pizzicato';
import type { Cleanup } from '@/types.ts';
import { releaseAll, stopAll } from './dispose.ts';
import { idle } from './render.ts';
import { scope } from './scope.ts';
import type { PzSpec, StageParts } from './stage.ts';

export async function runLive<G>(parts: StageParts, spec: PzSpec<G>): Promise<Cleanup> {
  const { opts, signal, visual, scopeBox, root } = parts;
  // A card render may still hold Pizzicato's context; anything built now would land in it.
  await idle();
  if (signal.aborted) return () => undefined;
  const g = await spec.build();
  if (signal.aborted) {
    (spec.dispose ?? releaseAll)(g);
    return () => undefined;
  }
  if (visual.childElementCount === 0) visual.style.display = 'none';

  // The scope listens to Pizzicato's master gain, where every attached sound and group ends.
  const ctx = Pizzicato.context;
  const master = Pizzicato.masterGainNode;
  const splitter = ctx.createChannelSplitter(2);
  const analysers = Array.from({ length: opts.channels }, () => {
    const a = ctx.createAnalyser();
    a.fftSize = 1024;
    return a;
  });
  master.connect(splitter);
  analysers.forEach((a, i) => splitter.connect(a, i));
  const buffers = analysers.map((a) => new Float32Array(a.fftSize));
  const windows = (): Float32Array[] => {
    analysers.forEach((a, i) => a.getFloatTimeDomainData(buffers[i]!));
    return buffers;
  };
  const sc = scope(scopeBox);
  parts.setSamples(() => buffers[0]!);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;width:100%';
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'btn btn-primary';
  play.style.minWidth = '96px';
  const hint = document.createElement('span');
  hint.style.cssText = 'font-size:12px;color:var(--fg-3)';
  row.append(play, hint);
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;width:100%';
  root.append(row, bar);
  spec.controls?.(g, bar);
  if (bar.childElementCount === 0) bar.remove();

  let playing = false;
  let passStart = 0;
  let repeat = 0;
  let stopFn: (() => void) | null = null;
  const timers = new Set<number>();
  const at = (seconds: number, fn: () => void): void => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (playing) fn();
    }, Math.max(0, seconds * 1000));
    timers.add(id);
  };
  const label = (): void => {
    play.textContent = playing ? '■ Stop' : `▶ ${opts.playLabel}`;
    hint.textContent = playing ? '' : 'Sound starts when you press Play.';
  };

  const pass = (): void => {
    passStart = performance.now();
    const r = spec.play(g, at);
    if (typeof r === 'function') stopFn = r;
  };
  const start = async (): Promise<void> => {
    // The context starts suspended until a click allows sound; this is that click.
    await Pizzicato.context.resume();
    if (signal.aborted || playing) return;
    playing = true;
    label();
    pass();
    if (!stopFn) repeat = window.setInterval(pass, opts.seconds * 1000);
  };
  const stop = (): void => {
    if (!playing) return;
    playing = false;
    clearInterval(repeat);
    for (const id of timers) clearTimeout(id);
    timers.clear();
    if (stopFn) stopFn();
    else (spec.stop ?? stopAll)(g);
    stopFn = null;
    label();
  };
  play.addEventListener('click', () => void (playing ? stop() : start()));
  label();

  let raf = 0;
  const tick = (): void => {
    raf = requestAnimationFrame(tick);
    sc.draw(windows());
    if (playing) spec.frame?.((performance.now() - passStart) / 1000);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    stop();
    cancelAnimationFrame(raf);
    (spec.dispose ?? releaseAll)(g);
    master.disconnect(splitter);
    splitter.disconnect();
    // Pizzicato.volume is page-wide: an example that turned it down leaves it at 1.
    Pizzicato.volume = 1;
    sc.dispose();
  };
}
