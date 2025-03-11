import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import {UserDto} from "@modules/user/dtos/user.dto";

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user: UserDto = request.user;

    if (user?.[Symbol.for('isPublic')]) {
      return;
    }

    return user
  })();
}
