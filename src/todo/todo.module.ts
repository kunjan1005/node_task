import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from 'src/repository/todo.repository';
import { AppProvider } from 'src/app.provider';

@Module({
  controllers: [TodoController],
  providers: [...AppProvider,TodoService,TodoRepository],

})
export class TodoModule {}
