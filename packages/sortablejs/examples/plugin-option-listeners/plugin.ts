// A Sortable plugin whose option is watched: labels items 1, 2, 3 or A, B, C
import Sortable from 'sortablejs';

export type LabelMode = 'none' | 'numbers' | 'letters';

interface Labeler {
  sortable: Sortable;
  mode: LabelMode;
  relabel(): void;
}

function Labels(this: Labeler, sortable: Sortable): void {
  this.mode = 'none';
  this.relabel = () => {
    [...sortable.el.children].forEach((item, i) => {
      if (item.classList.contains('sortable-fallback')) return;
      const text = this.mode === 'numbers' ? String(i + 1) : this.mode === 'letters' ? String.fromCharCode(65 + (i % 26)) : '';
      if (text) (item as HTMLElement).dataset['label'] = text;
      else delete (item as HTMLElement).dataset['label'];
    });
  };
}

Labels.prototype = {
  // Keep the labels right after every drop too.
  drop(this: Labeler) {
    this.relabel();
  },
};

Object.assign(Labels, {
  pluginName: 'labels',
  initializeByDefault: false,
  // Runs whenever the option changes: in the options object at creation and in sortable.option('labels', ...).
  // `this` is this list's plugin instance. What it returns is what gets stored as the option.
  optionListeners: {
    labels(this: Labeler, value: string): LabelMode {
      const mode = String(value).trim().toLowerCase();
      this.mode = mode === 'numbers' || mode === 'letters' ? mode : 'none';
      this.relabel();
      return this.mode; // so "  LETTERS " is stored as 'letters'
    },
  },
});

export default Labels;
