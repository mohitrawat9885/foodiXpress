const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");
multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./foodixpress_web/build/assets/images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

exports.uploadImage = async (req, res) => {
  try {
    let upload = multer({ storage: Storage }).single("photo");
    upload(req, res, function (err) {
      if (!req.file) {
        console.log("No Image");
        return res.send("Plese select image to upload");
      } else if (err instanceof multer.MulterError) {
        console.log(err);
        return res.send(err);
      } else if (err) {
        console.log(err);
        return res.send(err);
      }
      res.status(200).json({
        status: "success",
        message: "Image Uploaded Successfully",
        image: req.file.path,
        imageName: req.file.filename,
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    // console.log("Header ", req.headers);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("foodi")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log("Token is ", token);
    if (!token) {
      res.status(401).json({
        status: "error",
        message: "UnAuthorize access",
        error: err,
      });
    }
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    req.body.id = decodedToken.id;
    next();
  } catch (err) {
    console.log("Token Error");
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: err,
    });
  }
};
