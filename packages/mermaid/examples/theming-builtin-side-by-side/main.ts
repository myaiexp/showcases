// The same flowchart in each built-in theme, chosen in its own frontmatter: a grid in the full view, one at a time in the card
import type { Mount } from '@/types.ts';
import { diagramBox } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';
import './style.css';

// The built-in themes theming.md lists (base is covered by its own example).
const THEMES = ['default', 'neutral', 'dark', 'forest', 'redux', 'redux-color', 'neo', 'neo-dark'];

const DIAGRAM = `flowchart LR
    Idea --> Draft{Good?}
    Draft -->|yes| Ship
    Draft -->|no| Idea`;

// Literal sample of what is rendered for each theme: theme in frontmatter config.
export const SAMPLE = `---
config:
  theme: forest
---
${DIAGRAM}`;

const withTheme = (theme: string): string => `---\nconfig:\n  theme: ${theme}\n---\n${DIAGRAM}`;
const isDark = (t: string): boolean => t === 'dark' || t === 'neo-dark';

const mount: Mount = (el, { preview, signal }) => {
  let ticket = 0;
  let timer = 0;

  // Each panel gets its own background: a light theme draws dark text and would vanish on the dark page.
  const makePanel = (theme: string): { panel: HTMLElement; slot: HTMLElement } => {
    const panel = document.createElement('figure');
    panel.className = isDark(theme) ? 'theme-panel dark' : 'theme-panel light';
    const slot = document.createElement('div');
    slot.className = 'theme-slot';
    const cap = document.createElement('figcaption');
    cap.textContent = theme;
    panel.append(slot, cap);
    return { panel, slot };
  };

  const draw = async (theme: string, slot: HTMLElement, mine: number): Promise<void> => {
    const staging = document.createElement('div');
    try {
      await renderInto(staging, withTheme(theme), signal, slot);
      if (mine !== ticket || signal.aborted) return;
      slot.replaceChildren(...staging.childNodes);
    } catch (err) {
      if (mine === ticket && !signal.aborted) slot.textContent = err instanceof Error ? err.message : String(err);
    }
  };

  if (preview) {
    const box = diagramBox(el, true);
    const { panel, slot } = makePanel(THEMES[0]!);
    panel.classList.add('fill');
    box.append(panel);
    let i = 0;
    const next = (): void => {
      const theme = THEMES[i++ % THEMES.length]!;
      panel.className = `theme-panel fill ${isDark(theme) ? 'dark' : 'light'}`;
      panel.querySelector('figcaption')!.textContent = theme;
      void draw(theme, slot, ++ticket);
      timer = window.setTimeout(next, 2200);
    };
    next();
    return () => {
      ticket++;
      clearTimeout(timer);
    };
  }

  const grid = document.createElement('div');
  grid.className = 'theme-grid';
  el.append(grid);
  const mine = ++ticket;
  // Sequential on purpose: theme config is applied per render, so one render at a time keeps them apart.
  void (async () => {
    for (const theme of THEMES) {
      const { panel, slot } = makePanel(theme);
      grid.append(panel);
      await draw(theme, slot, mine);
      if (signal.aborted) return;
    }
  })();
  return () => {
    ticket++;
  };
};

export default mount;
