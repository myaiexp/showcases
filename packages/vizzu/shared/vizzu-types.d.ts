// Types for `import ... from 'vizzu'` that accept the shorthand animate() forms the docs use
//
// vizzu 0.18 types animate() strictly (keyframe arrays only) and widens it in
// plugins/shorthands-augmentation.d.ts, but that augmentation merges into an interface named
// Vizzu while the class is a default export, so TypeScript never applies it. Its LazyTarget
// and LazyChannel also intersect the strict types, so `set: ['Genres']` still fails, and
// LazyChannel drops the axis-only options (range, align, sort). `Vizzu.presets` is typed as
// the plugin class, which declares no preset methods; types/presets.d.ts has them. Data.Set
// leaves out the data cube form (pivotData plugin) and a filter-only `data: { filter }`, and
// `initializing` resolves to the unwidened class. animate() always sets `.activated`
// (vizzu.ts animate), which AnimCompleting types as optional.
// tsconfig.json `paths` points the bare 'vizzu' specifier here for type checking only; Vite
// bundles the real package.
import type * as Anim from '../../../node_modules/vizzu/dist/types/anim.js';
import type * as Styles from '../../../node_modules/vizzu/dist/types/styles.js';
import type { AnimControl } from '../../../node_modules/vizzu/dist/animcontrol.js';
import type { Snapshot } from '../../../node_modules/vizzu/dist/module/cchart.js';
import type { CAnimation } from '../../../node_modules/vizzu/dist/module/canimctrl.js';
import type * as Config from '../../../node_modules/vizzu/dist/types/config.js';
import type * as Data from '../../../node_modules/vizzu/dist/types/data.js';
import type * as PresetTypes from '../../../node_modules/vizzu/dist/types/presets.js';
import type PresetsPlugin from '../../../node_modules/vizzu/dist/plugins/presets.js';
import type { DataCube } from '../../../node_modules/vizzu/dist/plugins/unpivot.js';
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
/** Data for a target: a table, a data cube, or only a new filter. */
export type AnyData = Data.Set | DataCube | Data.Filter;
export type AnyTarget =
  | (Omit<Anim.Target, 'data' | 'config' | 'style'> & { data?: AnyData; config?: AnyChart; style?: AnyStyle })
  | AnyChart
  | Snapshot;
export type AnyOptions = Anim.Options | Anim.Duration | null;
export type AnyKeyframe = { target: AnyTarget; options?: AnyOptions } | AnyTarget;
export type AnyAnimTarget = AnyKeyframe[] | AnyTarget | CAnimation;
export type AnyAnimOptions = (Anim.ControlOptions & Anim.Options) | Anim.Duration | null;

export type { DataCube };

/** animate()'s result: completes with the chart; `activated` gives the AnimControl. */
export type AnimCompleting = Promise<Vizzu> & { activated: Promise<AnimControl> };

declare class Vizzu extends Base {
  initializing: Promise<Vizzu>;
  static get presets(): PresetsPlugin & PresetTypes.Presets;
  constructor(options: ConstructorParameters<typeof Base>[0], initState?: AnyTarget);
  animate(target: AnyAnimTarget, options?: AnyAnimOptions): AnimCompleting;
}

export { Vizzu };
export default Vizzu;
