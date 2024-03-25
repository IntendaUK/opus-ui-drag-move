/* eslint-disable max-len */

//Shared Props
import { propsSharedContainer } from 'opus-ui';

//Props
const props = {
	//User
	dragTargets: {
		type: 'array',
		desc: 'An array of containers that child widgets can be dropped into. These must all be of type containerDnd',
		spec: ['targetId1', 'targetId2']
	},
	changeIdsOnDrop: {
		type: 'boolean',
		desc: 'When set to true, dropping a child in another container (including the source container) causes all elements in the child metadata to get new IDs',
		dft: true
	},
	changeIdsOnReorder: {
		type: 'boolean',
		desc: 'When this is set to true, performing a reorder of child widgets in a container will cause a new element to be added instead',
		dft: false
	},
	dropPlaceholderMda: {
		type: 'object',
		desc: 'The metadata that should be rendered in the location where the drop will occur',
		dft: () => {
			return {
				id: 'd1',
				type: 'icon',
				prps: {
					color: 'mediumGrey',
					value: 'add'
				}
			};
		}
	},
	removeOnDrop: {
		type: 'boolean',
		desc: 'When this is set to true, performing a drop in another container will cause the child widget to be removed from the source container',
		dft: true
	},
	addOnDrop: {
		type: 'boolean',
		desc: 'When this is set to false, accepting a drop will not cause the child widget to be added to ourselves. Mostly, this will be used in the platform with handlerOnDrop',
		dft: true
	},
	handlerOnDrop: {
		type: 'function',
		desc: 'A function to be called when a drop occurs',
		/* eslint-disable-next-line no-unused-vars */
		spec: (dropMda, dropPosition) => {

		}
	},
	//Internal
	renderDropPlaceholder: {
		type: 'boolean',
		desc: 'When this is set to true, the drop placeholder will be rendered',
		internal: true,
		dft: false
	},
	renderDropPlaceholderIndex: {
		type: 'integer',
		desc: 'The index at which the placeholder should be rendered within the container',
		internal: true
	},
	removeWgts: {
		type: 'array',
		desc: 'An array of IDs of child widgets that should be removed. Will only happen if removeOnDrop is set to true',
		spec: ['childId1', 'childId2'],
		internal: true
	},
	forceRemoveWgts: {
		type: 'array',
		desc: 'An array of IDs of child widgets that should be removed (without checking removeOnDrop)',
		spec: ['childId1', 'childId2'],
		internal: true
	},
	removedEntries: {
		type: 'array',
		desc: 'An array containing removed wgt data. This can be listened to by flows and scripts.',
		spec: '[{ index, mda }]',
		internal: true,
		dft: () => []
	},
	wgts: {
		type: 'array',
		desc: 'The metadata of child widgets to be rendered',
		internal: true,
		dft: () => []
	},
	addedEntries: {
		type: 'array',
		desc: 'An array containing added wgt data. This can be listened to by flows and scripts.',
		spec: '[{ index, coordinates, mda }]',
		internal: true,
		dft: () => []
	}
};

export default Object.assign(props, propsSharedContainer);

