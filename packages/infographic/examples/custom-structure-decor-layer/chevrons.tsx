/** @jsxImportSource @antv/infographic */
// Chevrons: a row of items with an arrow layer painted below them
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup, Polygon } from '@antv/infographic';

export interface ChevronsProps extends BaseStructureProps {
  gap?: number;
}

export const Chevrons: ComponentType<ChevronsProps> = (props) => {
  const { Title, Item, data, options, gap = 40 } = props;
  const { title, desc, items = [] } = data;
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} positionH="center" />);
  const color = getThemeColors({}, options).colorPrimary;

  const decorElements: JSXElement[] = [];
  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    const x = index * (itemBounds.width + gap);
    itemElements.push(<Item indexes={[index]} datum={datum} data={data} x={x} positionH="center" />);
    if (index < items.length - 1) {
      const ax = x + itemBounds.width + gap / 2 - 9;
      const ay = itemBounds.height / 2;
      // points is an array of {x, y} objects, not a string.
      decorElements.push(
        <Polygon
          points={[
            { x: ax, y: ay - 12 },
            { x: ax + 18, y: ay },
            { x: ax, y: ay + 12 },
            { x: ax + 6, y: ay },
          ]}
          fill={color}
        />,
      );
    }
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        {/* Decoration first, so the items paint over it. */}
        <Group>{decorElements}</Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
