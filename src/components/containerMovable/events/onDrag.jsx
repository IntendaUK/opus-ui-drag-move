//External Helpers
import { initAndRunScript } from '@intenda/opus-ui';

//Helpers
import { getDragger, isDisabled, isTrackOnly } from '../moveManager';

//Internal
let cdMax = 14;
let cd = cdMax;
let lastRunX = 0;
let lastRunY = 0;

//Helpers
const runScripts = (props, dragger, el) => {
	const { id, state: { scpsOnMove } } = props;

	if (cd > 0) {
		cd--;

		return;
	}

	cd = cdMax;

	if (lastRunX === el.style.left && lastRunY === el.style.top)
		return;

	lastRunX = el.style.left;
	lastRunY = el.style.top;

	scpsOnMove.forEach(script => {
		script.ownerId = id;

		initAndRunScript({
			script,
			setVariables: {
				dragger,
				left: el.style.left,
				top: el.style.top
			},
			isRootScript: true
		});
	});
};

//Event
const onDrag = (props, e) => {
	if (isDisabled())
		return;

	const dragger = getDragger();
	const { id, originalX, originalY, grabX, grabY } = dragger;

	//In Chrome, if we do a really fast drag and drop, e.clientX and e.clientY are sometimes 0
	if (e.clientX === 0 && e.clientY === 0)
		return;

	let el = cacheIdLookup.get(id);
	if (!el || !el.isConnected) {
		el = document.getElementById(id);
		cacheIdLookup.set(id, el);
	}

	const scale = el.getBoundingClientRect().width / el.offsetWidth;

	if (!isTrackOnly()) {
		el.style.left = (originalX + ((e.clientX - grabX) / scale)) + 'px';
		el.style.top = (originalY + ((e.clientY - grabY) / scale)) + 'px';
	}

	if (props.state.scpsOnMove !== undefined)
		runScripts(props, dragger, el);
};

export default onDrag;
