//Helpers
import { getSourceDragTargets, getDragger, getTarget } from '../dragManager';

//Event
const onDragEnd = ({ setState }, e) => {
	const target = getTarget();
	const sourceDragTargets = getSourceDragTargets();

	const dragger = getDragger({});
	if (!dragger)
		return;

	if (!target && e.dataTransfer.dropEffect === 'none') {
		if (sourceDragTargets.includes('outside'))
			setState({ forceRemoveWgts: [dragger.id] });
	}
};

export default onDragEnd;
