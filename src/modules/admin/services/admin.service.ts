import { Injectable } from '@nestjs/common';
import type { AdministratorsPageOptionsDto } from '../dtos/admin-page-options.dto';
import Administrator from '../models/admin.model';
import { FindOptions } from 'sequelize';
import { PageDto } from '@common/dto/page.dto';
import { AdministratorDto } from '@modules/admin/dtos/admin.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { BaseService } from '@common/base/base.service';
import { InjectModel } from '@nestjs/sequelize';
import {AdminCreateDto} from "@modules/admin/dtos/admin-create.dto";

@Injectable()
export class AdministratorService extends BaseService<Administrator, AdministratorDto> {
  constructor(
    @InjectModel(Administrator)
    private adminModel: typeof Administrator,
  ) {
    super(adminModel);
  }

  async create(adminRegisterDto: AdminCreateDto): Promise<Administrator> {
    return await this._repository.create({ ...adminRegisterDto });
  }

  // async getMany(
  //   pageOptionsDto: AdministratorsPageOptionsDto,
  // ): Promise<PageDto<AdministratorDto>> {
  //   const options: FindOptions<Administrator> = {
  //     where: {},
  //     limit: 10,
  //     offset: 0,
  //     order: [],
  //     include: [],
  //   };
  //
  //   for (const key in pageOptionsDto) {
  //     if (!pageOptionsDto[key]) {
  //       continue;
  //     }
  //     switch (key) {
  //       case 'order':
  //       case 'page':
  //         break;
  //       case 'limit':
  //         options.limit = pageOptionsDto.limit;
  //         options.offset = (pageOptionsDto.page - 1) * pageOptionsDto.limit;
  //         break;
  //       default:
  //         options.where[key] = pageOptionsDto[key];
  //     }
  //   }
  //
  //   const admins = await this._repository.findAll(options);
  //
  //   const pageMeta = new PageMetaDto({
  //     pageOptionsDto: pageOptionsDto,
  //     itemCount: admins.length,
  //   });
  //
  //   return new PageDto<AdministratorDto>(admins, pageMeta);
  // }

  async getAdministratorByEmail(email: string): Promise<Administrator | null> {
    return await this._repository.findOne({ where: { email } });
  }
}
