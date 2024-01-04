const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder }
    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto"
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.uploadStoryToCloudinary = async (file, folder, height, quality) => {
    const options = { folder }
    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto"
    options.expires_at = 2*24*60*60;
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.deleteImageFromCloudinary = async(public_id) => {
    try{
        await cloudinary.uploader.destroy(`${public_id}`, function(error, result){
            // console.log("Result is: ",result);
        });
    }catch(err){
        console.log("Not deleted");
    }
}