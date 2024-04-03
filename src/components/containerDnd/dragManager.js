import { clone, generateGuid } from '@intenda/opus-ui';

let source = null;
let sourceDragTargets = null;
let target = null;
let dragger = null;
let dropper = null;
let mode = 'idle';
let disabled = false;

const setDisabled = _isDisabled => {
	disabled = _isDisabled;
};

const isDisabled = () => disabled;

const setSourceOrTarget = (id, dragTargets) => {
	if (mode === 'idle') {
		source = id;
		mode = 'dragging';
		sourceDragTargets = dragTargets;

		return;
	}

	target = id;
};

const resetTarget = () => {
	target = null;
};

const reset = () => {
	mode = 'idle';
	source = null;
	target = null;
	dragger = null;
	dropper = null;
};

const setDragger = mda => {
	dragger = mda;
};

const setDropper = mda => {
	dropper = mda;
};

const getClonedMdaWithNewIds = mda => {
	const isArray = mda instanceof Array;
	const result = isArray ? clone([], mda) : clone({}, mda);

	const recurseMda = obj => {
		if (obj.type || obj.blueprint)
			obj.id = generateGuid();

		if (obj.wgts)
			obj.wgts.forEach(w => recurseMda(w));

		if (obj.prps)
			delete obj.prps.id;
	};

	if (isArray)
		result.forEach(r => recurseMda(r));
	else
		recurseMda(result);

	return result;
};

const getDragger = ({ changeIds }) => {
	if (!changeIds)
		return dragger;

	const result = getClonedMdaWithNewIds(dragger);

	return result;
};

const getDropper = ({ changeIdsOnReorder, changeIdsOnDrop }, isReorder) => {
	const changeIds = (
		(
			isReorder &&
			changeIdsOnReorder
		) || (
			!isReorder &&
			changeIdsOnDrop
		)
	);

	let result = null;

	if (isReorder || !dropper)
		result = getDragger({ changeIds });
	else
		result = getClonedMdaWithNewIds(dropper);

	return result;
};

const getSource = () => source;

const getTarget = () => target;

const getSourceDragTargets = () => sourceDragTargets;

export {
	setSourceOrTarget,
	setDragger,
	getDragger,
	setDropper,
	getDropper,
	getSource,
	getTarget,
	getSourceDragTargets,
	reset,
	resetTarget,
	setDisabled,
	isDisabled
};
