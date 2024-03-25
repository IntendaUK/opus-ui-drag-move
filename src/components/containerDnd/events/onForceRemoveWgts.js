//Helpers
import { clone } from 'opus-ui';

//Event
const onForceRemoveWgts = ({ setState, state: { wgts, forceRemoveWgts } }) => {
	if (!forceRemoveWgts)
		return;

	const removedEntries = wgts
		.filter(({ id }) => forceRemoveWgts.includes(id))
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
		deleteKeys: ['forceRemoveWgts']
	});
};

export default onForceRemoveWgts;
