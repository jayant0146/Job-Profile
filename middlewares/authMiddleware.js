import JWT from "jsonwebtoken";

//Can use this userAuth wherever protectionis required like for updation, deletion, insertion, etc
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization; //To access the tokens, present in header section
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }

  const token = authHeader.split(" ")[1]; //Token comprising "bearer token", that's why index 1 

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET); //Decrypting token
    req.user = { userId: payload.userId };
    // whenever logging or registering, getting the value of user and matching it with payload user
    next(); //Moving to the next middleware fn
  } catch (error) {
    next("Auth Failed");
  }
};

export default userAuth;
