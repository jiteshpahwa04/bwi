const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const PORT = process.env.PORT || 4000;

dotenv.config();

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening at ${PORT}`);
});
