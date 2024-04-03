//React
import React, { useEffect } from 'react';

//System
import { ThemedComponent, wrapWidgets, clone } from '@intenda/opus-ui';

//Styles
import './styles.css';

//Events
import onDragEnd from './events/onDragEnd';
import onDragEnter from './events/onDragEnter';
import onDragLeave from './events/onDragLeave';
import onDrop from './events/onDrop';
import onForceRemoveWgts from './events/onForceRemoveWgts';
import onRemoveWgts from './events/onRemoveWgts';
import onWgtsRemoved from './events/onWgtsRemoved';
import onWgtsAdded from './events/onWgtsAdded';

//Events
const onMount = ({ wgts, setState }) => {
	setState({ wgts });
};

//Helpers
const getWgts = ({ id, ChildWgt, children, state }) => {
	const { wgts, vis, renderChildren, renderChildrenWhenInvis } = state;

	if (!wgts || !renderChildren || (!vis && !renderChildrenWhenInvis))
		return null;

	const { renderDropPlaceholder, renderDropPlaceholderIndex } = state;

	const result = wrapWidgets({
		ChildWgt,
		wgts: [...wgts]
	});

	if (children) {
		if (children.length)
			result.push(...children);
		else
			result.push(children);
	}

	if (renderDropPlaceholder) {
		const { dropPlaceholderMda, dropPlaceholderId } = state;

		const insertIndex = renderDropPlaceholderIndex;

		const clonedDropPlaceholderMda = clone({}, dropPlaceholderMda);

		clonedDropPlaceholderMda.id = dropPlaceholderId;
		clonedDropPlaceholderMda.parentId = id;

		result.splice(
			insertIndex,
			0,
			<ThemedComponent key={dropPlaceholderId} mda={clonedDropPlaceholderMda} />
		);
	}

	return result;
};

//Components
export const ContainerDnd = props => {
	const { id, classNames, style, getHandler, attributes, state } = props;
	const { removeWgts, forceRemoveWgts, removedEntries, addedEntries } = state;

	useEffect(getHandler(onMount), []);
	useEffect(getHandler(onRemoveWgts), [JSON.stringify(removeWgts)]);
	useEffect(getHandler(onForceRemoveWgts), [JSON.stringify(forceRemoveWgts)]);
	useEffect(getHandler(onWgtsRemoved), [JSON.stringify(removedEntries)]);
	useEffect(getHandler(onWgtsAdded), [JSON.stringify(addedEntries)]);

	const useWgts = getWgts(props);

	const handlerOnDragEnter = getHandler(onDragEnter);
	const handlerOnDragLeave = getHandler(onDragLeave);
	const handlerOnDrop = getHandler(onDrop);
	const handlerOnDragEnd = getHandler(onDragEnd);

	return (
		<div
			id={id}
			className={classNames}
			style={style}
			{...attributes}
			onDragEnter={handlerOnDragEnter}
			onDragOver={e => e.preventDefault()}
			onDragLeave={handlerOnDragLeave}
			onDrop={handlerOnDrop}
			onDragEnd={handlerOnDragEnd}
		>
			{useWgts}
		</div>
	);
};
