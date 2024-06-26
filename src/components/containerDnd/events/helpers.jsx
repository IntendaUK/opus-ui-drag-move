//System Helpers
import { getScopedId, stateManager } from '@intenda/opus-ui';

//Helpers
import { getSourceDragTargets, getSource } from '../dragManager';

//Helpers
export const canDragToId = target => {
	const source = getSource();
	const sourceDragTargets = getSourceDragTargets();

	//Reorder
	if (source === target)
		return sourceDragTargets.includes('self');

	//Not Reorder
	const foundMatch = sourceDragTargets.some(s => {
		if (s.indexOf('||') === -1) {
			if (s.indexOf('##') === 0) {
				const { tags } = stateManager.getWgtState(target);

				return tags.includes(s.replaceAll('#', ''));
			}

			return s === target;
		}

		const mappedId = getScopedId(s, source);

		return mappedId === target;
	});

	return foundMatch;
};
