import { AbstractDto } from '@common/dto/abstract.dto';

export class BaseDto extends AbstractDto {}
export type UpdateDto = Partial<BaseDto>;
