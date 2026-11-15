// Types for tsl-textures 3.0.5 (it ships none), from each src file's defaults
// helm-large-file-ok: one declaration per texture (52), mirroring the library's own one-file entry
// Ambient declarations: this file must not import at the top level (that would make them
// augmentations). Each `XParams` lists the keys of `defaults` in node_modules/tsl-textures/src/<file>,
// and test/tsl-textures-types.test.ts fails when a library bump changes them.

declare module 'tsl-textures' {
  import type { Color, Node, Vector2, Vector3 } from 'three/webgpu';

  /** Every parameter goes into a TSL Fn, so a plain value or any node (a uniform) works. */
  type Num = number | Node;
  type Flag = boolean | number | Node;
  type Col = Color | Node;
  type Vec2 = Vector2 | Node;
  type Vec3 = Vector3 | Node;
  /**
   * `texture.defaults`: every parameter's default value, `$name` (the display name) and
   * flags such as `$positionNode` / `$normalNode` marking the slot a texture is made for.
   */
  type Defaults<P> = { readonly [K in keyof P]-?: Exclude<P[K], undefined> } & {
    readonly $name: string;
    readonly [flag: `$${string}`]: unknown;
  };

  // tsl-utils.js
  export function approximateNormal(pos: Node, posU: Node, posV: Node): Node<'vec3'>;
  export function remapExp(x: Num, fromMin: Num, fromMax: Num, toMin: Num, toMax: Num): Node<'float'>;
  export function hsl(col: Vec3 | Node): Node<'vec3'>;
  export function toHsl(rgb: Vec3 | Col): Node<'vec3'>;
  export function rotatePivot(vector: Vec3, pivot: Vec3, angle: Vec3): Node<'vec3'>;
  export function vnoise(v: Vec3): Node<'float'>;
  export function spherical(phi: Num, theta: Num): Node<'vec3'>;
  export function selectPlanar(pos: Vec3, selAngles: Vec2, selCenter: Vec3, selWidth: Num): Node<'float'>;
  export function showFallbackWarning(): Promise<void>;
  export function hideFallbackWarning(): void;
  export {
    mx_noise_float as noise,
    mx_noise_vec3 as noise3,
    mx_fractal_noise_float as fractal,
    mx_fractal_noise_vec3 as fractal3,
    mx_worley_noise_float as voronoi,
    mx_worley_noise_vec2 as voronoi2,
    mx_worley_noise_vec3 as voronoi3,
  } from 'three/tsl';

  /** brain.js: 'Brain' */
  export interface BrainParams {
    position?: Node;
    scale?: Num;
    smooth?: Num;
    wave?: Num;
    speed?: Num;
    time?: Node;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const brain: {
    (params?: BrainParams): Node<'vec3'>;
    normal(params?: BrainParams): Node<'vec3'>;
    defaults: Defaults<BrainParams>;
  };

  /** bricks.js: 'Bricks' */
  export interface BricksParams {
    position?: Node;
    scale?: Num;
    brickSize?: Vec3;
    brickShift?: Num;
    jointSize?: Num;
    jointSpan?: Num;
    jointJitter?: Num;
    jointBlur?: Num;
    noiseSize?: Num;
    noiseStrength?: Num;
    colorShade?: Num;
    color?: Col;
    additional?: Col;
    background?: Col;
    seed?: Num;
  }
  export const bricks: {
    (params?: BricksParams): Node<'vec3'>;
    defaults: Defaults<BricksParams>;
  };

  /** camouflage.js: 'Camouflage' */
  export interface CamouflageParams {
    position?: Node;
    scale?: Num;
    colorA?: Col;
    colorB?: Col;
    colorC?: Col;
    colorD?: Col;
    seed?: Num;
  }
  export const camouflage: {
    (params?: CamouflageParams): Node<'vec3'>;
    defaults: Defaults<CamouflageParams>;
  };

  /** caustics.js: 'Caustics' */
  export interface CausticsParams {
    position?: Node;
    scale?: Num;
    speed?: Num;
    time?: Node;
    color?: Col;
    seed?: Num;
  }
  export const caustics: {
    (params?: CausticsParams): Node<'vec3'>;
    defaults: Defaults<CausticsParams>;
  };

