// The deprecated %%{init: ...}%% directive on a sequence diagram: toggle it and change theme, wrap and mirrorActors
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// The messages are long on purpose, so the `wrap` option visibly changes the layout.
const BODY = `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you today? I hope the review went well.
    Bob-->>Alice: Fine, how did your mother like the book I suggested? And did you catch the new book about alien invasion?
    Alice->>Bob: Good.`;

// Literal sample of the generated directive, as in directives.md: general keys on top,
// diagram-specific keys one level down under the diagram's config key.
export const SAMPLE = `%%{init: { "theme": "forest", "sequence": { "wrap": true, "mirrorActors": false } } }%%
${BODY}`;

interface State {
  on: boolean;
  theme: string;
  wrap: boolean;
  mirror: boolean;
}

const directive = (s: State): string =>
  `%%{init: { "theme": "${s.theme}", "sequence": { "wrap": ${s.wrap}, "mirrorActors": ${s.mirror} } } }%%`;

const build = (s: State): string => (s.on ? `${directive(s)}\n${BODY}` : BODY);

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const state: State = { on: preview ? false : true, theme: 'forest', wrap: true, mirror: false };
  const report = preview ? () => undefined : statusLine(el);
  let ticket = 0;
  let timer = 0;
  let source: HTMLElement | null = null;

  const draw = async (): Promise<void> => {
    const mine = ++ticket;
    const code = build(state);
    if (source) source.textContent = code.split('\n')[0]!.startsWith('%%') ? directive(state) : '(no directive: the site-wide dark theme and defaults apply)';
    const staging = document.createElement('div');
    try {
      await renderInto(staging, code, signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(state.on ? 'Rendered with the init directive' : 'Rendered without a directive');
    } catch (err) {
      if (mine === ticket && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // Flip the directive on and off every few seconds.
    const tick = (): void => {
      state.on = !state.on;
      void draw();
      timer = window.setTimeout(tick, 3200);
    };
    tick();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const form = document.createElement('div');
  form.className = 'mm-row';
  const check = (text: string, key: 'on' | 'wrap' | 'mirror'): HTMLInputElement => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = state[key];
    input.addEventListener('change', () => {
      state[key] = input.checked;
      void draw();
    });
    label.append(input, ` ${text}`);
    form.append(label);
    return input;
  };
  check('init directive', 'on');
  check('wrap', 'wrap');
  check('mirrorActors', 'mirror');
  const themeLabel = document.createElement('label');
  themeLabel.append('theme ');
  const theme = document.createElement('select');
  for (const t of ['default', 'forest', 'neutral', 'dark', 'base']) theme.add(new Option(t, t));
  theme.value = state.theme;
  theme.addEventListener('change', () => {
    state.theme = theme.value;
    void draw();
  });
  themeLabel.append(theme);
  form.append(themeLabel);
  source = document.createElement('pre');
  source.className = 'mm-status';
  el.insertBefore(form, box);
  el.insertBefore(source, box);
  void draw();
  return () => {
    ticket++;
  };
};

export default mount;
