// Penrose playground: cards cycle layouts; full view adds a trio editor
import type { PenroseState } from '@penrose/core';
import { createLayout, energyText, stageLine, type Layout, type LayoutHooks, type Trio } from './layout.ts';
import type { Stage } from './stage.ts';

export type Program = 'domain' | 'substance' | 'style';

/** One tab: a label plus whichever programs differ from the playground's own. */
export interface Variant extends Partial<Trio> {
  label: string;
}

export interface PlaygroundOptions extends Trio, LayoutHooks {
  /** Tabs that swap in other programs. Without them a card cycles variations instead. */
  variants?: readonly Variant[];
  /** The program the editor opens on. Default 'style'. */
  focus?: Program;
  /** Milliseconds a card shows a converged layout before the next one. Default 2600. */
  hold?: number;
  /**
   * The variations a card cycles through, first to last, then again. The first one is the
   * full view's opening layout too. Default: `variation` and three numbered after it.
   */
  variations?: readonly string[];
}

const PROGRAMS: readonly Program[] = ['substance', 'style', 'domain'];

/** The variations a card cycles, as playground() picks them. */
export function cardVariations(opts: Pick<PlaygroundOptions, 'variation' | 'variations'>): string[] {
  if (opts.variations?.length) return [...opts.variations];
  const base = opts.variation ?? 'showcase';
  return [base, `${base}-1`, `${base}-2`, `${base}-3`];
}

export const trioOf = (opts: PlaygroundOptions, v?: Variant): Trio => ({
  domain: v?.domain ?? opts.domain,
  substance: v?.substance ?? opts.substance,
  style: v?.style ?? opts.style,
  variation: v?.variation ?? cardVariations(opts)[0],
  excludeWarnings: v?.excludeWarnings ?? opts.excludeWarnings,
});

/** Lays out the trio (or its variants) and returns the live layout. */
export function playground(stage: Stage, opts: PlaygroundOptions): Layout {
  const variants = opts.variants ?? [];
  const hold = opts.hold ?? 2600;
  let onDone: ((state: PenroseState) => void) | null = null;
  let readout: HTMLElement | null = null;
  let steps = 0;

  const layout = createLayout(stage, {
    ...opts,
    onStep(state, info, svg) {
      steps = info.iterations;
      if (readout && (info.done || info.slices % 8 === 0)) readout.textContent = describe(state, info.done);
      opts.onStep?.(state, info, svg);
    },
    onDone(state, svg) {
      opts.onDone?.(state, svg);
      onDone?.(state);
    },
  });

  const describe = (state: PenroseState, done: boolean): string =>
    [
      `variation "${layout.variation}"`,
      stageLine(state),
      `${steps} iterations`,
      energyText(state),
      done ? '✓ converged' : 'solving…',
    ]
      .filter(Boolean)
      .join(' · ');

  if (stage.preview) {
    // A card: solve, hold, then the next variant or the next variation, forever.
    let turn = 0;
    const seeds = cardVariations(opts);
    onDone = () => {
      stage.after(hold, () => {
        turn++;
        if (variants.length > 1) {
          const v = variants[turn % variants.length]!;
          stage.say(v.label);
          void layout.run(trioOf(opts, v));
        } else void layout.resample(seeds[turn % seeds.length]);
      });
    };
    const first = variants[0];
    if (first && variants.length > 1) stage.say(first.label);
    void layout.run(trioOf(opts, first));
    return layout;
  }

  // Full view: variant tabs, resample and replay, an editor over the three programs.
  const panel = stage.side('Trio (edit me)');
  const progTabs = document.createElement('div');
  progTabs.className = 'pr-tabs';
  const editor = document.createElement('textarea');
  editor.className = 'pr-editor';
  editor.spellcheck = false;
  readout = document.createElement('div');
  readout.className = 'pr-readout';
  panel?.append(progTabs, editor);
  stage.root.after(readout);

  let source: Trio = trioOf(opts, variants[0]);
  let program: Program = opts.focus ?? 'style';
  const progButtons = new Map<Program, HTMLButtonElement>();
  const showProgram = (p: Program): void => {
    program = p;
    editor.value = source[p];
    editor.setAttribute('aria-label', `${p} program`);
    for (const [name, b] of progButtons) b.classList.toggle('pr-on', name === p);
  };
  for (const p of PROGRAMS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `.${p}`;
    b.addEventListener('click', () => showProgram(p), { signal: stage.signal });
    progTabs.append(b);
    progButtons.set(p, b);
  }

  const start = (trio: Trio, label?: string): void => {
    stage.say(label ?? '');
    void layout.run(trio);
  };

  const tabs: HTMLButtonElement[] = [];
  if (variants.length > 1) {
    for (const v of variants) {
      const tab = stage.button(v.label, () => {
        source = trioOf(opts, v);
        showProgram(program);
        for (const t of tabs) t.classList.toggle('pr-on', t === tab);
        start(source, v.label);
      });
      if (tab) tabs.push(tab);
    }
    tabs[0]?.classList.add('pr-on');
  }
  stage.button('Resample', () => void layout.resample());
  stage.button('Replay solve', () => void layout.replay());

  let typing = 0;
  editor.addEventListener(
    'input',
    () => {
      source = { ...source, [program]: editor.value };
      clearTimeout(typing);
      typing = window.setTimeout(() => start(source), 450);
    },
    { signal: stage.signal },
  );
  stage.onDispose(() => clearTimeout(typing));

  showProgram(program);
  start(source, variants[0]?.label);
  return layout;
}
