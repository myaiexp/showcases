<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/cursor.html -->

# Editor Configuration 

### Basic     Events     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Cursor style configuration. Can be updated in real time during runtime via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### moveCursor: `ICursorType` 

Sets the move cursor style.

### resizeCursor: `IImageCursor` 

Sets the resize cursor. Supports rotation variables.

ts

```
{
  url: `
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate({{rotation}},12,12)">
    <path
      fill-rule="evenodd"
      d="M3 11.4L7.5 8.0V10.4H16.5V8.0L21 11.4L16.5 14.9V12.4H7.5V14.9L3 11.4Z"
      fill="black"
    />
  </g>
</svg>` // SVG string, {{rotation}} is a dynamic variable
  x: 12 // x-axis rotation center
  y: 12 // y-axis rotation center
}
```

### rotateCursor: `IImageCursor` 

Sets the rotate cursor. Supports rotation variables.

ts

```
{
  url: `
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(135,12,12),rotate({{rotation}},12,12)">
    <path
      fill-rule="evenodd"
      d="M17 3L20.4 7.5H17.9C17.7 13.1 13.1 17.7 7.5 17.9V20.4L3 17L7.5 13.5V15.9C12.0 15.7 15.7 12.0 15.9 7.5H13.5L17 3Z"
      fill="black"
    />
  </g>
</svg>` // SVG string, {{rotation}} is a dynamic variable
  x: 12 // x-axis rotation center
  y: 12 // y-axis rotation center
}
```

### skewCursor: `IImageCursor` 

Sets the skew cursor. Supports rotation variables.

ts

```
{
  url: `
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(90,12,12),rotate({{rotation}},12,12)">
    <path
      fill-rule="evenodd"
      d="M17 10.4L21 10.4L15.5 6V8.4H6V10.4H15.5H17ZM8.5 14.4H7L3 14.4L8.5 18.9V16.4H19V14.4H8.5Z"
      fill="black"
    />
  </g>
</svg>` // SVG string, {{rotation}} is a dynamic variable
  x: 12 // x-axis rotation center
  y: 12 // y-axis rotation center
}
```