  /** cave-art.js: 'Cave art' */
  export interface CaveArtParams {
    position?: Node;
    scale?: Num;
    thinness?: Num;
    noise?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const caveArt: {
    (params?: CaveArtParams): Node<'vec3'>;
    defaults: Defaults<CaveArtParams>;
  };

  /** circle-decor.js: 'Circle decor' */
  export interface CircleDecorParams {
    position?: Node;
    scale?: Num;
    grains?: Num;
    complexity?: Num;
    blur?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const circleDecor: {
    (params?: CircleDecorParams): Node<'vec3'>;
    defaults: Defaults<CircleDecorParams>;
  };

  /** circles.js: 'Circles' */
  export interface CirclesParams {
    position?: Node;
    scale?: Num;
    variety?: Num;
    color?: Col;
    seed?: Num;
  }
  export const circles: {
    (params?: CirclesParams): Node<'vec3'>;
    defaults: Defaults<CirclesParams>;
  };

  /** clouds.js: 'Clouds' */
  export interface CloudsParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    opacity?: Num;
    color?: Col;
    subcolor?: Col;
    seed?: Num;
  }
  export const clouds: {
    (params?: CloudsParams): Node<'vec3'>;
    opacity(params?: CloudsParams): Node<'float'>;
    defaults: Defaults<CloudsParams>;
  };

  /** concrete.js: 'Concrete' */
  export interface ConcreteParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    bump?: Num;
    seed?: Num;
  }
  export const concrete: {
    (params?: ConcreteParams): Node<'vec3'>;
    defaults: Defaults<ConcreteParams>;
  };

  /** cork.js: 'Cork' */
  export interface CorkParams {
    position?: Node;
    scale?: Num;
    straight?: Num;
    noise?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const cork: {
    (params?: CorkParams): Node<'vec3'>;
    defaults: Defaults<CorkParams>;
  };

  /** crumpled-fabric.js: 'Crumpled fabric' */
  export interface CrumpledFabricParams {
    position?: Node;
    scale?: Num;
    pinch?: Num;
    color?: Col;
    subcolor?: Col;
    background?: Col;
    seed?: Num;
  }
  export const crumpledFabric: {
    (params?: CrumpledFabricParams): Node<'vec3'>;
    defaults: Defaults<CrumpledFabricParams>;
  };

  /** dalmatian-spots.js: 'Dalmatian spots' */
  export interface DalmatianSpotsParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const dalmatianSpots: {
    (params?: DalmatianSpotsParams): Node<'vec3'>;
    defaults: Defaults<DalmatianSpotsParams>;
  };

  /** darth-maul.js: 'Darth Maul' */
  export interface DarthMaulParams {
    position?: Node;
    scale?: Num;
    shift?: Vec3;
    complexity?: Num;
    angle?: Num;
    distance?: Num;
    color?: Col;
    background?: Col;
    balance?: Num;
    seed?: Num;
  }
  export const darthMaul: {
    (params?: DarthMaulParams): Node<'vec3'>;
    defaults: Defaults<DarthMaulParams>;
  };

  /** dyson-sphere.js: 'Dyson sphere' */
  export interface DysonSphereParams {
    position?: Node;
    scale?: Num;
    complexity?: Num;
    variation?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const dysonSphere: {
    (params?: DysonSphereParams): Node<'vec3'>;
    defaults: Defaults<DysonSphereParams>;
  };

  /** entangled.js: 'Entangled' */
  export interface EntangledParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const entangled: {
    (params?: EntangledParams): Node<'vec3'>;
    defaults: Defaults<EntangledParams>;
  };

  /** fordite.js: 'Fordite' */
  export interface ForditeParams {
    position?: Node;
    scale?: Num;
    color?: Col;
    seed?: Num;
  }
  export const fordite: {
    (params?: ForditeParams): Node<'vec3'>;
    defaults: Defaults<ForditeParams>;
  };

  /** gas-giant.js: 'Gas giant' */
  export interface GasGiantParams {
    position?: Node;
    scale?: Num;
    turbulence?: Num;
    blur?: Num;
    colorA?: Col;
    colorB?: Col;
    colorC?: Col;
    seed?: Num;
  }
  export const gasGiant: {
    (params?: GasGiantParams): Node<'vec3'>;
    defaults: Defaults<GasGiantParams>;
  };

