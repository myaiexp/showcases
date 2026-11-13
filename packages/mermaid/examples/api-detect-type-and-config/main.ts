// Live readout of mermaid.detectType and mermaidAPI getSiteConfig/getConfig while setConfig, reset and initialize run
import type { Mount } from '@/types.ts';
import { BASE_CONFIG, mermaid, renderInto } from '../../shared/setup.ts';
import './style.css';

const SNIPPETS: { label: string; code: string }[] = [
  { label: 'flowchart', code: `flowchart LR\n    A --> B --> C` },
  { label: 'init directive', code: `%%{init: {"theme": "forest"}}%%\nsequenceDiagram\n    Alice->>Bob: Hi\n    Bob-->>Alice: Hello` },
  { label: 'frontmatter', code: `---\nconfig:\n  theme: neutral\n---\npie title Split\n    "A" : 60\n    "B" : 40` },
  { label: 'gantt', code: `gantt\n    title Plan\n    dateFormat YYYY-MM-DD\n    Design : 2026-01-01, 5d\n    Build : 2026-01-06, 8d` },
  { label: 'not a diagram', code: `this is just text` },
];

// mermaidAPI is marked deprecated in the type definitions but is where the docs' getConfig,
// getSiteConfig, setConfig and reset functions are reachable from the mermaid object.
const api = mermaid.mermaidAPI;

function detect(code: string): string {
  try {
    return mermaid.detectType(code);
  } catch (err) {
    return `throws: ${err instanceof Error ? err.message.split('\n')[0] : String(err)}`;
  }
}

const readout = (code: string, note: string): string => {
  const site = api.getSiteConfig();
  const cur = api.getConfig();
  return [
    `detectType(code)          ${detect(code)}`,
    `getSiteConfig().theme     ${site.theme}`,
    `getConfig().theme         ${cur.theme}`,
    `getConfig().flowchart.curve  ${cur.flowchart?.curve}`,
    `getConfig().securityLevel    ${cur.securityLevel}`,
    '',
    note,
  ].join('\n');
};

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'dt-wrap dt-card' : 'dt-wrap';
  const out = document.createElement('pre');
  out.className = 'dt-out';
  const box = document.createElement('div');
  box.className = preview ? 'mm-diagram mm-diagram-card' : 'mm-diagram';
  wrap.append(out, box);
  el.append(wrap);
  let current = SNIPPETS[0]!;
  let ticket = 0;
  let timer = 0;
  let note = 'Pick a snippet, then try the buttons.';

  const show = (): void => {
    out.textContent = readout(current.code, note);
  };
  const render = async (): Promise<void> => {
    const mine = ++ticket;
    const staging = document.createElement('div');
    try {
      await renderInto(staging, current.code, signal, box);
      if (mine === ticket && !signal.aborted) box.replaceChildren(...staging.childNodes);
    } catch (err) {
      if (mine === ticket && !signal.aborted) box.textContent = err instanceof Error ? err.message : String(err);
    }
    show();
  };

  if (preview) {
    let i = 0;
    const next = (): void => {
      current = SNIPPETS[i++ % (SNIPPETS.length - 1)]!;
      note = 'detectType reads the init directive and frontmatter too.';
      void render();
    };
    next();
    timer = window.setInterval(next, 3000);
    return () => {
      ticket++;
      clearInterval(timer);
    };
  }

  const bar = document.createElement('div');
  bar.className = 'mm-tabs';
  const add = (label: string, fn: () => void | Promise<void>, cls = ''): HTMLButtonElement => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `mm-tab ${cls}`;
    b.textContent = label;
    b.addEventListener('click', () => void fn());
    bar.append(b);
    return b;
  };
  const snippetButtons = SNIPPETS.map((s) =>
    add(s.label, async () => {
      current = s;
      for (const b of snippetButtons) b.classList.toggle('active', b.textContent === s.label);
      note = `Snippet "${s.label}" selected.`;
      await render();
    }),
  );
  snippetButtons[0]!.classList.add('active');
  const actions = document.createElement('div');
  actions.className = 'mm-tabs';
  const act = (label: string, fn: () => void | Promise<void>): void => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = label;
    b.addEventListener('click', () => void fn());
    actions.append(b);
  };
  act("setConfig({ theme: 'forest', flowchart: { curve: 'stepAfter' } })", () => {
    api.setConfig({ theme: 'forest', flowchart: { curve: 'stepAfter' } });
    note = 'setConfig changed getConfig() only; getSiteConfig() still holds the initialize() values. (setConfig is deprecated: the next render or reset overwrites it.)';
    show();
  });
  act('reset()', () => {
    api.reset();
    note = 'reset() put getConfig() back to the site config.';
    show();
  });
  act("initialize({ theme: 'neutral' })", () => {
    mermaid.initialize({ ...BASE_CONFIG, theme: 'neutral' });
    note = 'initialize() sets the site config, so both getters now report it.';
    show();
  });
  act('Render the snippet', async () => {
    note = 'render() starts from the site config and then applies the diagram\'s own directives and frontmatter.';
    await render();
  });
  act('Back to BASE_CONFIG', () => {
    mermaid.initialize(BASE_CONFIG);
    api.reset();
    note = 'Restored the gallery defaults.';
    show();
  });
  el.insertBefore(actions, wrap);
  el.insertBefore(bar, actions);
  void render();
  return () => {
    ticket++;
    mermaid.initialize(BASE_CONFIG);
    api.reset();
  };
};

export default mount;
