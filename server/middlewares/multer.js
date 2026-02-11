import multer from "multer";
import path from "path";

const maxSize = 5242880;

const storageEngine = multer.diskStorage({
	destination: "./public/assets/img",
	filename: (_req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`);
	},
});

const upload = multer({
	storage: storageEngine, 
	limits: {
		fileSize: maxSize, 
	},
	fileFilter: (_req, file, cb) => {
		checkFileType(file, cb);
	},
});

/**
 * Vérifie le type de fichier autorisé
 * @param {*} file - Le fichier à vérifier
 * @param {*} cb - Callback pour indiquer si le type est valide ou non
 * @returns
 */
const checkFileType = (file, cb) => {
	const fileTypes = /jpg|png|jpeg|gif|webp|svg|pdf/;

	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	} else {
		cb("Format de fichier non supporté");
	}
};

export const updateFiles = upload.fields([
	{ name: "image", maxCount: 1 },
	{ name: "files", maxCount: 5 },
]);

export default upload;