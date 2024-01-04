const Image = require("../models/Image")
const User = require("../models/User")
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../utils/imageUploader")

// update display picture of the user
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.files
        const { id } = req.user

        const user = await User.findById(id);
        const imageId = user.image;
        const prevImage = await Image.findById(imageId);
        const prevPublicId = prevImage.public_id;

        // delete previous display picture
        const deletePrevDP = await deleteImageFromCloudinary(prevPublicId);

        // upload image to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        // update the image of user model
        const updatedImage = await Image.findByIdAndUpdate(
            imageId,
            { public_id: image.public_id, secure_url: image.secure_url },
            { new: true }
        )
        
        return res.status(200).send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedImage,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not update profile, server error !!",
            Error_message: err.message,
        })
    }
}

// update details of the user
exports.updateName = async(req, res)=>{
    try{
        const {name} = req.body;
        const {id} = req.user;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name
            }
        )

        return res.status(200).json({
            success: true,
            message: "Name successfully updated !!",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Could not update name, server error !!",
            Error_message: err.message,
        })
    }
}

// Delete account
exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id

      const user = await User.findById({ _id: id })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
      
      // Now Delete User
      await User.findByIdAndDelete({ _id: id })

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      })
    }catch(err){
      return res.status(500).json({
        success: false, 
        message: "User Cannot be deleted successfully, server error !!",
        Error_message: err.message,
      })
    }
}