import { sequelize } from '../config/database';
import { User } from './user.model';
import { Organization } from './organization.model';

Organization.hasMany(User, {
  foreignKey: 'organization_id',
});

User.belongsTo(Organization, {
  foreignKey: 'organization_id',
});

export { sequelize, User, Organization };
