// The iframe's own page: three labelled boxes down a tall smooth-content element
export const PAGE_CSS = `
#smooth-content { height: 2600px; position: relative; }
.box { position: absolute; left: 50%; width: 150px; height: 90px; margin-left: -75px; border-radius: 12px;
  display: grid; place-items: center; font: 700 14px var(--font-mono, monospace); color: #111; }
#box1 { top: 520px; background: var(--cyan, #5bd); }
#box2 { top: 1200px; background: var(--orange, #f93); }
#box3 { top: 1900px; background: var(--accent); }
.hint { padding: 14px; color: var(--fg-2); }
`;

export const PAGE_HTML = `
<div id="smooth-wrapper"><div id="smooth-content">
  <p class="hint">Use the buttons under this frame, or scroll.</p>
  <div class="box" id="box1">#box1</div>
  <div class="box" id="box2">#box2</div>
  <div class="box" id="box3">#box3</div>
</div></div>`;
