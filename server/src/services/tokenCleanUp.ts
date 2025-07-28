import RefreshToken from "../database/models/token.models";
import { Op } from "sequelize";

export const cleanupExpiredTokens = async () => {
  try {
    const deleted = await RefreshToken.destroy({
      where: {
        [Op.or]: [
          { expiresAt: { [Op.lt]: new Date() } },
          { isActive: false }
        ]
      }
    });
    
    console.log(`Cleaned up ${deleted} expired/inactive tokens`);
  } catch (error) {
    console.error("Error cleaning up tokens:", error);
  }
};

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);