import jwt from "jsonwebtoken";
import { envConfig } from "../../config/config";

interface TokenData {
  id: string;
  instituteID?: string | number | null;
}

const generateJwtToken = (dataToEncrypt: TokenData) => {

  // Generate access token (short-lived)
  const accessToken = jwt.sign(
    {
      id: dataToEncrypt.id,
      instituteID: dataToEncrypt.instituteID || null,
      type: "access",
    },
    envConfig.jwtAccessSecret as string,
    {
      expiresIn: "30m",
    }
  );

  // Generate refresh token (long-lived)
  const refreshToken = jwt.sign({
      id: dataToEncrypt.id,
      instituteID: dataToEncrypt.instituteID || null,
      type: 'refresh'
    },
    envConfig.jwtRefreshSecret as string, 
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

export default generateJwtToken;