  /** grid.js: 'Grid' */
  export interface GridParams {
    uvs?: Node;
    countU?: Num;
    countV?: Num;
    aspect?: Num;
    thinness?: Num;
    equirectangular?: Flag;
    color?: Col;
    background?: Col;
  }
  export const grid: {
    (params?: GridParams): Node<'vec3'>;
    defaults: Defaults<GridParams>;
  };

  /** halftone.js: 'Halftone' */
  export interface HalftoneParams {
    position?: Node;
    scale?: Num;
    radius?: Num;
    pattern?: Num;
    attenuation?: Num;
    near?: Num;
    far?: Num;
    color?: Node;
    positionView?: Node;
  }
  export const halftone: {
    (params?: HalftoneParams): Node<'vec3'>;
    defaults: Defaults<HalftoneParams>;
  };

  /** isolayers.js: 'Isolayers' */
  export interface IsolayersParams {
    position?: Node;
    scale?: Num;
    layers?: Num;
    edge?: Num;
    darkness?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const isolayers: {
    (params?: IsolayersParams): Node<'vec3'>;
    defaults: Defaults<IsolayersParams>;
  };

  /** isolines.js: 'Isolines' */
  export interface IsolinesParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    blur?: Num;
    thinness?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const isolines: {
    (params?: IsolinesParams): Node<'vec3'>;
    defaults: Defaults<IsolinesParams>;
  };

  /** karst-rock.js: 'Karst rock' */
  export interface KarstRockParams {
    position?: Node;
    scale?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const karstRock: {
    (params?: KarstRockParams): Node<'vec3'>;
    defaults: Defaults<KarstRockParams>;
  };

  /** marble.js: 'Marble' */
  export interface MarbleParams {
    position?: Node;
    scale?: Num;
    thinness?: Num;
    noise?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const marble: {
    (params?: MarbleParams): Node<'vec3'>;
    defaults: Defaults<MarbleParams>;
  };

  /** neon-lights.js: 'Neon Lights' */
  export interface NeonLightsParams {
    position?: Node;
    scale?: Num;
    thinness?: Num;
    mode?: Node;
    colorA?: Col;
    colorB?: Col;
    colorC?: Col;
    background?: Col;
    seed?: Num;
  }
  export const neonLights: {
    (params?: NeonLightsParams): Node<'vec3'>;
    defaults: Defaults<NeonLightsParams>;
  };

  /** perlin-noise.js: 'Perlin noise' */
  export interface PerlinNoiseParams {
    position?: Node;
    scale?: Num;
    balance?: Num;
    contrast?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const perlinNoise: {
    (params?: PerlinNoiseParams): Node<'vec3'>;
    defaults: Defaults<PerlinNoiseParams>;
  };

  /** photosphere.js: 'Photosphere' */
  export interface PhotosphereParams {
    position?: Node;
    scale?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const photosphere: {
    (params?: PhotosphereParams): Node<'vec3'>;
    defaults: Defaults<PhotosphereParams>;
  };

  /** planet.js: 'Planet' */
  export interface PlanetParams {
    position?: Node;
    scale?: Num;
    iterations?: Num;
    levelSea?: Num;
    levelMountain?: Num;
    balanceWater?: Num;
    balanceSand?: Num;
    balanceSnow?: Num;
    colorDeep?: Col;
    colorShallow?: Col;
    colorBeach?: Col;
    colorGrass?: Col;
    colorForest?: Col;
    colorSnow?: Col;
    seed?: Num;
  }
  export const planet: {
    (params?: PlanetParams): Node<'vec3'>;
    defaults: Defaults<PlanetParams>;
  };

  /** polka-dots.js: 'Polka dots' */
  export interface PolkaDotsParams {
    position?: Node;
    count?: Num;
    size?: Num;
    blur?: Num;
    color?: Col;
    background?: Col;
    flat?: Num;
  }
  export const polkaDots: {
    (params?: PolkaDotsParams): Node<'vec3'>;
    defaults: Defaults<PolkaDotsParams>;
  };

  /** processed-wood.js: 'Processed wood' */
  export interface ProcessedWoodParams {
    position?: Node;
    scale?: Num;
    lengths?: Num;
    strength?: Num;
    angle?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const processedWood: {
    (params?: ProcessedWoodParams): Node<'vec3'>;
    defaults: Defaults<ProcessedWoodParams>;
  };

