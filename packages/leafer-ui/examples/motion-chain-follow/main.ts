// Motion: a snake of links, each placed behind the head with getMotionPoint
import { Group, Leafer, Ellipse } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { track } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The head runs the path; every link asks the path for a point a little behind it. Positions wrap around the end.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const path = track(stage, { dashPattern: undefined, stroke: 'rgba(0,0,0,0.12)' });
  const count = stage.preview ? 14 : 22;
  const links = Array.from({ length: count }, (_, i) => {
    const r = (stage.preview ? 5 : 8) * (1 - (i / count) * 0.6) + 2;
    return new Ellipse({ width: r * 2, height: r * 2, around: 'center', fill: i === 0 ? '#ff4b4b' : '#32cd79', opacity: 1 - i / (count * 1.4) });
  });
  group.add([path, ...links]);
  leafer.add(group);

  const total = path.getMotionTotal();
  const gap = total / (count * 2.2);
  stage.loop((_dt, t) => {
    const head = (t * total * 0.2) % total; // 20% of the path per second
    links.forEach((link, i) => {
      const at = (((head - i * gap) % total) + total) % total;
      link.set(path.getMotionPoint(at));
      link.rotation = 0;
    });
  });
  return stage.dispose;
};

export default mount;
