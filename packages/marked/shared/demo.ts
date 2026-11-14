// Ready-made layouts: Markdown rendered once, or by two setups side by side
import { docPane, htmlPane, note, row, sourcePane, type DocPane } from './panes.ts';
import { typeLoop, type Sample } from './typing.ts';
import { select } from './controls.ts';
import type { Stage } from './stage.ts';

export type { Sample };

export interface LiveOptions {
  /** Markdown to show. Cards type each in turn; the full view offers a picker when several. */
  samples: readonly Sample[];
  /** The example's Marked call: Markdown in, HTML out. */
  render: (markdown: string) => string;
  /** Label over the rendered pane. */
  output?: string;
  /** One sentence for the full view: what to look at. */
  caption?: string;
  /** Show the HTML string under the panes in the full view (default true). */
  html?: boolean;
  /** Runs after each render with the pane, for examples that wire up the rendered page. */
  after?: (doc: DocPane, markdown: string) => void;
}

export interface Live {
  /** Renders the current source again (after a control changed the setup). */
  refresh(): void;
  doc: DocPane;
}

/** Markdown on the left, what readers see on the right. Cards type the samples in a loop. */
export function liveDemo(stage: Stage, opts: LiveOptions): Live {
  const first = opts.samples[0]!;
  const src = sourcePane(stage, stage.preview ? '' : first.text);
  const doc = docPane(stage, opts.output);
  const html = opts.html !== false && !stage.preview ? htmlPane(stage) : null;
  row(stage.root, src.el, doc.el);
  if (html) stage.root.append(html.el);
  if (opts.caption && !stage.preview) note(stage.root, opts.caption);

  const draw = (md: string): void => {
    const out = opts.render(md);
    doc.show(out);
    html?.show(out);
    opts.after?.(doc, md);
  };

  if (stage.preview) {
    typeLoop(stage, opts.samples, (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    if (opts.samples.length > 1 && stage.bar) {
      select(stage.bar, 'Sample', opts.samples.map((s) => s.label ?? ''), (label) => {
        const s = opts.samples.find((x) => x.label === label)!;
        src.set(s.text);
        draw(s.text);
      });
    }
    draw(first.text);
  }
  return { refresh: () => draw(src.value()), doc };
}

export interface Side {
  label: string;
  render: (markdown: string) => string;
}

export interface CompareOptions {
  samples: readonly Sample[];
  /** Two (or three) setups rendering the same Markdown. */
  sides: readonly Side[];
  caption?: string;
  /** Show each side's HTML string in the full view (default true). */
  html?: boolean;
}

/** One Markdown source over two rendered outputs, so the difference between setups shows. */
export function compareDemo(stage: Stage, opts: CompareOptions): { refresh(): void } {
  const first = opts.samples[0]!;
  const src = sourcePane(stage, stage.preview ? '' : first.text);
  stage.root.append(src.el);
  src.el.classList.add('mk-pane-src-top');
  const docs = opts.sides.map((s) => docPane(stage, s.label));
  row(stage.root, ...docs.map((d) => d.el));
  const htmls = opts.html !== false && !stage.preview ? opts.sides.map((s) => htmlPane(stage, `HTML: ${s.label}`)) : [];
  if (htmls.length) row(stage.root, ...htmls.map((h) => h.el));
  if (opts.caption && !stage.preview) note(stage.root, opts.caption);

  const draw = (md: string): void => {
    opts.sides.forEach((side, i) => {
      let out: string;
      try {
        out = side.render(md);
      } catch (err) {
        out = `<p class="mk-error">Error: ${String((err as Error).message).replace(/</g, '&lt;')}</p>`;
      }
      docs[i]!.show(out);
      htmls[i]?.show(out);
    });
  };

  if (stage.preview) {
    typeLoop(stage, opts.samples, (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    if (opts.samples.length > 1 && stage.bar) {
      select(stage.bar, 'Sample', opts.samples.map((s) => s.label ?? ''), (label) => {
        const s = opts.samples.find((x) => x.label === label)!;
        src.set(s.text);
        draw(s.text);
      });
    }
    draw(first.text);
  }
  return { refresh: () => draw(src.value()) };
}
