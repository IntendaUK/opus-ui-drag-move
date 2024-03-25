/* eslint-disable max-len */
const props = {
	renderChildren: {
		type: 'boolean',
		desc: 'When this is false, child components won\'t be rendered',
		dft: true
	},
	renderChildrenWhenInvis: {
		type: 'boolean',
		desc: 'When this is false and the container is invisible (vis: false), child components won\'t be rendered. This property is overriden by renderChildren',
		dft: false
	},
	renderTargetSelector: {
		type: 'string',
		desc: 'A DOM selector which will resolve to the element in which to draw the lines',
		dft: 'root'
	}
};

export default props;
