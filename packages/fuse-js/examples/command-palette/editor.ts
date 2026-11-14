// A tiny pretend editor window that commands change: sidebar, theme, wrap, split
export interface Editor {
  el: HTMLElement;
  /** Applies a command by name; returns false when the window has nothing to show for it. */
  run(name: string): boolean;
}

const CODE = ['function greet(name) {', '  return "Hello, " + name + "! Welcome back to the editor."', '}', 'greet("Ada")'];

export function editor(parent: HTMLElement): Editor {
  const el = document.createElement('div');
  el.className = 'ed';
  const side = document.createElement('div');
  side.className = 'ed-side';
  side.textContent = 'src\nmain.js\nutil.js';
  const panes = document.createElement('div');
  panes.className = 'ed-panes';
  const pane = (): HTMLElement => {
    const p = document.createElement('div');
    p.className = 'ed-pane';
    CODE.forEach((line, i) => {
      const l = document.createElement('div');
      l.className = 'ed-line';
      l.dataset['n'] = String(i + 1);
      l.textContent = line;
      p.append(l);
    });
    return p;
  };
  panes.append(pane());
  el.append(side, panes);
  parent.append(el);

  const flash = (node: HTMLElement): void => {
    node.animate([{ outline: '2px solid var(--accent)' }, { outline: '2px solid transparent' }], { duration: 700 });
  };
  const actions: Record<string, () => void> = {
    'Toggle Sidebar': () => side.classList.toggle('ed-hidden'),
    'Change Color Theme': () => el.classList.toggle('ed-light'),
    'Toggle Word Wrap': () => el.classList.toggle('ed-wrap'),
    'Split Editor Right': () => (panes.children.length > 1 ? panes.lastElementChild?.remove() : panes.append(pane())),
    'Go to Line': () => {
      const line = panes.querySelectorAll<HTMLElement>('.ed-line')[3];
      if (line) flash(line);
    },
  };
  return {
    el,
    run(name) {
      const act = actions[name];
      act?.();
      flash(el);
      return Boolean(act);
    },
  };
}
