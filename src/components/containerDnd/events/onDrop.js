//Helpers
import { getDragger, getSource, getDropper, isDisabled } from '../dragManager';
import { canDragToId } from './helpers';
import { clone } from '@intenda/opus-ui';

const getDropCoordinates = event => {
	let rect = event.target.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	return {
		x,
		y
	};
};

const buildAddedEntries = (props, originalWgtIds, event) => {
	const { state: { wgts, renderDropPlaceholderIndex } } = props;

	const coordinates = getDropCoordinates(event);

	const addedEntries = wgts
		.filter(w => !originalWgtIds.includes(w.id))
		.map((wgt, i) => ({
			index: renderDropPlaceholderIndex + i,
			coordinates,
			mda: wgt
		}));

	return clone([], addedEntries);
};

const injectDroppedWgts = (props, dragger, dropper) => {
	const { state: { wgts, renderDropPlaceholderIndex } } = props;

	const existsIndex = wgts.findIndex(w => w.id === dragger.id);

	if (existsIndex > -1) {
		wgts.splice(existsIndex, 1);

		let newInsertIndex = renderDropPlaceholderIndex;
		if (newInsertIndex > existsIndex)
			newInsertIndex--;

		wgts.splice(newInsertIndex, 0, dropper);
	} else if (dropper instanceof Array)
		wgts.splice(renderDropPlaceholderIndex, 0, ...dropper);
	else
		wgts.splice(renderDropPlaceholderIndex, 0, dropper);
};

//Event

/* eslint-disable max-lines-per-function */
const onDrop = (props, event) => {
	if (isDisabled())
		return;

	const { id, setState, setWgtState, state: { wgts, handlerOnDrop, addOnDrop } } = props;

	if (!canDragToId(id))
		return;

	const source = getSource();
	const isReorder = id === source;

	const dragger = getDragger({ changeIds: false });
	const dropper = getDropper(props, isReorder);

	if (source !== id)
		setWgtState(source, { removeWgts: [dragger.id] });

	const originalWgtIds = wgts.map(w => w.id);

	const newState = {
		renderDropPlaceholder: false,
		deleteKeys: ['renderDropPlaceholderIndex']
	};

	if (addOnDrop) {
		// Here, we swap or add the dropped wgt(s) into the wgts list
		injectDroppedWgts(props, dragger, dropper);

		const addedEntries = buildAddedEntries(props, originalWgtIds, event);

		newState.addedEntries = addedEntries;
		newState.wgts = wgts;
	}

	setState(newState);

	if (handlerOnDrop) {
		handlerOnDrop({
			source,
			target: id,
			dropper
		});
	}

	setWgtState(dropper.id, { vis: true });
};

export default onDrop;
