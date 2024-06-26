const onWgtsRemoved = ({ setState, state: { removedEntries } }) => {
	if (!removedEntries.length)
		return;

	setState({ deleteKeys: ['removedEntries'] });
};

export default onWgtsRemoved;
