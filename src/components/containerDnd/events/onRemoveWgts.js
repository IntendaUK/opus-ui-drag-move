//Helpers
import { clone } from '@intenda/opus-ui';

//Event
const onRemoveWgts = ({ setState, state: { wgts, removeWgts, removeOnDrop } }) => {
	if (!removeWgts || !removeOnDrop)
		return;

	const removedEntries = wgts
		.filter(({ id }) => removeWgts.includes(id))
		.map((w, i) => ({
			index: i,
			mda: clone({}, w)
		}));

	removedEntries.forEach(({ mda: { id: removedWgtId } }) => {
		wgts.spliceWhere(w => w.id === removedWgtId);
	});

	setState({
		wgts,
		removedEntries,
		removeWgts: []
	});
};

export default onRemoveWgts;
