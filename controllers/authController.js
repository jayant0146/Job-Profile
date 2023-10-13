import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and greater than 6 character");
  }
  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    next("Email Already Register Please Login");
  }
  const user = await userModel.create({ name, email, password });
  //token
  //Could have printed directy user, but to hide the password written like this
  //Another way to hide it is in the login section below
  const token = user.createJWT();
  res.status(201).send({
    sucess: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  //Selecting the password to hide it by defining it undefined below
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname");
  }
  //compare password
  //Calling the fn Comparepassword from userModel.js
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Useraname or password");
  }

  //To hide the password
  user.password = undefined;


  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
