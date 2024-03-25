//System Helpers
import { generateGuid } from 'opus-ui';

//Helpers
import { resetTarget, isDisabled } from '../dragManager';
import { canDragToId } from './helpers';

//Helpers
const onDidNotLeave = ({ setState, state }, { relatedTarget }) => {
	const { wgts, renderDropPlaceholderIndex, dropPlaceholderId } = state;

	let a = relatedTarget;
	let foundChildId = null;

	while (a && !foundChildId) {
		if (a.id === dropPlaceholderId)
			return;

		if (wgts.some(w => w.id === a.id))
			foundChildId = a.id;

		a = a.parentNode;
	}

	let newIndex = wgts.length;
	if (foundChildId)
		newIndex = wgts.findIndex(w => w.id === foundChildId);

	if (newIndex === renderDropPlaceholderIndex)
		return;

	setState({
		renderDropPlaceholderIndex: newIndex,
		dropPlaceholderId: generateGuid()
	});
};

//Event
const onDragLeave = (props, e) => {
	if (isDisabled())
		return;

	const { id, setState, state: { dropPlaceholderMda } } = props;

	const allowed = canDragToId(id);
	if (!allowed)

		return;

	const { relatedTarget } = e;

	if (relatedTarget?.parentNode.id === dropPlaceholderMda.id)
		return;

	let d = relatedTarget;
	let foundSelf = false;

	while (d && !foundSelf) {
		foundSelf = d.id === id;

		d = d.parentNode;
	}

	//When foundSelf is true, we know we're likely inside a child component meaning,
	// we did not actually leave
	if (foundSelf) {
		onDidNotLeave(props, e);

		return;
	}

	resetTarget();

	setState({
		renderDropPlaceholder: false,
		deleteKeys: ['renderDropPlaceholderIndex']
	});
};

export default onDragLeave;
