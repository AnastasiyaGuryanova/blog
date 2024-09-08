const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const createUploadDir = (uploadDir) => {
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir);
	}
};

const parseForm = (req) => {
	const form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, '..', 'uploads');
	form.keepExtensions = true;
	createUploadDir(form.uploadDir);

	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) {
				return reject(err);
			}
			resolve({ fields, files });
		});
	});
};

const moveFile = (file, uploadDir) => {
	return new Promise((resolve, reject) => {
		const fileExtension = path.extname(file.originalFilename);
		const newPath = path.join(uploadDir, file.newFilename + fileExtension);
		fs.rename(file.filepath, newPath, (err) => {
			if (err) {
				return reject(err);
			}
			resolve(newPath);
		});
	});
};

const deleteImage = (imagePath) => {
	if (fs.existsSync(imagePath)) {
		fs.unlink(imagePath, () => {});
	}
};

module.exports = { parseForm, moveFile, deleteImage };
