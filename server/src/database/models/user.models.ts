import { Table, Column, Model, DataType, PrimaryKey, Default, Min, Max } from "sequelize-typescript";
import { UserCreationAttributes }  from "../modelsTypes/userTypes";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})

class User extends Model<User, UserCreationAttributes> {
    
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [6, 255],
    },
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institution", "super-admin", "student"),
    defaultValue: "student",
    allowNull: false,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare currentInstituteID: string | null;
}

export default User;
