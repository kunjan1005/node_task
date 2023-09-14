import { HttpStatus, Injectable } from '@nestjs/common';
import { Options } from 'prettier';
import { QueryOptions } from 'src/constant/entity.interface';
import { HTTPerror } from 'src/constant/error.handling';
import { PAGE_LIMIT } from 'src/constant/global';
import { SuccessResponseFunc } from 'src/constant/reponse';
import {
  errorRecordNotCreated,
  errorRecordNotDeleted,
  errorRecordNotUpdated,
  errorTodoAlreadyExits,
  errorTodoNotFound,
  errorTodoStatus,
  successRecordCreated,
  successRecordDeleted,
  successRecordUpdate,
} from 'src/constant/strings';
import { TodoRepository } from 'src/repository/todo.repository';
import { CreateTodoDto, GetOrDeleteTodo, UpdateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly repository: TodoRepository) {}

  //#region  create todo
  async funTodoCreate(body:CreateTodoDto) {
    if (!body.title) throw new HTTPerror({ parameter: 'title' });
    if (!body.description) throw new HTTPerror({ parameter: 'description' });
    if (body.status && typeof body.status != 'boolean')
      throw new HTTPerror({
        error: errorTodoStatus,
      });
    const options: QueryOptions = {
      where: { title: body.title, active: true },
    };
    const attribute: string[] = ['id'];
    //check todo exits
    const find = await this.repository.getRowData(attribute, options);
    if (find)
      throw new HTTPerror({
        error: errorTodoAlreadyExits,
        statusCode: HttpStatus.FOUND,
      });
    //create payload
    const payload = {
      title: body.title.trim().toLowerCase(),
      description: body.description.trim(),
      status: body?.status ?? false,
    };
    //create data
    const data = await this.repository.createRowData(payload);
    if(!data)
    throw new HTTPerror({
      error: errorRecordNotCreated,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
    return SuccessResponseFunc(successRecordCreated,null,data);

  }
  //#endregion

  //#region  get all todo
  async funGetAllTodoList(body) {
    const page = +(body.page ?? 1);
    const seeAll = body.seeAll;
    //if you want completed todos then pass true else default value false
    const status = body?.status ?? false;
    const options: QueryOptions = {
      where: { status, active: true },
    };
    //default return limit data
    if (!seeAll) {
      options.limit = page;
      options.offset = page * PAGE_LIMIT - PAGE_LIMIT;
    }
    const attribute: string[] = [
      'id',
      'title',
      'description',
      'status',
      'createdAt',
      'active',
    ];
    //get all todos
    const data=await this.repository.getTableDataWithCount(attribute, options);
    return SuccessResponseFunc(null,null,data);

  }
  //#endregion

  //#region  get one todo
  async funGetSingleTodo(body) {
    if (!body.id) throw new HTTPerror({ parameter: 'id' });
    const options: QueryOptions = {
      where: { id: body.id, active: true },
    };
    const attribute: string[] = [
      'id',
      'title',
      'description',
      'status',
      'createdAt',
    ];
    //get single todo
    const data=await this.repository.getRowData(attribute, options);
    if(!data)
      throw new HTTPerror({
        error: errorTodoNotFound,
        statusCode: HttpStatus.NOT_FOUND,
      });
      return SuccessResponseFunc(null,null,data);

  }
  //#endregion

  //#region  get one todo
  async funUpdateTodo(body:UpdateTodoDto) {
    if (!body.id) throw new HTTPerror({ parameter: 'id' });
    console.log(body)
    if (body.status && typeof body.status != 'boolean')
      throw new HTTPerror({
        error: errorTodoStatus,
      });
    const updateRecord: any = {};
    if (body.title) updateRecord.title = body.title.trim().toLowerCase();
    if (body.description) updateRecord.description = body.title.trim();
    if (typeof body.status == 'boolean') updateRecord.status = body.status;
    //get update todo
    const update = await this.repository.updateRowData(updateRecord, body.id);
    if (update[0] == 0)
      throw new HTTPerror({
        error: errorRecordNotUpdated,
        statusCode: HttpStatus.CONFLICT,
      });
    //success response
    return SuccessResponseFunc(successRecordUpdate);
  }
  //#endregion

  //#region  delete todo
  async funDeleteTodo(body:GetOrDeleteTodo) {
    if (!body.id) throw new HTTPerror({ parameter: 'id' });
    const updateRecord: any = { active: false };
    //get delete todo
    const update = await this.repository.updateRowData(updateRecord, body.id);
    if (update[0] == 0)
      throw new HTTPerror({
        error: errorRecordNotDeleted,
        statusCode: HttpStatus.CONFLICT,
      });
    //success response
    return SuccessResponseFunc(successRecordDeleted);
  }
  //#endregion
}
