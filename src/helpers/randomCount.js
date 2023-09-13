export default function getRandomCount()
{
	const max = 450;
	const min = 50;
	return Math.random() * (max - min) + min;
}
