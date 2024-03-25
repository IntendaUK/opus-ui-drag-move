/* eslint-disable max-len */

//System Helpers
import { clone, generateGuid, propsSharedContainer } from 'opus-ui';

//Props
const props = {
	wgts: {
		type: 'array',
		desc: 'The metadata of child widgets to be rendered',
		internal: true,
		dft: () => []
	},
	movedEntries: {
		type: 'array',
		desc: 'An array containing moved wgt data. This can be listened to by flows and scripts.',
		spec: '[{ index, coordinates, mda }]',
		internal: true,
		dft: () => []
	},
	scpsOnMove: {
		type: 'array',
		desc: 'An array of scripts to be run when a component is moved inside the containerMovable'
	},
	extraWgts: {
		type: 'mixed',
		desc: 'A single metadata object, or array of metadata objects that should be added to the container\'s list of children',
		dft: () => [],

		setAction: (oldValue = [], newValue) => {
			if (!newValue.push)
				newValue = [ newValue];

			newValue.forEach(mda => {
				const exists = oldValue.some(({ id }) => id === mda.id);
				if (exists)
					return;

				const cloned = clone({}, mda);
				if (!cloned.id)
					cloned.id = generateGuid();

				oldValue.push(cloned);
			});

			return oldValue;
		},

		deleteAction: (oldValue = [], deletedValue) => {
			if (!deletedValue.push)
				deletedValue = [ deletedValue];

			deletedValue.forEach(mda => {
				oldValue.spliceWhere(({ id }) => {
					const doDelete = (
						id === mda.id ||
						mda.all ||
						(
							mda.idRegex &&
							(new RegExp(mda.idRegex, 'g')).test(id)
						)
					);

					return doDelete;
				});
			});

			return oldValue;
		}
	}
};

export default Object.assign(props, propsSharedContainer);

