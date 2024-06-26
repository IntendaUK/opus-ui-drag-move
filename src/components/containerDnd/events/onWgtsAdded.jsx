const onWgtsAdded = ({ setState, state: { addedEntries } }) => {
	if (!addedEntries.length)
		return;

	setState({ deleteKeys: ['addedEntries'] });
};

export default onWgtsAdded;
