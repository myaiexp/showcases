/** @jsxImportSource @antv/infographic */
// Ring: places each item on a circle and dashes a track behind them
import type { BaseStructureProps, ComponentType, JSXElement } from '@antv/infographic';
import { Ellipse, FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup } from '@antv/infographic';

export interface RingProps extends BaseStructureProps {
  radius?: number;
}

export const Ring: ComponentType<RingProps> = (props) => {
  const { Title, Item, data, options, radius = 150 } = props;
  const { title, desc, items = [] } = data;
  const titleContent = Title ? <Title title={title} desc={desc} /> : null;
  // Measure one item first: positions are computed from its real size.
  const itemBounds = getElementBounds(<Item indexes={[0]} data={data} datum={items[0]} />);
  const cx = radius + itemBounds.width / 2;
  const cy = radius + itemBounds.height / 2;
  const colorPrimary = getThemeColors({}, options).colorPrimary;

  const itemElements: JSXElement[] = [];
  items.forEach((datum, index) => {
    const angle = (index * 2 * Math.PI) / items.length - Math.PI / 2;
    const cos = Math.cos(angle);
    itemElements.push(
      <Item
        indexes={[index]}
        datum={datum}
        data={data}
        x={cx + radius * cos - itemBounds.width / 2}
        y={cy + radius * Math.sin(angle) - itemBounds.height / 2}
        positionH={cos > 0.2 ? 'normal' : cos < -0.2 ? 'flipped' : 'center'}
      />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {titleContent}
      <Group>
        <Group>
          <Ellipse
            x={itemBounds.width / 2}
            y={itemBounds.height / 2}
            width={radius * 2}
            height={radius * 2}
            fill="none"
            stroke={colorPrimary}
            strokeWidth={2}
            strokeDasharray="6 6"
            opacity={0.6}
          />
        </Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
