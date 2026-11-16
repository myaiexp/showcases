// A tiny stand-in for the docs' Vue proxyData.ts: a reactive proxy over an element's data, page-wide while mounted
import { defineKey, UI, type IUIInputData } from 'leafer-ui';
import type { Stage } from '../../shared/stage.ts';

type Listener = (name: string, value: unknown) => void;
type Hooks = { createProxyData?: unknown; clearProxyData?: unknown; setProxyAttr?: unknown; getProxyAttr?: unknown };

/** Subscribers per element: `subscribe(ui, fn)` hears every first-level write to the proxy. */
const listeners = new WeakMap<object, Set<Listener>>();

export function subscribe(ui: object, fn: Listener): void {
  let set = listeners.get(ui);
  if (!set) listeners.set(ui, (set = new Set()));
  set.add(fn);
}

/**
 * Installs the four hooks the docs override (proxyData getter, createProxyData, clearProxyData,
 * setProxyAttr, getProxyAttr) with a plain `Proxy` instead of Vue's `shallowReactive`: only
 * first-level properties are reactive, as the docs say. Restores the originals on dispose.
 */
/**
 * Mounted proxy examples on the page. Both proxy examples carry a copy of this file, so the count
 * lives on globalThis: the hooks go in with the first mount and come out with the last unmount,
 * never under another example that still uses them.
 */
const COUNT = Symbol.for('showcases.leafer-ui.proxyData');
const counter = globalThis as unknown as Record<symbol, { n: number; restore: () => void } | undefined>;

export function installProxyData(stage: Stage): void {
  const live = counter[COUNT];
  if (live) live.n++;
  else counter[COUNT] = { n: 1, restore: install() };
  // the engine is destroyed right after the dispose callbacks and still calls setProxyAttr: restore a tick later
  stage.onDispose(() =>
    queueMicrotask(() => {
      const c = counter[COUNT];
      if (c && --c.n === 0) {
        c.restore();
        counter[COUNT] = undefined;
      }
    }),
  );
}

/** Puts the hooks on UI.prototype and returns the function that takes them off again. */
function install(): () => void {
  const proto = UI.prototype as unknown as Record<string, unknown> & Hooks;
  const saved = {
    createProxyData: proto.createProxyData,
    clearProxyData: proto.clearProxyData,
    setProxyAttr: proto.setProxyAttr,
    getProxyAttr: proto.getProxyAttr,
  };
  const descriptor = Object.getOwnPropertyDescriptor(proto, 'proxyData');
  defineKey(UI.prototype, 'proxyData', {
    get(this: Record<string, unknown>) {
      return this.__proxyData ? this.__proxyData : (this.__proxyData = (this.createProxyData as () => unknown)());
    },
  });
  proto.setProxyAttr = function (this: Record<string, any>, name: string, newValue: unknown): void {
    const data = this.__proxyData as Record<string, unknown>;
    if (data[name] !== newValue) data[name] = newValue;
  };
  proto.getProxyAttr = function (this: Record<string, any>, name: string): unknown {
    const value = (this.__proxyData as Record<string, unknown>)[name];
    return value === undefined ? this.__.__get(name) : value;
  };
  proto.createProxyData = function (this: Record<string, any>): IUIInputData {
    const target = this.__.__getData() as Record<string, unknown>;
    return new Proxy(target, {
      set: (obj, name: string, value) => {
        const changed = obj[name] !== value;
        obj[name] = value;
        if (changed) {
          if (this.__.__get(name) !== value) this[name] = value; // sync back to the element
          listeners.get(this)?.forEach((fn) => fn(name, value));
        }
        return true;
      },
    }) as IUIInputData;
  };
  proto.clearProxyData = function (this: Record<string, any>): void {
    if (this.__proxyData) delete this.__proxyData;
  };
  return () => {
    Object.assign(proto, saved);
    if (descriptor) Object.defineProperty(proto, 'proxyData', descriptor);
    else delete proto.proxyData;
  };
}
