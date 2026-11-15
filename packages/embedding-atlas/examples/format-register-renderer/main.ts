// registerRenderer with a custom class and options editor
import { registerRenderer } from 'embedding-atlas';
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

interface Props {
  value: unknown;
  options?: Record<string, unknown>;
}

// The renderer is page-wide, so the name is prefixed and re-registering replaces it.
class Stars {
  private node: HTMLElement;
  constructor(node: HTMLElement, props: Props) {
    this.node = node;
    this.update(props);
  }
  update(props: Props): void {
    const max = Number(props.options?.max ?? 5);
    const n = Math.max(0, Math.min(max, Number(props.value)));
    this.node.innerHTML = `<span style="color:#f59e0b;letter-spacing:2px">${'★'.repeat(n)}${'☆'.repeat(max - n)}</span>`;
  }
  destroy(): void {
    this.node.replaceChildren();
  }
}

// The options panel receives the current options and reports edits through onChange.
class StarsOptions {
  constructor(node: HTMLElement, props: { options?: Record<string, unknown>; onChange?: (v?: Record<string, unknown>) => void }) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.value = String(props.options?.max ?? 5);
    input.addEventListener('change', () => props.onChange?.({ max: Number(input.value) }));
    node.replaceChildren('Stars out of ', input);
  }
}

registerRenderer({
  name: 'showcase-stars',
  label: 'Stars',
  description: 'Render a number as a row of stars',
  renderer: Stars,
  options: StarsOptions,
});

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
          'options.max: 5': {
            charts: {
              table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
            },
            columnStyles: { stars: { renderer: 'showcase-stars', options: { max: 5 } } },
          },
          'options.max: 8': {
            charts: {
              table: { type: 'instances', title: 'Documents', columns: ['topic', 'stars'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
            },
            columnStyles: { stars: { renderer: 'showcase-stars', options: { max: 8 } } },
          },
        },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
