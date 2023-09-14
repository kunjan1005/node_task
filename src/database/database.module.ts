// Imports
import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.service';

@Module({
  providers: DatabaseProvider,
  exports: [],
})
export class DatabaseModule {}