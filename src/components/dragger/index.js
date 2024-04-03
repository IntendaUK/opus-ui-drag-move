//React
import React, { useContext } from 'react';

//System
import { createContext, wrapWidgets } from '@intenda/opus-ui';

//External Helpers
import { setDragger, setDropper, reset } from '../containerDnd/dragManager';
import { setDisabled } from '../containerMovable/moveManager';

//Styles
import './styles.css';

//Context
const DraggerContext = createContext('dragger');

//Events
const onDragStart = ({ id, setState, state, wgts }) => {
	const { dropMda } = state;

	setDisabled(true);

	reset();

	setState({ dragging: true });

	setDragger({
		id,
		type: state.type,
		prps: state,
		wgts
	});

	setDropper(dropMda);
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

export const Dragger = props => {
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
