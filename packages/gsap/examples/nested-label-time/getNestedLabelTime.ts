// The official getNestedLabelTime() helper, copied from the docs (typed only)
// Source: docs/v3/HelperFunctions/helpers/getNestedLabelTime
// Labels are timeline-specific, so a timeline can't seek to a label that lives in a nested
// timeline. This finds the nested label and works out where it lines up on the parent timeline.
export function getNestedLabelTime(timeline: gsap.core.Timeline, label: string): number | undefined {
  const children = timeline.getChildren(true, false, true) as gsap.core.Timeline[];
  let i = children.length;
  let tl: gsap.core.Timeline | null = null;
  let time: number | undefined;
  while (i--) {
    const child = children[i] as gsap.core.Timeline;
    if (label in child.labels) {
      tl = child;
      time = tl.labels[label];
      break;
    }
  }
  if (tl && time !== undefined) {
    while (tl !== timeline) {
      time = tl.startTime() + time / tl.timeScale();
      tl = tl.parent as gsap.core.Timeline;
    }
  }
  return time;
}
