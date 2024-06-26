const onWgtsMoved = ({ setState, state: { movedEntries } }) => {
	if (!movedEntries.length)
		return;

	setState({ deleteKeys: ['movedEntries'] });
};

export default onWgtsMoved;
