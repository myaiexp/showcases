// Types for css-doodle's untyped module entries: generator, meta, parser, addons
// Ambient declarations: this file must not import (that would make them augmentations).

declare module 'css-doodle/generator' {
  export interface ImageResult {
    svg: string;
    seed: string | number;
    /** 'shader' when @shaders, @pattern or @scene images were left out. */
    needs: string[];
    warnings: import('./types.ts').DoodleWarning[];
  }
  export interface PrerenderResult {
    html: string;
    seed: string | number;
    needs: string[];
    warnings: import('./types.ts').DoodleWarning[];
  }
  export function image(code: string, options?: { seed?: string | number; width?: number | string; height?: number | string }): Promise<ImageResult>;
  export function prerender(
    code: string,
    options?: { seed?: string | number; attributes?: Record<string, string | number | boolean>; variables?: Record<string, string> },
  ): Promise<PrerenderResult>;
  /** SVG markup from @svg code. */
  export const svg: ((rules: string, options?: { seed?: string | number }) => string) & {
    element(rules: string, options?: { seed?: string | number }): SVGSVGElement | undefined;
  };
  /** A polygon() or shape() from @shape code. */
  export function shape(...args: string[]): string;
}

declare module 'css-doodle/meta' {
  export const functions: { names: string[]; alias: Record<string, string>; variants: Record<string, string[]> };
  export const mathFunctions: string[];
  export const selectors: { names: string[]; alias: Record<string, string> };
  export const properties: { names: string[]; alias: Record<string, string> };
  export const calcOperators: Record<string, number>;
}

declare module 'css-doodle/parser' {
  export function parseCss(source: string, extra?: unknown): unknown;
  export function parseGrid(source: string, options?: unknown): unknown;
  export function parseShapeCommands(source: string): unknown;
  export function parseSvg(source: string): unknown;
  export function parsePattern(source: string): unknown;
  export function parseShaders(source: string): unknown;
  export function parseSvgPath(source: string): unknown;
  export function parseValueGroup(source: string, options?: unknown): Iterable<string>;
  export function parseCompoundValue(source: string): unknown;
  export function parseDirection(source: string): unknown;
  export function parseVar(source: string): unknown;
  export function tokenizer(source: string): unknown[];
}

declare module 'css-doodle/component' {
  export const CSSDoodle: CustomElementConstructor;
  export function define(name: string, element?: CustomElementConstructor): void;
}

declare module '@css-doodle/addons/*';
