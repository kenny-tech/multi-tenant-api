import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Organization, sequelize } from '../models';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  // Register user + organization
  static async register(input: RegisterInput) {
    const transaction = await sequelize.transaction();

    try {
      const { firstName, lastName, email, password, organizationName } = input;

      // Check if user exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        await transaction.rollback();
        throw new Error('User already exists');
      }

      // Create organization
      const organization = await Organization.create(
        { name: organizationName },
        { transaction }
      );

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create(
        {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          organizationId: organization.id,
        },
        { transaction }
      );

      await transaction.commit();

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, organizationId: organization.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      return { user, accessToken: token };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Login user
  static async login(input: LoginInput) {
    const { email, password } = input;

    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, organizationId: user.organizationId },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return { user, accessToken: token };
  }
}
