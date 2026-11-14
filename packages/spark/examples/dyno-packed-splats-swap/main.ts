// DynoPackedSplats: swap the PackedSplats a generator reads, at runtime
import { PackedSplats, SplatGenerator, SplatTransformer, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select } from '../../shared/controls.ts';
import { pushButterfly, pushTorusKnot } from '../../shared/subjects.ts';
import { pushBlobShell } from '../../shared/scenes.ts';

const NAMES = ['knot', 'butterfly', 'blob shell'] as const;
type Name = (typeof NAMES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.8], orbit: 0.25 });
  const small = ctx.preview;

  // Three independent sources, each with its own number of splats.
  const sources: Record<Name, PackedSplats> = {
    knot: new PackedSplats({ construct: (s) => pushTorusKnot(s, small ? 12000 : 24000) }),
    butterfly: new PackedSplats({ construct: (s) => pushButterfly(s, small ? 10000 : 20000) }),
    'blob shell': new PackedSplats({ construct: (s) => pushBlobShell(s, { count: small ? 3000 : 6000, scale: 0.05 }) }),
  };

  // The root export has no DynoPackedSplats constructor, but every PackedSplats owns one in
  // `.dyno`. An empty PackedSplats lends us its instance as the swappable dyno value; its
  // .packedSplats property says which real source the generator reads.
  const holder = new PackedSplats();
  const source = holder.dyno;
  const swap = source as unknown as { packedSplats?: PackedSplats };
  swap.packedSplats = sources.knot;
  const transform = new SplatTransformer();
  const generator = dyno.dynoBlock({ index: 'int' }, { gsplat: dyno.Gsplat }, ({ index }) => {
    if (!index) throw new Error('no index');
    return { gsplat: transform.applyGsplat(dyno.readPackedSplat(source, index)) };
  });

  const view = new SplatGenerator({
    numSplats: 0,
    generator,
    update: ({ object }) => {
      transform.update(object);
      object.updateVersion();
    },
  });
  stage.scene.add(view);
  const label = overlay(el);

  const use = (name: Name): void => {
    const packed = sources[name];
    // Swapping is just an assignment; the next run of the program reads the new splats.
    swap.packedSplats = packed;
    // The count differs per source, and the renderer lays out splats by count.
    view.numSplats = packed.numSplats;
    view.updateMappingVersion();
    label.textContent = `source.packedSplats = ${name} (${packed.numSplats} splats)`;
  };

  let disposed = false;
  let timer = 0;
  void Promise.all(Object.values(sources).map((p) => p.initialized)).then(() => {
    if (disposed) return;
    use('knot');
    if (ctx.preview) {
      let n = 0;
      timer = window.setInterval(() => use(NAMES[++n % NAMES.length]!), 1800);
    } else {
      const bar = controlBar(el);
      select(bar, 'source', NAMES, use);
    }
  });

  stage.run((time) => {
    view.rotation.y = time * 0.1;
    view.position.y = Math.sin(time * 0.7) * 0.05;
  });
  return () => {
    disposed = true;
    clearInterval(timer);
    Object.values(sources).forEach((p) => p.dispose());
    holder.dispose();
    stage.dispose();
  };
};

export default mount;
