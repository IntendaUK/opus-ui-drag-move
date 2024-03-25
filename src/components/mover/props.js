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
	}
};

export default props;
