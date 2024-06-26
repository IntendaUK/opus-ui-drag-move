//React
import React, { useEffect } from 'react';

//External Helpers
import { wrapWidgets, clone } from '@intenda/opus-ui';

//Styles
import './styles.css';

//Events
import onDrag from './events/onDrag';
import onDrop from './events/onDrop';
import onWgtsMoved from './events/onWgtsMoved';

//Events
const onMount = ({ wgts, setState }) => {
	if (wgts)
		setState({ wgts });
};

//Helpers
const getWgts = ({ ChildWgt, children, state }) => {
	const { vis, renderChildren, renderChildrenWhenInvis } = state;

	if (!renderChildren || (!vis && !renderChildrenWhenInvis))
		return null;

	const { wgts, extraWgts, cloneChildrenBeforeMount } = state;

	let useWgts = [];
	if (!cloneChildrenBeforeMount) {
		if (wgts?.length)
			useWgts.push(...wgts);
		if (extraWgts?.length)
			useWgts.push(...extraWgts);
	} else {
		if (wgts?.length)
			useWgts.push(...clone([], wgts));
		if (extraWgts?.length)
			useWgts.push(...clone([], extraWgts));
	}

	const result = wrapWidgets({
		ChildWgt,
		wgts: useWgts
	});

	if (children) {
		if (children.length)
			result.push(...children);
		else
			result.push(children);
	}

	return result;
};

//Components
export const ContainerMovable = props => {
	const { id, classNames, style, getHandler, attributes, state } = props;
	const { movedEntries } = state;

	useEffect(getHandler(onMount), []);
	useEffect(getHandler(onWgtsMoved), [JSON.stringify(movedEntries)]);

	const useWgts = getWgts(props);

	const handlerOnDrag = getHandler(onDrag);
	const handlerOnDrop = getHandler(onDrop);

	return (
		<div
			id={id}
			className={classNames}
			style={style}
			{...attributes}
			onDrag={handlerOnDrag}
			onDrop={handlerOnDrop}
			onDragOver={e => e.preventDefault()}
		>
			{useWgts}
		</div>
	);
};
