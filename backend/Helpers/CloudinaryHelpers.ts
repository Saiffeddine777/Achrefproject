import path from "path";
import fs from "fs/promises"
import cloudinary from "../APIServices/CloudinaryService";
import os from "os"
import Product, { ImageInfoInterface } from "../Products/Product";


export const uploadAsetOfImagesToCloudinary: (files: {
    [fieldname: string]: Express.Multer.File[];
} | Express.Multer.File[] | undefined) => Promise<ImageInfoInterface[] | undefined> = async (files) => {
    try {
        const urlsArray: ImageInfoInterface[] = []
        if (files && Array.isArray(files)) {
            for (let file of files) {
                const uniqueName: string = `${crypto.randomUUID()}.${path.extname(file.originalname)}`
                const naming: string = path.resolve(os.tmpdir(), uniqueName)
                await fs.writeFile(naming, file.buffer);
                const result = await cloudinary.uploader.upload(naming)
                await fs.unlink(naming)
                urlsArray.push({ publicId: result.public_id, url: result.url })
            }
        }
        if (urlsArray.length) return urlsArray
        else return []
    } catch (error) {
        console.error(error)
        return []
    }
}


export const deleteImages: (images: ImageInfoInterface[]) => Promise<void> = async (images) => {
    try {
        const promises: Promise<any>[] = images.map((element) => cloudinary.uploader.destroy(element?.publicId))
        await Promise.all(promises);
    } catch (error) {
        console.log(error)
    }
}


export const deletOnImageFromCloudinary: (publicId: string, productId: string) => Promise<string> = async (publicId, productId) => {
    try {
        const product = await Product.findById(productId)
        const photos = product?.photos as ImageInfoInterface[]
        await Product.updateOne({ _id: productId }, { photos: photos.filter((element) => element.publicId !== publicId) })
        await cloudinary.uploader.destroy(publicId)
        return "Photo has been deleted"

    } catch (error) {
        console.log(error)
        return "";
    }
}



export const uploadOnePhotoOfProductToCloudinary: (productId: string, file: Express.Multer.File | undefined) => Promise<string | undefined> = async (productId, file) => {
    try {
        if (file) {
            const fileName = path.join(os.tmpdir(), `${crypto.randomUUID()}.${path.extname(file?.originalname)}`);
            await fs.writeFile(fileName, file?.buffer)
            const result = await cloudinary.uploader.upload(fileName);
            const productToAddPhotoTo = await Product.findById(productId)
            const photos = productToAddPhotoTo?.photos as ImageInfoInterface[]
            photos.push({ publicId: result.public_id, url: result.url })
            await Product.updateOne({ _id: productId }, { photos })
            await fs.unlink(fileName);
            return "Photo has been Inserted"
        }
        else return "No photo has been inserted"

    } catch (error) {
        console.error(error)
        return "Error inserting the Image"
    }
}