  /** protozoa.js: 'Protozoa' */
  export interface ProtozoaParams {
    position?: Node;
    matcap?: Node;
    scale?: Num;
    fat?: Num;
    amount?: Num;
    color?: Col;
    subcolor?: Col;
    background?: Col;
    seed?: Num;
  }
  export const protozoa: {
    (params?: ProtozoaParams): Node<'vec3'>;
    defaults: Defaults<ProtozoaParams>;
  };

  /** reticular-veins.js: 'Reticular veins' */
  export interface ReticularVeinsParams {
    position?: Node;
    scale?: Num;
    reticulation?: Num;
    strength?: Num;
    organelles?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const reticularVeins: {
    (params?: ReticularVeinsParams): Node<'vec3'>;
    defaults: Defaults<ReticularVeinsParams>;
  };

  /** roman-paving.js: 'Roman paving' */
  export interface RomanPavingParams {
    position?: Node;
    scale?: Num;
    depth?: Num;
    seed?: Num;
  }
  export const romanPaving: {
    (params?: RomanPavingParams): Node<'vec3'>;
    defaults: Defaults<RomanPavingParams>;
  };

  /** rotator.js: 'Rotator' */
  export interface RotatorParams {
    angles?: Vec3;
    center?: Vec3;
    selectorCenter?: Vec3;
    selectorAngles?: Vec2;
    selectorWidth?: Num;
  }
  export const rotator: {
    (params?: RotatorParams): Node<'vec3'>;
    normal(params?: RotatorParams): Node<'vec3'>;
    defaults: Defaults<RotatorParams>;
  };

  /** rough-clay.js: 'Rough clay' */
  export interface RoughClayParams {
    position?: Node;
    scale?: Num;
    bump?: Num;
    curvature?: Num;
    seed?: Num;
  }
  export const roughClay: {
    (params?: RoughClayParams): Node<'vec3'>;
    defaults: Defaults<RoughClayParams>;
  };

  /** runny-eggs.js: 'Runny eggs' */
  export interface RunnyEggsParams {
    position?: Node;
    scale?: Num;
    sizeYolk?: Num;
    sizeWhite?: Num;
    colorYolk?: Col;
    colorWhite?: Col;
    colorBackground?: Col;
    seed?: Num;
  }
  export const runnyEggs: {
    (params?: RunnyEggsParams): Node<'vec3'>;
    normal(params?: RunnyEggsParams): Node<'vec3'>;
    roughness(params?: RunnyEggsParams): Node<'float'>;
    defaults: Defaults<RunnyEggsParams>;
  };

  /** rust.js: 'rust' */
  export interface RustParams {
    position?: Node;
    scale?: Num;
    iterations?: Num;
    amount?: Num;
    opacity?: Num;
    noise?: Num;
    noiseScale?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const rust: {
    (params?: RustParams): Node<'vec3'>;
    opacity(params?: RustParams): Node<'float'>;
    defaults: Defaults<RustParams>;
  };

  /** satin.js: 'Satin' */
  export interface SatinParams {
    position?: Node;
    scale?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const satin: {
    (params?: SatinParams): Node<'vec3'>;
    defaults: Defaults<SatinParams>;
  };

  /** scaler.js: 'Scaler' */
  export interface ScalerParams {
    scales?: Vec3;
    center?: Vec3;
    selectorCenter?: Vec3;
    selectorAngles?: Vec2;
    selectorWidth?: Num;
  }
  export const scaler: {
    (params?: ScalerParams): Node<'vec3'>;
    normal(params?: ScalerParams): Node<'vec3'>;
    defaults: Defaults<ScalerParams>;
  };

  /** scepter-head.js: 'Scepter head' */
  export interface ScepterHeadParams {
    position?: Node;
    xFactor?: Num;
    yFactor?: Num;
    zFactor?: Num;
    colorRim?: Col;
    colorA?: Col;
    colorB?: Col;
  }
  export const scepterHead: {
    (params?: ScepterHeadParams): Node<'vec3'>;
    defaults: Defaults<ScepterHeadParams>;
  };

  /** scream.js: 'Scream' */
  export interface ScreamParams {
    position?: Node;
    scale?: Num;
    variety?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const scream: {
    (params?: ScreamParams): Node<'vec3'>;
    defaults: Defaults<ScreamParams>;
  };

  /** stars.js: 'Stars' */
  export interface StarsParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    variation?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const stars: {
    (params?: StarsParams): Node<'vec3'>;
    defaults: Defaults<StarsParams>;
  };

