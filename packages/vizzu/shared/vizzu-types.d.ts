// Types for `import ... from 'vizzu'` that accept the shorthand animate() forms the docs use
//
// vizzu 0.18 types animate() strictly (keyframe arrays only) and widens it in
// plugins/shorthands-augmentation.d.ts, but that augmentation merges into an interface named
// Vizzu while the class is a default export, so TypeScript never applies it. Its LazyTarget
// and LazyChannel also intersect the strict types, so `set: ['Genres']` still fails, and
// LazyChannel drops the axis-only options (range, align, sort). tsconfig.json `paths`
// points the bare 'vizzu' specifier here for type checking only; Vite bundles the real package.
import type * as Anim from '../../../node_modules/vizzu/dist/types/anim.js';
import type * as Styles from '../../../node_modules/vizzu/dist/types/styles.js';
import type { AnimCompleting } from '../../../node_modules/vizzu/dist/animcompleting.js';
import type { Snapshot } from '../../../node_modules/vizzu/dist/module/cchart.js';
import type { CAnimation } from '../../../node_modules/vizzu/dist/module/canimctrl.js';
import type * as Config from '../../../node_modules/vizzu/dist/types/config.js';
import type * as Data from '../../../node_modules/vizzu/dist/types/data.js';
import Base from '../../../node_modules/vizzu/dist/vizzu.js';

export * from '../../../node_modules/vizzu/dist/index.js';

/** A series name, descriptor, or a list of them (plugins/shorthands.ts _normalizeSeriesList). */
export type AnySeriesList = Data.SeriesDescriptor | string | (Data.SeriesDescriptor | string)[] | null;
type LazyChannel<C> = Omit<C, 'set' | 'attach' | 'detach'> & {
  set?: AnySeriesList;
  attach?: AnySeriesList;
  detach?: AnySeriesList;
};
export type LazyChannels = {
  [K in keyof Config.Channels]?: LazyChannel<NonNullable<Config.Channels[K]>> | AnySeriesList;
};
/** A chart config whose channels may also sit at the top level (`{ x: 'Genres' }`). */
export type AnyChart = Omit<Config.Chart, 'channels'> & { channels?: LazyChannels } & LazyChannels;
/** Style, nested or as 'plot.xAxis.label.fontSize'-style paths (Shorthands & Store). */
export type AnyStyle = Styles.Chart | { [path: `${string}.${string}`]: string | number | null } | null;
export type AnyTarget =
  | (Omit<Anim.Target, 'config' | 'style'> & { config?: AnyChart; style?: AnyStyle })
  | AnyChart
  | Snapshot;
export type AnyOptions = Anim.Options | Anim.Duration | null;
export type AnyKeyframe = { target: AnyTarget; options?: AnyOptions } | AnyTarget;
export type AnyAnimTarget = AnyKeyframe[] | AnyTarget | CAnimation;
export type AnyAnimOptions = (Anim.ControlOptions & Anim.Options) | Anim.Duration | null;

declare class Vizzu extends Base {
  constructor(options: ConstructorParameters<typeof Base>[0], initState?: AnyTarget);
  animate(target: AnyAnimTarget, options?: AnyAnimOptions): AnimCompleting;
}

export { Vizzu };
export default Vizzu;
