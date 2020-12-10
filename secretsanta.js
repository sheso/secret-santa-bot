const getMembers = () => {
	return [
		{
			id: 1,
			name: 'Олег',
			likes: 'машинки, лего и солдатики'
		},
		{
			id: 2,
			name: 'Аня',
			likes: 'косметика и сумочки'
		},
		{
			id: 3,
			name: 'Иван',
			likes: 'Ардуино и радиодетали'
		},
		{
			id: 4,
			name: 'Ева',
			likes: 'яблоки'
		},
		{
			id: 5,
			name: 'Радж',
			likes: 'астрономия и молчаливые подкаты'
		},
		{
			id: 6,
			name: 'Эльза',
			likes: 'перчатки, снег и родина'
		},
		{
			id: 7,
			name: 'Иван',
			likes: 'менять профессию, путешествия во времени'
		},
		{
			id: 8,
			name: 'Даша',
			likes: 'путешествовать, наказывать жуликов'
		},
	];
};

const shuffle = array => {
	const origin = [...array];
	const result = [];
	let length = origin.length;
	while (length > 0) {
		const rand = Math.floor(Math.random() * length);
		result.push(origin[rand]);
		origin.splice(rand, 1);
		length--;
	}

	const same = result.every((el, i) => {
		el === array[i];
	})

	if (same) {
		return shuffle(array);
	}

	return result;
};
/*
const addAssignments = (members = []) => {
	const res = [...members];

	return res.map(man => {
		if ()
	});
}
*/
