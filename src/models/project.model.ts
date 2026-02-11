import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Organization } from './organization.model';

export class Project extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare organizationId: string;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'organizations', key: 'id' },
      field: 'organization_id',
    },
  },
  {
    sequelize,
    tableName: 'projects',
    underscored: true,
    timestamps: true,
    indexes: [{ unique: true, fields: ['organization_id', 'name'] }],
  }
);

Project.belongsTo(Organization, { foreignKey: 'organizationId' });
