import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

// import { CqrsModule } from '@nestjs/cqrs';
import { ApiConfigService } from './services/api-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';
import { FilesService } from '@shared/services/files.service';

const providers: Provider[] = [
  ApiConfigService,
  ValidatorService,
  AwsS3Service,
  GeneratorService,
  FilesService,
];

@Global()
@Module({
  providers,
  // imports: [CqrsModule],
  exports: [...providers],
})
export class SharedModule {}
