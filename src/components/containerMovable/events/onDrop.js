//Helpers
import { getDragger, isDisabled, setDragger } from '../moveManager';

//Event
const onDrop = props => {
	const { setWgtState, setState } = props;

	if (isDisabled())
		return;

	const dragger = getDragger();
	if (!dragger)
		return;

	setDragger();

	const { style: { left, top } } = document.getElementById(dragger.id);

	setWgtState(dragger.id, {
		top: +top.replace('px', ''),
		left: +left.replace('px', '')
	});

	setState({ movedEntries: [dragger.id] });
};

export default onDrop;
