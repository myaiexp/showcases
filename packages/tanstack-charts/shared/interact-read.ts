// A one-call reader: a readout panel in the full view, the caption line in a card
import type { Stage } from './stage.ts';

export function reader(stage: Stage): (text: string) => void {
  if (stage.preview) return (text) => stage.say(text);
  const pre = stage.readout();
  return (text) => {
    pre.textContent = text;
  };
}
