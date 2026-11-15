// Types for the parts of A-Frame 1.8's API the examples use (aframe ships none)
import type * as THREE_NS from 'three';

/**
 * Written from node_modules/aframe/src (core/a-entity.js, core/component.js, core/system.js,
 * core/scene/a-scene.js, index.js) and the vendored docs (core/*.md). Data is loosely typed on
 * purpose: a component's data shape comes from its schema at runtime, so each example narrows
 * `this.data` with the generic parameter of registerComponent.
 */

export type THREE = typeof THREE_NS;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Data = Record<string, any>;

export interface Coords {
  x: number;
  y: number;
  z: number;
}

/** One property of a schema: `{ type: 'number', default: 1 }`, or a bare default value. */
export interface PropertyDef {
  type?: string;
  default?: unknown;
  oneOf?: readonly unknown[];
  is?: 'uniform' | string;
  min?: number;
  max?: number;
  parse?: (value: any) => any;
  stringify?: (value: any) => string;
}

export type Schema = PropertyDef | Record<string, PropertyDef | string | number | boolean>;

/** A component instance, the `this` of its handlers. */
export interface Component<D = Data> {
  el: Entity;
  data: D;
  attrName: string;
  id: string | undefined;
  name: string;
  schema: Schema;
  system: any;
  isPlaying: boolean;
  flushToDOM(isDefault?: boolean): void;
  [key: string]: any;
}

export interface ComponentHandlers<D> {
  schema?: Schema;
  dependencies?: string[];
  multiple?: boolean;
  sceneOnly?: boolean;
  events?: Record<string, (this: Component<D>, evt: any) => void>;
  init?(): void;
  update?(oldData: D): void;
  updateSchema?(data: D): void;
  tick?(time: number, timeDelta: number): void;
  tock?(time: number, timeDelta: number, camera: THREE_NS.Camera): void;
  remove?(): void;
  pause?(): void;
  play?(): void;
}

export interface System<D = Data> {
  el: Scene;
  sceneEl: Scene;
  data: D;
  schema: Schema;
  [key: string]: any;
}

export interface SystemHandlers {
  schema?: Schema;
  init?(): void;
  tick?(time: number, timeDelta: number): void;
  tock?(time: number, timeDelta: number): void;
  pause?(): void;
  play?(): void;
}

/** What `el.getAttribute(name)` returns for a component: its parsed data, or a string. */
export interface Entity extends HTMLElement {
  object3D: THREE_NS.Object3D;
  object3DMap: Record<string, THREE_NS.Object3D>;
  sceneEl: Scene;
  components: Record<string, Component>;
  hasLoaded: boolean;
  isPlaying: boolean;
  states: string[];
  /** A-Frame events are CustomEvents with a `detail` (click, mouseenter, componentchanged, …). */
  addEventListener(type: string, listener: (evt: any) => void, options?: boolean | AddEventListenerOptions): void;
  /** Children of an entity are entities (or plain elements typed by the caller). */
  querySelector<E extends Element = Entity>(selectors: string): E | null;
  querySelectorAll<E extends Element = Entity>(selectors: string): NodeListOf<E>;
  getAttribute(name: string): any;
  getDOMAttribute(name: string): any;
  setAttribute(name: string, value?: any): void;
  setAttribute(name: string, property: string, value: any): void;
  getObject3D(type: string): THREE_NS.Object3D | undefined;
  setObject3D(type: string, obj: THREE_NS.Object3D): void;
  removeObject3D(type: string): void;
  getOrCreateObject3D(type: string, Constructor: new () => THREE_NS.Object3D): THREE_NS.Object3D;
  emit(name: string, detail?: unknown, bubbles?: boolean, extraData?: unknown): void;
  addState(name: string): void;
  removeState(name: string): void;
  is(state: string): boolean;
  play(): void;
  pause(): void;
  flushToDOM(recursive?: boolean): void;
  removeAttribute(name: string, property?: string): void;
  initComponent(name: string, data?: unknown, isDefault?: boolean): void;
  updateComponent(name: string, data?: unknown, clobber?: boolean): void;
}

export interface Scene extends Entity {
  object3D: THREE_NS.Scene;
  renderer: THREE_NS.WebGLRenderer;
  /** The active camera; A-Frame sets `el` to its entity (camera.js). */
  camera: THREE_NS.PerspectiveCamera & { el: Entity };
  canvas: HTMLCanvasElement;
  systems: Record<string, any>;
  time: number;
  delta: number;
  renderStarted: boolean;
  audioListener?: THREE_NS.AudioListener;
  enterVR(useAR?: boolean): Promise<void>;
  exitVR(): Promise<void>;
  resize(): void;
}

export interface Utils {
  coordinates: { parse(value: string | Coords): Coords; stringify(value: Coords): string; isCoordinates(value: string): boolean };
  styleParser: { parse(value: string): Data; stringify(value: Data): string };
  device: Record<string, (...args: any[]) => any>;
  throttle<F extends (...args: any[]) => void>(fn: F, ms: number, ctx?: unknown): F;
  throttleTick<F extends (t: number, dt: number) => void>(fn: F, ms: number, ctx?: unknown): F;
  debug(namespace: string): (...args: unknown[]) => void;
  entity: { getComponentProperty(el: Entity, name: string, delimiter?: string): any; setComponentProperty(el: Entity, name: string, value: unknown, delimiter?: string): void };
  extend<T extends object>(target: T, ...sources: object[]): T;
  diff(a: Data, b: Data): Data;
  splitString(str: string, delimiter?: string): string[];
  getUrlParameter(name: string): string;
  [key: string]: any;
}

/** The AFRAME global (index.js), as the iframe's copy of it. */
export interface AFrame {
  version: string;
  THREE: THREE;
  ANIME: any;
  utils: Utils;
  schema: any;
  components: Record<string, { Component: new (...args: any[]) => Component; schema: Schema; [key: string]: any }>;
  systems: Record<string, any>;
  primitives: { getMeshMixin(): Data; primitives: Record<string, any> };
  geometries: Record<string, any>;
  shaders: Record<string, any>;
  scenes: Scene[];
  registerComponent<D = Data, M extends object = Record<never, never>>(
    name: string,
    definition: ComponentHandlers<D> & M & ThisType<Component<D> & M>,
  ): unknown;
  registerSystem<D = Data, M extends object = Record<never, never>>(name: string, definition: SystemHandlers & M & ThisType<System<D> & M>): unknown;
  registerPrimitive(name: string, definition: { defaultComponents?: Data; mappings?: Record<string, string>; deprecated?: boolean }): unknown;
  registerShader<M extends object = Record<never, never>>(name: string, definition: Data & M & ThisType<Data & M>): unknown;
  registerGeometry<M extends object = Record<never, never>>(name: string, definition: Data & M & ThisType<Data & M & { geometry: THREE_NS.BufferGeometry }>): unknown;
  emitReady(): void;
}
