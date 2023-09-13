export function getLast50Days()
{
	const currentDate = new Date();
	const last50Days = [];

	for (let i = 0; i < 50; i++)
	{
		const date = new Date(currentDate);
		date.setDate(currentDate.getDate() - i);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;
		last50Days.push(formattedDate);
	}

	return last50Days;
}

const last50Days = getLast50Days();

