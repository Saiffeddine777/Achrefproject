import multer, { StorageEngine } from "multer";


const store : StorageEngine = multer.memoryStorage()

export default multer({storage :store})