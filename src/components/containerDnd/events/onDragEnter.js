//System Helpers
import { generateGuid } from '@intenda/opus-ui';

//Helpers
import { setSourceOrTarget, getDragger, getSource, isDisabled } from '../dragManager';
import { canDragToId } from './helpers';

//Event
const onDragEnter = (
	{ id, setState, setWgtState, state: { wgts, renderDropPlaceholder, dragTargets } }, e
) => {
	if (isDisabled())
		return;

	e.preventDefault();

	let source = getSource();
	if (!source) {
		source = id;
		setSourceOrTarget(id, dragTargets);
	}

	const dragger = getDragger({});

	const allowed = canDragToId(id);
	if (!allowed) {
		setWgtState(dragger.id, { vis: true });

		return;
	}

	setSourceOrTarget(id, dragTargets);

	if (renderDropPlaceholder)
		return;

	setState({
		renderDropPlaceholder: true,
		renderDropPlaceholderIndex: wgts.length,
		dropPlaceholderId: generateGuid()
	});

	if (source === id)
		setWgtState(dragger.id, { vis: false });
};

export default onDragEnter;
