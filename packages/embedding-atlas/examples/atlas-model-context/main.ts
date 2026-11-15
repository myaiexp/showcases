// modelContext: Atlas registers tools via provideContext; list and call them
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, topicChart, wordsChart } from '../../shared/atlas-kit.ts';
import { button, readout, select } from '../../shared/controls.ts';

type ModelContext = NonNullable<EmbeddingAtlasProps['modelContext']>;
type Context = Parameters<ModelContext['provideContext']>[0];
type Tool = NonNullable<Context['tools']>[number];

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 360, cardRows: 800 });
  if (stage.disposed) return stage.dispose;

  let tools: Tool[] = [];
  const out = readout(stage.preview ? stage.view : stage.box);
  if (stage.preview) out.style.cssText += ';position:absolute;left:0;right:0;bottom:0;z-index:50;padding:8px;font-size:20px;background:rgba(11,13,18,.9);color:#e2e8f0';

  // The whole of the API: Atlas calls provideContext once with the tools it offers.
  const modelContext: ModelContext = {
    provideContext(context) {
      tools = context.tools ?? [];
      if (!stage.preview) renderTools();
      else startTour();
    },
  };

  const call = async (tool: Tool, input: unknown): Promise<string> => {
    const res = await tool.execute(input, null);
    const body = res.content.map((c) => c.text ?? c.type).join('\n');
    return `${tool.name}(${JSON.stringify(input)})${res.isError ? ' [error]' : ''}\n${body.length > 900 ? `${body.slice(0, 900)}…` : body}`;
  };

  // Cards cannot click, so they call four read-only tools in turn, with the inputs their schemas ask for.
  const startTour = (): void => {
    out.textContent = `provideContext: ${tools.length} tools\n${tools.map((t) => t.name).join(' ')}`;
    const steps = ['data_schema', 'data_query', 'chart_list', 'layout_list'];
    let i = 0;
    stage.every(2600, () => {
      const tool = tools.find((t) => t.name === steps[i++ % steps.length]);
      if (tool) void call(tool, sampleInput(tool, table)).then((text) => !stage.disposed && (out.textContent = text));
    });
  };

  let input: HTMLInputElement | null = null;
  let current: Tool | null = null;
  const renderTools = (): void => {
    if (!stage.bar) return;
    stage.bar.replaceChildren();
    if (!tools.length) return;
    const pick = (name: string): void => {
      current = tools.find((t) => t.name === name) ?? null;
      if (input && current) input.value = JSON.stringify(sampleInput(current, table));
      out.textContent = current ? `${current.title ?? current.name}: ${current.description}\ninputSchema: ${JSON.stringify(current.inputSchema)}` : '';
    };
    select(stage.bar, 'tool', tools.map((t) => t.name), pick);
    input = document.createElement('input');
    input.style.width = '22em';
    stage.bar.append(input);
    button(stage.bar, 'Call', () => {
      if (!current) return;
      try {
        void call(current, JSON.parse(input!.value)).then((text) => !stage.disposed && (out.textContent = text));
      } catch (err) {
        out.textContent = `bad JSON: ${String(err)}`;
      }
    });
    pick(tools[0]!.name);
  };

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      modelContext,
      initialState: dashboard({ topics: topicChart, words: wordsChart }),
    }),
  );
  return stage.dispose;
};

/** A starting input for a tool: a sample SQL query for `query`, empty values for the rest. */
function sampleInput(tool: Tool, table: string): Record<string, unknown> {
  const props = (tool.inputSchema as { properties?: Record<string, { type?: string }> }).properties ?? {};
  const value = (k: string, type?: string): unknown =>
    k === 'query' ? `SELECT topic, count(*) AS n FROM ${table} GROUP BY topic ORDER BY n DESC` : type === 'number' ? 0 : type === 'array' ? [] : type === 'boolean' ? false : '';
  return Object.fromEntries(Object.entries(props).map(([k, v]) => [k, value(k, v.type)]));
}

export default mount;
