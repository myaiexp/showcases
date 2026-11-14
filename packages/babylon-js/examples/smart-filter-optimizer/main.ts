// A four-block SmartFilter graph and the optimizer that merges it
import { ConnectionPointType, CreateStrongRef, InputBlock, RenderTargetGenerator, SmartFilter, SmartFilterOptimizer } from '@babylonjs/smart-filters';
import type { SmartFilterRuntime } from '@babylonjs/smart-filters';
import { BlackAndWhiteBlock, ContrastBlock, PixelateBlock, PosterizeBlock } from '@babylonjs/smart-filters-blocks';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSmartFilterCanvas, createTestTexture } from '../../shared/smart-filter-setup.ts';

const mount: Mount = async (el, ctx) => {
  const view = createSmartFilterCanvas(el, ctx);
  const { engine } = view;

  // Design time: create the blocks, then connect their connection points.
  const smartFilter = new SmartFilter('Stylise');
  const picture = new InputBlock(smartFilter, 'picture', ConnectionPointType.Texture, CreateStrongRef(createTestTexture(engine)));
  const blackAndWhite = new BlackAndWhiteBlock(smartFilter, 'blackAndWhite');
  const posterize = new PosterizeBlock(smartFilter, 'posterize');
  const pixelate = new PixelateBlock(smartFilter, 'pixelate');
  const contrast = new ContrastBlock(smartFilter, 'contrast');
  const posterizeAmount = new InputBlock(smartFilter, 'posterizeAmount', ConnectionPointType.Float, 0.5);
  const pixelAmount = new InputBlock(smartFilter, 'pixelAmount', ConnectionPointType.Float, 0.5);
  const contrastAmount = new InputBlock(smartFilter, 'contrastAmount', ConnectionPointType.Float, 0.5);

  picture.output.connectTo(blackAndWhite.input);
  blackAndWhite.output.connectTo(posterize.input);
  posterizeAmount.output.connectTo(posterize.intensity);
  posterize.output.connectTo(pixelate.input);
  pixelAmount.output.connectTo(pixelate.intensity);
  pixelate.output.connectTo(contrast.input);
  contrastAmount.output.connectTo(contrast.intensity);
  contrast.output.connectTo(smartFilter.output);

  let runtime: SmartFilterRuntime | undefined;
  let active = smartFilter;
  let readout: HTMLElement | undefined;
  let disposed = false;
  let building = Promise.resolve();

  /** Builds a runtime from the plain graph, or from the optimizer's merged copy. */
  const build = (optimize: boolean): Promise<void> =>
    (building = building.then(async () => {
      const old = runtime;
      runtime = undefined;
      old?.dispose();
      active = smartFilter;
      if (optimize) {
        // The optimizer returns a new SmartFilter with compatible shader blocks merged.
        active =
          new SmartFilterOptimizer(smartFilter, { maxSamplersInFragmentShader: engine.getCaps().maxTexturesImageUnits }).optimize() ?? smartFilter;
      }
      // true: the generator recycles intermediate textures wherever it can.
      const next = await active.createRuntimeAsync(engine, new RenderTargetGenerator(optimize));
      if (disposed) return next.dispose();
      runtime = next;
      const commands: string[] = [];
      next.commandBuffer.visitCommands((c) => commands.push(`${c.owner.name}`));
      if (readout) readout.textContent = `${optimize ? 'optimized' : 'unoptimized'}: ${commands.length} command${commands.length === 1 ? '' : 's'} (one draw call each): ${commands.join(' > ')}`;
    }));

  view.onResize(() => active.resize(engine));
  await build(true);

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.check('SmartFilterOptimizer + RenderTargetGenerator(true)', true, (on) => void build(on));
    panel.readout('Four shader blocks: without the optimizer that is four draw calls, with it they merge into one.');
  }

  // Runtime: inputs are values the runtime reads each frame, so they can animate freely.
  const input = (name: string): InputBlock<ConnectionPointType.Float> | undefined =>
    active.attachedBlocks.find((b): b is InputBlock<ConnectionPointType.Float> => b instanceof InputBlock && b.name === name);
  engine.runRenderLoop(() => {
    if (!runtime) return;
    const t = performance.now() / 1000;
    const set = (name: string, v: number): void => {
      const block = input(name);
      if (block) block.runtimeValue.value = v;
    };
    set('posterizeAmount', 0.55 + 0.4 * Math.sin(t * 0.7));
    set('pixelAmount', 0.55 + 0.4 * Math.sin(t * 1.1 + 1));
    set('contrastAmount', 0.5 + 0.3 * Math.sin(t * 0.5 + 2));
    runtime.render();
  });

  return () => {
    disposed = true;
    runtime?.dispose();
    view.dispose();
  };
};

export default mount;
