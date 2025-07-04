import jwt from "jsonwebtoken";
import { envConfig } from "../../config/config";

const generateJwtToken = (dataToEncrypt: {
  id: string;
  instituteID?: string;
}) => {
  const token = jwt.sign(
    {
      id: dataToEncrypt,
    },
    envConfig.jwtSecret as string,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

export default generateJwtToken;
