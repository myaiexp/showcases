// An event-set stand-in written from the guides' prose: setAttribute calls fired by events
import type { AFrame, Entity } from './types.ts';

/**
 * The interactions page and the 360 guide use a community `event-set` component, which is
 * off limits here. This one follows the prose the docs give: `event-set__id="_event: name;
 * property: value"`; `_target: selector` picks another entity; `_delay` waits ms; a name like
 * `material.src` sets one property of a multi-property component. Instances are told apart
 * by `__id`, so the component is `multiple`. Extra properties are read from the attribute text
 * the markup gave (parsed with `styleParser`), because the schema drops what it does not list.
 */
export function registerEventSet(AFRAME: AFrame): void {
  AFRAME.registerComponent<{ _event: string; _target: Entity | null; _delay: number }>('event-set', {
    multiple: true,
    schema: {
      _event: { type: 'string' },
      _target: { type: 'selector' },
      _delay: { type: 'number', default: 0 },
    },
    init() {
      this.handler = () => {
        const target = this.data._target ?? this.el;
        const apply = (): void => {
          for (const [key, value] of Object.entries(this.sets as Record<string, string>)) {
            const dot = key.indexOf('.');
            if (dot > 0) target.setAttribute(key.slice(0, dot), key.slice(dot + 1), value);
            else target.setAttribute(key, value);
          }
        };
        if (this.data._delay) this.timer = setTimeout(apply, this.data._delay);
        else apply();
      };
    },
    update() {
      const event = this.data._event || this.id || '';
      if (this.listening) this.el.removeEventListener(this.listening, this.handler);
      this.el.addEventListener(event, this.handler);
      this.listening = event;
      this.sets = {};
      // The schema drops unknown properties, so read the attribute text the markup gave.
      const raw = Element.prototype.getAttribute.call(this.el, this.attrName) as string | null;
      const given = raw ? (AFRAME.utils.styleParser.parse(raw) as Record<string, unknown>) : (this.attrValue as Record<string, unknown>);
      for (const [key, value] of Object.entries(given)) {
        if (!key.startsWith('_') && value !== undefined) (this.sets as Record<string, unknown>)[key] = value;
      }
    },
    remove() {
      if (this.listening) this.el.removeEventListener(this.listening, this.handler);
      clearTimeout(this.timer);
    },
  });
}
