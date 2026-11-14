// A state prop with no default in the theme style cannot be cleared: stroke stays after the state
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const nodeBase = { size: 34, fill: '#23395d', labelFill: '#d6e2ff', labelPlacement: 'bottom' as const };
const selected = { fill: '#f6bd16', stroke: '#ffffff', lineWidth: 4 };

// Same theme twice. "complete" gives stroke and lineWidth a default; "missing" leaves them out.
register(ExtensionCategory.THEME, 'showcase-theme-complete', {
  background: '#0b1020',
  node: { style: { ...nodeBase, stroke: '#6c8ebf', lineWidth: 2 }, state: { selected } },
});
register(ExtensionCategory.THEME, 'showcase-theme-missing', {
  background: '#0b1020',
  node: { style: nodeBase, state: { selected } },
});

const THEMES = ['showcase-theme-complete', 'showcase-theme-missing'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    stage.container.style.background = '#0b1020';
    const make = (theme: string) =>
      new Graph({
        container: stage.container,
        theme,
        autoFit: 'view',
        padding: 24,
        data: { nodes: ['a', 'b', 'c'].map((id) => ({ id })) },
        node: { style: { labelText: (d) => d.id } },
        layout: { type: 'grid', cols: 3 },
      });
    const graph = stage.keep(make(stage.preview ? THEMES[1] : THEMES[0]));
    await graph.render();

    // Select b, then clear it: with the missing defaults its white stroke stays.
    let on = false;
    const toggleState = async (): Promise<void> => {
      on = !on;
      await graph.setElementState({ b: on ? ['selected'] : [] });
    };
    const setTheme = async (theme: string): Promise<void> => {
      graph.setTheme(theme);
      on = false;
      await graph.setElementState({ b: [] });
      await graph.render();
    };
    if (stage.bar) {
      select(stage.bar, 'theme', THEMES, THEMES[0], (v) => void setTheme(v));
      const b = document.createElement('button');
      b.textContent = 'toggle selected on b';
      b.addEventListener('click', () => void toggleState());
      stage.bar.append(b);
    } else stage.every(1200, toggleState);
  });

export default mount;
