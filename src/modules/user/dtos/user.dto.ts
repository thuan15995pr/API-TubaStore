import { AbstractDto } from '@common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type User from '../models/user.model';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  first_name?: string;

  last_name?: string;

  role: RoleType;

  email: string;

  avatar?: string;

  constructor(user: User, options?: UserDtoOptions) {
    super(user);
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
  }
}
