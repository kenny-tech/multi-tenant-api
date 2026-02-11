import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Organization extends Model {
  declare id: string;
  declare name: string;
}

Organization.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'organizations',
    underscored: true,
    timestamps: true,
  }
);
