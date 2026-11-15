/** @jsxImportSource @antv/infographic */
// Spine: items alternate left and right of a centre line using positionH
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { Ellipse, FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup, Rect } from '@antv/infographic';

export interface SpineProps extends BaseStructureProps {
  gap?: number;
}

export const Spine: ComponentType<SpineProps> = (props) => {
  const { Title, Item, data, options, gap = 12 } = props;
  const { title, desc, items = [] } = data;
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} />);
  const color = getThemeColors({}, options).colorPrimary;
  const spineX = itemBounds.width + 14;
  const rowH = itemBounds.height + gap;

  const decor: JSXElement[] = [
    <Rect x={spineX - 1.5} y={0} width={3} height={Math.max(items.length * rowH - gap, 1)} fill={color} opacity={0.5} />,
  ];
  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    const right = index % 2 === 0;
    const y = index * rowH;
    decor.push(<Ellipse x={spineX - 7} y={y + itemBounds.height / 2 - 7} width={14} height={14} fill={color} />);
    itemElements.push(
      <Item
        indexes={[index]}
        datum={datum}
        data={data}
        x={right ? spineX + 14 : 0}
        y={y}
        positionH={right ? 'normal' : 'flipped'}
      />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <Group>{decor}</Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
