<!-- source: https://www.leaferjs.com/ui/en/guide/performance.html -->

# Performance Experience 

LeaferJS gives you the ability to instantly create 1 million graphics. Through more granular code modularization, we achieve high performance without sacrificing maintainability, and we expect significant performance improvements in the future.

## Creation Speed 

Creating 1 million interactive rectangles takes only about 1.5 seconds for initial rendering.

Around 10× faster than similar engines.

## Memory Usage 

Creating 1 million interactive rectangles consumes only about 350MB of memory.

Around 10× more efficient than similar engines.

## Example Code 

Below is an example that creates 1 million rectangles. You can copy and use it directly. It is recommended to use Chrome and check the console output.

million.tsmillion.html

ts

```
// #创建百万矩形的性能示例
import { Leafer, Group, Rect, Debug } from 'leafer-ui'

class RectsCase {

    constructor(view: Group, num: number) {

        let group: Group
        const groupSize = 10 * 100 * 1.5
        const column = num > 25 ? 10 : 5

        for (let i = 0; i < num; i++) {
            group = new Group()
            group.x = groupSize * (i % column)
            group.y = groupSize * Math.floor(i / column)
            view.add(group)
            this.createRects(group, 0, 0, `hsl(${i * 3},50%, 50%)`)
        }
    }

    createRects(group: Group, startX: number, startY: number, color: string): void {

        let y: number, rect: Rect

        for (let i = 0; i < 100; i++) {
            if (i % 10 === 0) startX += 10
            y = startY
            for (let j = 0; j < 100; j++) {
                if (j % 10 === 0) y += 10
                rect = new Rect(null)
                rect.x = startX
                rect.y = y
                rect.height = 10
                rect.width = 10
                rect.fill = color
                rect.draggable = true
                group.add(rect)
                y += 12
            }
            startX += 12
        }
    }
}


const startTime = Date.now()


const app = new Leafer({ view: window })

Debug.enable = true
Debug.filter = 'RunTime'

new RectsCase(app, 100) // 100万个


console.log(`创建100万个矩形用时：`, Date.now() - startTime, '毫秒')
```

html

```
<!doctype html>
<html>
  <head>
    <title>Million Rects | Leafer UI</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script src="https://unpkg.com/leafer-ui@2.3.4/dist/web.min.js"></script>
  </head>

  <body></body>

  <script>
    var Leafer = LeaferUI.Leafer
    var Group = LeaferUI.Group
    var Rect = LeaferUI.Rect
    var Debug = LeaferUI.Debug

    function createRects(view, num) {
      var group
      var groupSize = 10 * 100 * 1.5
      var column = num > 25 ? 10 : 5

      for (var i = 0; i < num; i++) {
        group = new Group()
        group.x = groupSize * (i % column)
        group.y = groupSize * Math.floor(i / column)
        view.add(group)
        create10000(group, 0, 0, `hsl(${i * 3},50%, 50%)`)
      }
    }

    function create10000(group, startX, startY, color) {
      var y, rect

      for (var i = 0; i < 100; i++) {
        if (i % 10 === 0) startX += 10
        y = startY
        for (var j = 0; j < 100; j++) {
          if (j % 10 === 0) y += 10
          rect = new Rect()
          rect.x = startX
          rect.y = y
          rect.height = 10
          rect.width = 10
          rect.fill = color
          rect.draggable = true
          group.add(rect)
          y += 12
        }
        startX += 12
      }
    }

    var startTime = Date.now()

    var app = new Leafer({ view: window })

    Debug.enable = true
    Debug.filter = 'RunTime'

    createRects(app, 100) // 100万个

    console.log(`创建100万个矩形用时：`, Date.now() - startTime, '毫秒')
  </script>
</html>
```

## Next Step 

### Quick Start 
