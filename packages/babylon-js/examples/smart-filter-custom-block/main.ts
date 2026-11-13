// A custom Smart Filter block from annotated GLSL, editable live
import { ConnectionPointType, CreateStrongRef, CustomShaderBlock, ImportCustomBlockDefinition, InputBlock, SmartFilter, SmartFilterOptimizer } from '@babylonjs/smart-filters';
import type { SerializedShaderBlockDefinition, SmartFilterRuntime } from '@babylonjs/smart-filters';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSmartFilterCanvas, createTestTexture } from '../../shared/smart-filter-setup.ts';
import { RIPPLE_GLSL } from './ripple.block.glsl.ts';

const mount: Mount = async (el, ctx) => {
  const view = createSmartFilterCanvas(el, ctx);
  const { engine } = view;
  const texture = createTestTexture(engine);

  let runtime: SmartFilterRuntime | undefined;
  let active: SmartFilter | undefined;
  let building = Promise.resolve();
  let disposed = false;
  const floats = new Map<string, InputBlock<ConnectionPointType.Float>>();
  const values = new Map<string, number>();
  let message: HTMLElement | undefined;
  let sliders: HTMLElement | undefined;
  let mode = 1;

  /** Imports the GLSL, wraps it in a block, wires one input block per uniform and rebuilds the runtime. */
  const compile = (glsl: string): Promise<void> =>
    (building = building.then(async () => {
      try {
        // Parses the annotations: uniforms become connection points, `// main` marks the entry point.
        const definition = ImportCustomBlockDefinition(glsl) as SerializedShaderBlockDefinition;
        const smartFilter = new SmartFilter('Custom');
        const block = CustomShaderBlock.Create(smartFilter, 'custom', definition);
        // A const annotated { "property": true } is a block property, fixed before the runtime exists.
        if (block.dynamicPropertyNames.includes('mode')) (block as unknown as Record<string, number>).mode = mode;
        const picture = new InputBlock(smartFilter, 'picture', ConnectionPointType.Texture, CreateStrongRef(texture));
        picture.output.connectTo(block.findInput<ConnectionPointType.Texture>('input')!);

        floats.clear();
        for (const cp of block.inputs) {
          if (cp.type === ConnectionPointType.Float) {
            const start = values.get(cp.name) ?? (cp.defaultRuntimeData as { value: number } | null)?.value ?? 0;
            values.set(cp.name, start);
            const input = new InputBlock(smartFilter, cp.name, ConnectionPointType.Float, start);
            input.output.connectTo(cp as never);
            floats.set(cp.name, input);
          }
        }
        block.output.connectTo(smartFilter.output);

        const optimized = new SmartFilterOptimizer(smartFilter, { maxSamplersInFragmentShader: engine.getCaps().maxTexturesImageUnits }).optimize() ?? smartFilter;
        const next = await optimized.createRuntimeAsync(engine);
        if (disposed) return next.dispose();
        runtime?.dispose();
        runtime = next;
        active = optimized;
        // The optimizer accepted the block: its GLSL follows the optimizer's rules.
        if (message) message.textContent = `Compiled "${definition.blockType}": ${floats.size} float inputs. The optimizer accepted it.`;
        rebuildSliders();
      } catch (error) {
        if (message) message.textContent = `GLSL error: ${error instanceof Error ? error.message : String(error)}`;
      }
    }));

  function rebuildSliders(): void {
    if (!sliders) return;
    sliders.replaceChildren();
    for (const [name, input] of floats) {
      if (name === 'time') continue;
      const start = values.get(name) ?? 0;
      const max = Math.max(1, start * 2.5);
      const label = document.createElement('label');
      Object.assign(label.style, { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' });
      const range = Object.assign(document.createElement('input'), { type: 'range', min: '0', max: String(max), step: String(max / 100), value: String(start) });
      range.style.accentColor = 'var(--accent)';
      range.addEventListener('input', () => {
        values.set(name, Number(range.value));
        input.runtimeValue.value = Number(range.value);
      });
      label.append(name, range);
      sliders.append(label);
    }
  }

  view.onResize(() => active?.resize(engine));
  await compile(RIPPLE_GLSL);

  let clock = 0;
  let last = performance.now();
  engine.runRenderLoop(() => {
    const now = performance.now();
    clock += (now - last) / 1000;
    last = now;
    const t = floats.get('time');
    if (t) t.runtimeValue.value = clock;
    if (ctx.preview) {
      const a = floats.get('amplitude');
      if (a) a.runtimeValue.value = 0.02 + 0.02 * Math.sin(clock);
    }
    runtime?.render();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    message = panel.readout();
    const editor = document.createElement('textarea');
    editor.value = RIPPLE_GLSL;
    editor.spellcheck = false;
    Object.assign(editor.style, { width: '100%', height: '15em', boxSizing: 'border-box', background: 'var(--bg)', color: 'var(--fg-1)', border: '1px solid var(--border, #333)', fontFamily: 'monospace', fontSize: '0.8rem', padding: 'var(--space-2)' });
    panel.el.prepend(editor);
    sliders = document.createElement('div');
    Object.assign(sliders.style, { display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2) var(--space-4)' });
    panel.el.append(sliders);
    panel.row();
    panel.select('mode property', ['Ripple', 'Ripple and tint'] as const, 'Ripple and tint', (v) => {
      mode = v === 'Ripple' ? 0 : 1;
      void compile(editor.value);
    });
    panel.button('Compile the GLSL above', () => void compile(editor.value));
    rebuildSliders();
  }

  return () => {
    disposed = true;
    runtime?.dispose();
    view.dispose();
  };
};

export default mount;
