import bcrypt from "bcrypt";

const generateRandomPasswordGenerator = (teacherName:string) => {

    const random = Math.floor(1000 + Math.random() * 9000);
    const passwordData = {
        hashVersion: bcrypt.hashSync(`${teacherName}${random}`, 10),
        plainVersion: `${teacherName}${random}`,
    }
    return passwordData;
};

export default generateRandomPasswordGenerator