// A declared-but-empty data set filled by the View API: view.change streams rows into the chart
import * as vega from "vega";
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { rng } from "../../shared/cards.ts";
import { toggle } from "../../shared/controls.ts";
import { createStage } from "../../shared/stage.ts";

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 8,
    // The x axis follows the newest tick; a fixed domain also keeps the empty first pass quiet.
    signals: [{ name: "tNow", value: 14 }],
    data: [
      // Only a name: "simply declare the existence of a data set". The rows come from the page.
      { name: "table" },
    ],
    scales: [
      {
        name: "x",
        type: "linear",
        domain: { signal: "[tNow - 14, tNow]" },
        range: "width",
      },
      { name: "y", type: "linear", domain: [-10, 10], range: "height" },
    ],
    axes: [
      { orient: "bottom", scale: "x", tickMinStep: 1 },
      { orient: "left", scale: "y" },
    ],
    marks: [
      {
        type: "line",
        from: { data: "table" },
        encode: {
          update: {
            x: { scale: "x", field: "t" },
            y: { scale: "y", field: "v" },
            stroke: { value: "steelblue" },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: "symbol",
        from: { data: "table" },
        encode: {
          update: {
            x: { scale: "x", field: "t" },
            y: { scale: "y", field: "v" },
            size: { value: 30 },
            fill: { value: "orange" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // A random walk, one point per tick: insert the newest point and remove the one that fell off.
  const rand = rng(33);
  let t = 0;
  let v = 0;
  let running = true;
  const push = (): Promise<void> => {
    t += 1;
    v = Math.max(-9, Math.min(9, v + (rand() - 0.5) * 6));
    const cs = vega.changeset().insert([{ t, v }]);
    if (t > 14) cs.remove((d: { t: number }) => d.t <= t - 14);
    view.signal("tNow", Math.max(14, t));
    return view
      .change("table", cs)
      .runAsync()
      .then(() => undefined);
  };
  for (let i = 0; i < 6; i++) await push();
  stage.every(stage.preview ? 450 : 600, () => (running ? push() : undefined));
  if (stage.bar) toggle(stage.bar, "streaming", true, (on) => (running = on));
  return () => stage.dispose();
};

export default mount;
