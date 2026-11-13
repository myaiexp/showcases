// ScrollTrigger snap: a scrubbed timeline settles on its labels, or on a progress array
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { Mount } from "@/types.ts";
import "./style.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LABELS = ["one", "two", "three", "four"];

const div = (cls: string, text = ""): HTMLDivElement => {
  const d = document.createElement("div");
  d.className = cls;
  d.textContent = text;
  return d;
};

const mount: Mount = (el, { preview }) => {
  const scroller = div("scroller");
  const content = div("content");
  const stage = div("stage");
  const track = div("track");
  const dot = div("dot");
  track.append(dot);
  LABELS.forEach((name, i) => {
    const tick = div("tick", name);
    tick.style.left = `${(i / (LABELS.length - 1)) * 100}%`;
    track.append(tick);
  });
  stage.append(track);
  content.append(stage);
  scroller.append(content);
  el.append(scroller);

  const readout = document.createElement("p");
  readout.className = "readout";
  let tl: gsap.core.Timeline | undefined;
  let mode = "labelsDirectional";
  let scrollTween: gsap.core.Tween | undefined;
  // Each scroll is a new tween; keep it out of the context and replace the last one by hand.
  const scrollTo = (y: number): void => {
    ctx.ignore(() => {
      scrollTween?.kill();
      scrollTween = gsap.to(scroller, { scrollTo: y, duration: 0.5 });
    });
  };

  const ctx = gsap.context((self) => {
    // One scrubbed timeline with a label per station. `snap` pulls the scroll position
    // to a label once scrolling stops.
    self.add("build", (snapMode: string) => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      mode = snapMode;
      const snapTo =
        snapMode === "array"
          ? [0, 0.5, 1]
          : snapMode === "labels"
            ? ("labels" as const)
            : ("labelsDirectional" as const);
      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          scroller,
          trigger: content,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          snap: {
            snapTo,
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1,
            ease: "power1.inOut",
            onComplete: () => {
              readout.textContent = `snap: ${mode} settled at ${((tl?.scrollTrigger?.progress ?? 0) * 100).toFixed(0)}%`;
            },
          },
        },
      });
      tl.addLabel(LABELS[0] ?? "one");
      LABELS.slice(1).forEach((name, i) => {
        tl?.to(dot, {
          left: `${((i + 1) / (LABELS.length - 1)) * 100}%`,
          backgroundColor: `hsl(${(i + 1) * 70} 70% 55%)`,
        });
        tl?.addLabel(name);
      });
    });
    self.build(preview ? "labels" : "labelsDirectional");

    self.add("go", (label: string) => {
      const y = tl?.scrollTrigger?.labelToScroll(label);
      if (y !== undefined) scrollTo(y);
    });

    if (preview) {
      // Nudge the scroller forward by small amounts; snap finishes each move on a label.
      let i = 0;
      const step = (): void => {
        i = (i + 1) % LABELS.length;
        const max = scroller.scrollHeight - scroller.clientHeight;
        const nudge = (i / (LABELS.length - 1)) * max + (i === 0 ? 0 : -18);
        scrollTo(Math.max(0, nudge));
      };
      // One repeating tween drives the loop; a fresh delayedCall per round would be recorded each time.
      gsap.delayedCall(0.8, step);
      gsap.to({}, { duration: 1.6, delay: 0.8, repeat: -1, onRepeat: step });
    }
  }, el);

  if (!preview) {
    const bar = div("bar");
    const select = document.createElement("select");
    for (const [v, t] of [
      ["labelsDirectional", 'snap: "labelsDirectional"'],
      ["labels", 'snap: "labels"'],
      ["array", "snap: [0, 0.5, 1]"],
    ] as const) {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t;
      select.append(o);
    }
    select.addEventListener("change", () => ctx.build(select.value));
    bar.append(select);
    for (const name of LABELS) {
      const b = document.createElement("button");
      b.className = "btn";
      b.textContent = name;
      b.addEventListener("click", () => ctx.go(name));
      bar.append(b);
    }
    el.append(bar, readout);
    readout.textContent =
      "Scroll the box and stop: it settles on a label. The buttons use labelToScroll().";
  }

  return () => {
    scrollTween?.kill();
    ctx.revert();
  };
};

export default mount;
