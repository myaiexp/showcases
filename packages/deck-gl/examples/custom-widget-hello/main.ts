// The smallest custom widget: a Widget subclass with a text prop set via setProps
import { Deck } from '@deck.gl/core';
import type { MapViewState, WidgetPlacement } from '@deck.gl/core';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { HelloWidget } from './hello-widget.ts';

const GREETINGS = ['Hello, deck.gl!', 'A widget is a class', 'onRenderHTML draws it', 'setProps updates it'];
const PLACEMENTS: readonly WidgetPlacement[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1 : 1.6 };
  let placement: WidgetPlacement = 'top-left';
  const hello = new HelloWidget({ text: GREETINGS[0], placement });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer()],
    widgets: [hello],
  });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 5) } }));
    let i = 0;
    timer = window.setInterval(() => hello.setProps({ text: GREETINGS[++i % GREETINGS.length] }), 1400);
  } else {
    const bar = controlBar(el);
    select(bar, 'text', GREETINGS, (v) => hello.setProps({ text: v }));
    select(bar, 'placement', PLACEMENTS, (v) => {
      placement = v;
      // A widget with the same id but another placement is removed and added again (onRemove, onAdd).
      deck.setProps({ widgets: [new HelloWidget({ text: hello.props.text, placement })] });
    });
    readout(el, 'new HelloWidget({ text, placement }) in the Deck\'s widgets prop');
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
