// config events.defaults: which view events have their default browser action suppressed
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "prevent: true" | 'allow: ["wheel"]' | "prevent: false";
const configs: Record<Mode, Config> = {
  "prevent: true": { events: { defaults: { prevent: true } } },
  // Everything is prevented except the listed event types.
  'allow: ["wheel"]': { events: { defaults: { allow: ["wheel"] } } },
  "prevent: false": { events: { defaults: { prevent: false } } },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 150,
    padding: 8,
    config: configs[mode],
    // Vega calls preventDefault on the browser event before the signal sees it, so the event's own
    // defaultPrevented flag tells what the config decided.
    signals: [
      {
        name: "wheelPrevented",
        value: null,
        on: [{ events: "wheel", update: "event.defaultPrevented" }],
      },
      {
        name: "downPrevented",
        value: null,
        on: [{ events: "mousedown", update: "event.defaultPrevented" }],
      },
    ],
    encode: { enter: { fill: { value: "#2c3a5a" } } },
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 12 },
            y: { value: 26 },
            fontSize: { value: 15 },
            text: { value: JSON.stringify(configs[mode].events) },
          },
        },
      },
      ...(["wheel", "mousedown"] as const).map((type, i) => {
        const sig = type === "wheel" ? "wheelPrevented" : "downPrevented";
        return {
          type: "text" as const,
          encode: {
            update: {
              x: { value: 12 },
              y: { value: 70 + i * 32 },
              fontSize: { value: 15 },
              fill: { signal: `${sig} ? '#e0b252' : '#aaa'` },
              text: {
                signal: `'${type}: ' + (${sig} === null ? 'try it on the chart' : ${sig} ? 'default prevented' : 'default allowed')`,
              },
            },
          },
        };
      }),
    ],
  });

  const names = Object.keys(configs) as Mode[];
  const m = await modes(stage, names, make, {
    label: "events.defaults",
    ms: 2800,
  });
  // Cards: a pretend wheel turn and press on the view, shortly after each new mode appears.
  if (stage.preview) {
    stage.every(1400, () => {
      const ghost = stage.ghost(m.view());
      ghost.wheel(100, 100, 40);
      ghost.down(100, 100);
    });
  }
  return () => stage.dispose();
};

export default mount;
