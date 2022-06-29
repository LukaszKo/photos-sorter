import fs from 'fs';
import path from 'path';
import moment from 'moment';

const currentFolder = 'ala zdjecie telefon';
const directoryPath = `/Users/lkochajewski/Desktop/${currentFolder}`;
const files = fs.readdirSync(directoryPath, { encoding: 'utf-8' });
const acceptedFilesExtensions = ['.jpg', '.mp4'];

function start() {
	let fileCounter = 0;
	const imagesAndVideosFiles = files.filter((f) =>
		acceptedFilesExtensions.includes(path.extname(f).toLocaleLowerCase())
	);
	console.log(`START MOVING ${imagesAndVideosFiles.length} FILES`);
	imagesAndVideosFiles.forEach((file, index) => {
		const data = fs.statSync(directoryPath + '/' + file);
		const month = moment(data.mtime).format('MM-YYYY');
		const monthDirectory = directoryPath + '/' + month;
		const isMonthDirExists = fs.existsSync(monthDirectory);
		if (!isMonthDirExists) {
			fs.mkdirSync(monthDirectory);
			console.log(`NEW FOLDER ${monthDirectory} CREATED`);
		}
		fs.renameSync(`${directoryPath}/${file}`, `${monthDirectory}/${file}`);
		fileCounter++;
	});
	console.log(`SUCCESSFULL MOVING ${fileCounter} FILES`);
}

start();
