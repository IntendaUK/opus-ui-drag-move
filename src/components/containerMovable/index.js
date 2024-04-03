//React
import React, { useEffect } from 'react';

//External Helpers
import { wrapWidgets } from '@intenda/opus-ui';

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
	const { wgts, vis, renderChildren, renderChildrenWhenInvis, extraWgts } = state;

	if ((!wgts && !extraWgts.length) || !renderChildren || (!vis && !renderChildrenWhenInvis))
		return null;

	const wgtsList = [];
	if (wgts)
		wgtsList.push(...wgts);
	wgtsList.push(...extraWgts);

	const result = wrapWidgets({
		ChildWgt,
		wgts: wgtsList
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
