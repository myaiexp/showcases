// Loads the classic EaselJS script once per page and types the few createjs members this example touches
import easelUrl from 'easeljs/lib/easeljs.min.js?url';

export interface EaselGraphics {
  beginFill(color: string): EaselGraphics;
  drawCircle(x: number, y: number, r: number): EaselGraphics;
  drawRoundRect(x: number, y: number, w: number, h: number, r: number): EaselGraphics;
  drawRect(x: number, y: number, w: number, h: number): EaselGraphics;
  endFill(): EaselGraphics;
}
export interface EaselShape {
  graphics: EaselGraphics;
  x: number;
  y: number;
  cache(x: number, y: number, w: number, h: number): void;
}
export interface EaselStage {
  addChild(child: EaselShape): void;
  removeAllChildren(): void;
  update(): void;
}
export interface CreateJS {
  Stage: new (canvas: HTMLCanvasElement) => EaselStage;
  Shape: new () => EaselShape;
}

let loading: Promise<CreateJS> | undefined;

/** easeljs.min.js is not an ES module: it is a classic script that sets window.createjs. */
export function loadCreateJS(): Promise<CreateJS> {
  const w = window as unknown as { createjs?: CreateJS };
  if (w.createjs?.Stage) return Promise.resolve(w.createjs);
  loading ??= new Promise<CreateJS>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = easelUrl;
    s.onload = (): void => (w.createjs ? resolve(w.createjs) : reject(new Error('createjs missing after load')));
    s.onerror = (): void => {
      loading = undefined;
      reject(new Error('could not load easeljs'));
    };
    document.head.append(s);
  });
  return loading;
}
