import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.models";

interface RefreshTokenCreationAttributes {
  userId: string;
  token: string;
  isActive?: boolean;
  expiresAt: Date;
}

@Table({
  tableName: "RefreshTokens",
  modelName: "RefreshToken",
  timestamps: true,
})
class RefreshToken extends Model<RefreshToken, RefreshTokenCreationAttributes> {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare expiresAt: Date;

  @BelongsTo(() => User)
  declare user: User;
}

export default RefreshToken;