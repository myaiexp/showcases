// D2 playground: cards cycle variants, the full view adds tabs and a live editor
import type { CompileOptions, CompileResponse } from '@terrastruct/d2';
import { boardName } from './boards.ts';
import { d2ErrorText } from './errors.ts';
import { STOPPED, type Stage } from './stage.ts';

export interface Variant {
  /** Tab name, and the caption while this variant shows. */
  label: string;
  /** The D2 source. */
  code: string;
  /** Compile options for this variant, over the playground's own `options`. */
  options?: CompileOptions;
}

export interface PlaygroundOptions {
  variants: readonly Variant[];
  /** Compile options every variant gets, such as `{ themeID: 200 }`. */
  options?: CompileOptions;
  /** Milliseconds each variant shows in a card before the next one renders. */
  interval?: number;
  /** Called after each render, with what compile returned and the svg on the page. */
  onRender?: (result: CompileResponse, svg: SVGSVGElement, variant: Variant) => void;
}

/** The pad D2 uses when none is given is 100px, too much for a 200px card. */
const PAD = 24;

/**
 * Compiles and renders one variant the way the README does: compile, then render the
 * diagram with the render options compile returned (the source's d2-config merged in).
 * `pad` defaults to 24 unless the options or the source's d2-config set one.
 */
export async function compileAndRender(stage: Stage, code: string, options: CompileOptions): Promise<{ result: CompileResponse; svg: string }> {
  const d2 = await stage.d2();
  const pad = 'pad' in options || /\bpad\s*:/.test(code) ? {} : { pad: PAD };
  const result = await d2.compile(code, { ...pad, ...options });
  const svg = await d2.render(result.diagram, result.renderOptions);
  return { result, svg };
}

/** Renders the variants: a card shows each in turn, the full view a tab bar and an editor. */
export function playground(stage: Stage, opts: PlaygroundOptions): void {
  const { variants } = opts;
  let ticket = 0;
  let current = variants[0]!;
  let back: HTMLButtonElement | null = null;

  const draw = async (variant: Variant, code: string, target?: string): Promise<void> => {
    const mine = ++ticket;
    try {
      const options = { ...opts.options, ...variant.options };
      const { result, svg } = await compileAndRender(stage, code, options);
      let text = svg;
      if (target !== undefined) {
        const d2 = await stage.d2();
        text = await d2.render(result.diagram, { ...result.renderOptions, target });
      }
      if (mine !== ticket || stage.disposed) return;
      const node = stage.show(text, { onBoardLink: (board) => void draw(variant, code, board) });
      if (back) back.hidden = !target;
      stage.say(target ? `Showing ${boardName(target)}` : variant.label, 'info');
      opts.onRender?.(result, node, variant);
    } catch (err) {
      if (err === STOPPED || mine !== ticket || stage.disposed) return;
      if (stage.preview) stage.box.textContent = d2ErrorText(err);
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    const next = (): void => {
      current = variants[i++ % variants.length]!;
      void draw(current, current.code);
      if (variants.length > 1) stage.after(opts.interval ?? 4000, next);
    };
    next();
    return;
  }

  const editor = document.createElement('textarea');
  editor.className = 'dd-editor';
  editor.spellcheck = false;
  editor.setAttribute('aria-label', 'D2 source');
  const panel = stage.side('D2 source (edit me)');
  panel?.append(editor);
  const optionLine = document.createElement('code');
  optionLine.className = 'dd-options';
  panel?.append(optionLine);

  const tabs: HTMLButtonElement[] = [];
  const pick = (variant: Variant): void => {
    current = variant;
    editor.value = variant.code;
    const options = { ...opts.options, ...variant.options };
    optionLine.textContent = `compile options: ${JSON.stringify(options)}`;
    for (const t of tabs) t.classList.toggle('dd-on', t.textContent === variant.label);
    void draw(variant, variant.code);
  };
  if (variants.length > 1) {
    for (const v of variants) {
      const tab = stage.button(v.label, () => pick(v));
      if (tab) tabs.push(tab);
    }
  }
  back = document.createElement('button');
  back.type = 'button';
  back.className = 'dd-back';
  back.textContent = '↩ root board';
  back.hidden = true;
  back.addEventListener('click', () => void draw(current, editor.value), { signal: stage.signal });
  stage.root.append(back);

  let typing = 0;
  editor.addEventListener(
    'input',
    () => {
      clearTimeout(typing);
      typing = window.setTimeout(() => void draw(current, editor.value), 350);
    },
    { signal: stage.signal },
  );
  stage.onDispose(() => clearTimeout(typing));
  pick(variants[0]!);
}