  /** static-noise.js: 'Static noise' */
  export interface StaticNoiseParams {
    position?: Node;
    time?: Node;
    scale?: Num;
    balance?: Num;
    contrast?: Num;
    delay?: Num;
    seed?: Num;
  }
  export const staticNoise: {
    (params?: StaticNoiseParams): Node<'vec3'>;
    defaults: Defaults<StaticNoiseParams>;
  };

  /** supersphere.js: 'Supersphere' */
  export interface SupersphereParams {
    exponent?: Num;
  }
  export const supersphere: {
    (params?: SupersphereParams): Node<'vec3'>;
    normal(params?: SupersphereParams): Node<'vec3'>;
    defaults: Defaults<SupersphereParams>;
  };

  /** tiger-fur.js: 'Tiger fur' */
  export interface TigerFurParams {
    position?: Node;
    scale?: Num;
    lengths?: Num;
    blur?: Num;
    strength?: Num;
    hairs?: Num;
    color?: Col;
    bottomColor?: Col;
    seed?: Num;
  }
  export const tigerFur: {
    (params?: TigerFurParams): Node<'vec3'>;
    defaults: Defaults<TigerFurParams>;
  };

  /** translator.js: 'Translator' */
  export interface TranslatorParams {
    distance?: Vec3;
    selectorCenter?: Vec3;
    selectorAngles?: Vec2;
    selectorWidth?: Num;
  }
  export const translator: {
    (params?: TranslatorParams): Node<'vec3'>;
    normal(params?: TranslatorParams): Node<'vec3'>;
    defaults: Defaults<TranslatorParams>;
  };

  /** turbulent-smoke.js: 'Turbulent smoke' */
  export interface TurbulentSmokeParams {
    position?: Node;
    scale?: Num;
    speed?: Num;
    details?: Num;
    time?: Node;
    seed?: Num;
  }
  export const turbulentSmoke: {
    (params?: TurbulentSmokeParams): Node<'vec3'>;
    defaults: Defaults<TurbulentSmokeParams>;
  };

  /** voronoi-cells.js: 'Voronoi cells' */
  export interface VoronoiCellsParams {
    position?: Node;
    scale?: Num;
    variation?: Num;
    facet?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const voronoiCells: {
    (params?: VoronoiCellsParams): Node<'vec3'>;
    defaults: Defaults<VoronoiCellsParams>;
  };

  /** water-drops.js: 'Water Drops' */
  export interface WaterDropsParams {
    position?: Node;
    scale?: Num;
    density?: Num;
    bump?: Num;
    seed?: Num;
  }
  export const waterDrops: {
    (params?: WaterDropsParams): Node<'vec3'>;
    defaults: Defaults<WaterDropsParams>;
  };

  /** watermelon.js: 'Watermelon' */
  export interface WatermelonParams {
    position?: Node;
    uvs?: Node;
    scale?: Num;
    stripes?: Num;
    variation?: Num;
    noise?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const watermelon: {
    (params?: WatermelonParams): Node<'vec3'>;
    defaults: Defaults<WatermelonParams>;
  };

  /** waves.js: 'Waves' */
  export interface WavesParams {
    position?: Node;
    scale?: Num;
    speed?: Num;
    time?: Node;
    level?: Num;
    rough?: Num;
    height?: Num;
    foamSize?: Num;
    foamEdge?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const waves: {
    (params?: WavesParams): Node<'vec3'>;
    opacity(params?: WavesParams): Node<'float'>;
    defaults: Defaults<WavesParams>;
  };

  /** wood.js: 'Wood' */
  export interface WoodParams {
    position?: Node;
    scale?: Num;
    rings?: Num;
    lengths?: Num;
    angle?: Num;
    fibers?: Num;
    fibersDensity?: Num;
    color?: Col;
    background?: Col;
    seed?: Num;
  }
  export const wood: {
    (params?: WoodParams): Node<'vec3'>;
    defaults: Defaults<WoodParams>;
  };

  /** zebra-lines.js: 'Zebra lines' */
  export interface ZebraLinesParams {
    position?: Node;
    scale?: Num;
    thinness?: Num;
    phi?: Num;
    theta?: Num;
    color?: Col;
    background?: Col;
    flat?: Num;
  }
  export const zebraLines: {
    (params?: ZebraLinesParams): Node<'vec3'>;
    defaults: Defaults<ZebraLinesParams>;
  };
}
