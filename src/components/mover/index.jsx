//React
import React, { useContext } from 'react';

//System
import { createContext, wrapWidgets } from '@intenda/opus-ui';

//External Helpers
import { setDragger, reset } from '../containerMovable/moveManager';
import { setDisabled } from '../containerDnd/dragManager';

//Styles
import './styles.css';

//Context
const DraggerContext = createContext('mover');

//Invisible ghost dragger image
const ghostImage = new Image();
ghostImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

//Events
const onDragStart = ({ id, setState }, e) => {
	const { clientX, clientY, target } = e;

	const targetRect = target.getBoundingClientRect();

	setDisabled(true);

	reset();

	setState({ dragging: true });

	setDragger({
		id,
		originalX: target.offsetLeft,
		originalY: target.offsetTop,
		grabX: clientX,
		grabY: clientY,
		grabOffsetX: targetRect.left - clientX,
		grabOffsetY: targetRect.top - clientY
	});

	e.dataTransfer.setDragImage(ghostImage, 0, 0);
};

const onDragEnd = ({ setState }) => {
	setState({ dragging: false });

	setDisabled(false);
};

//Helpers
const getWgts = props => {
	const { children, state: { vis, renderChildren, renderChildrenWhenInvis } } = props;

	if (!renderChildren || (!vis && !renderChildrenWhenInvis))
		return null;

	const result = wrapWidgets(props);

	if (children) {
		if (children.length)
			result.push(...children);
		else
			result.push(children);
	}

	return result;
};

//Components
const Inner = () => {
	const props = useContext(DraggerContext);

	const inner = getWgts(props);

	return inner;
};

export const Mover = props => {
	const { id, getHandler, classNames, style, attributes } = props;

	const handlerOnDragStart = getHandler(onDragStart);
	const handlerOnDragEnd = getHandler(onDragEnd);

	return (
		<DraggerContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
				draggable
				onDragStart={handlerOnDragStart}
				onDragEnd={handlerOnDragEnd}
			>
				<Inner />
			</div>
		</DraggerContext.Provider>
	);
};
