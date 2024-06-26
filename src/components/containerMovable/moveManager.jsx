/*
	Information about the element being dragged: {
		id,
		originalX,
		originalY,
		grabX,
		grabY,
		grabOffsetX,
		grabOffsetY
	}
*/
let dragger = null;

//Will be set to true in various conditions (for example when dragManager is working)
let disabled = false;

//When set to true, keep track of changes, but do not modify the position of the element
// being dragged
let trackOnly = false;

const setDisabled = _isDisabled => {
	disabled = _isDisabled;
};

const setTrackOnly = _trackOnly => {
	trackOnly = _trackOnly;
};

const isDisabled = () => {
	return disabled;
};

const isTrackOnly = () => {
	return trackOnly;
};

const reset = () => {
	dragger = null;
};

/*
	dragger: {
		id,
		originalX,
		originalY,
		grabX,
		grabY,
		grabOffsetX,
		grabOffsetY
	}
*/
const setDragger = _dragger => {
	dragger = _dragger;
};

const getDragger = () => {
	return dragger;
};

export {
	setDragger,
	getDragger,
	reset,
	setDisabled,
	setTrackOnly,
	isDisabled,
	isTrackOnly
};
