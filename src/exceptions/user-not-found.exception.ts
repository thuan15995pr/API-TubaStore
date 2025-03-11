import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.userNotFound', error);
  }
}
export class AdminNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.adminNotFound', error);
  }
}
