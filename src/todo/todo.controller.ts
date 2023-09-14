import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, GetOrDeleteTodo, UpdateTodoDto } from './todo.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo') // Add tags for Swagger
export class TodoController {
  constructor(private readonly service: TodoService) {}
  //#region  create todo list
  @Post('createTodoList')
  async funCreateTodoList(@Body() body:CreateTodoDto) {
    return await this.service.funTodoCreate(body);
  }
  //#endregion

  //#region  get all todo list
  @Get('getTodoList')
  async funGetTodoList(@Query() query) {
    return await this.service.funGetAllTodoList(query);
  }
  //#endregion

  //#region  get each tod
  @Get('getTodo/:id')
  async funGetTodo(@Param() param) {
    return await this.service.funGetSingleTodo(param);
  }
  //#endregion

  //#region update todo
  @Post('updateTodo')
  async funUpdateTodo(@Body() body:UpdateTodoDto) {
    return await this.service.funUpdateTodo(body);
  }
  //#endregion

  //#region  delete todo
  @Post('deleteTodo')
  async funDeleteTodo(@Body() body:GetOrDeleteTodo) {
    return await this.service.funDeleteTodo(body);
  }
  //#endregion
}
