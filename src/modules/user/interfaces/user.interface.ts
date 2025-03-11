import type { RoleType } from '../../../constants';

export interface IUser {
  email: string;
  password?: string;
  role: RoleType;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar?: string;
}
