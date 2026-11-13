// Message batch and the worker protocol types for the layout-in-a-worker example
export const MESSAGES: string[] = [
  'Pretext is running in a worker, so this height was computed off the main thread.',
  'AGI 春天到了. بدأت الرحلة 🚀',
  'Short one.',
  'The page language is sent to the worker, because a worker has no <html lang>.',
  '他说“OK”然后离开了，我们一起吃了很多好吃的东西。',
  'Prepared once in the worker; every new width afterwards is only layout().',
  'ちょっと待ってください。ラーメンとコーヒーをください。',
  'Heights come back as plain numbers: handles stay in the worker.',
];

export type ToWorker =
  | { type: 'init'; lang: string; fontUrl: string; texts: string[] }
  | { type: 'layout'; id: number; width: number };

export type FromWorker =
  | { type: 'ready'; lang: string; fontSource: string }
  | { type: 'error'; message: string }
  | { type: 'heights'; id: number; heights: number[]; lineCounts: number[]; micros: number };

export const FONT_SIZE = 16;
export const LINE_HEIGHT = 22;
