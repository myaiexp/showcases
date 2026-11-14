// Worker: says ready, then parses each Markdown string it is sent
import { marked } from 'marked';

self.onmessage = (e: MessageEvent<string>): void => {
  const started = performance.now();
  const html = marked.parse(e.data, { async: false });
  self.postMessage({ html, ms: performance.now() - started });
};

// The page starts its stopwatch only once the worker has loaded Marked.
self.postMessage('ready');
