export const convertObjectKeysIntoArray = (object: any) => {
	const arrayedObjectKeys = [];
	for (let key in object) {
		arrayedObjectKeys.push(`${key}`);
	}
	return arrayedObjectKeys;
};
