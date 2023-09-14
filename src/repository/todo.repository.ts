import { Inject, Injectable } from '@nestjs/common';
import { TODO_ENTITY } from 'src/constant/entities';
import { HTTPerror } from 'src/constant/error.handling';
import { errorRecordNotCreated } from 'src/constant/strings';
import { TodoEntity } from 'src/entity/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(
    @Inject(TODO_ENTITY)
    private readonly repository: typeof TodoEntity,
  ) {}
  async createRowData(data: any) {
    const createdData = await this.repository.create(data);
    if (!createdData) throw new HTTPerror({ error: errorRecordNotCreated });
    return createdData['dataValues'];
  }

  async getRowData(attributes: string[], options: any) {
    return await this.repository.findOne({
      attributes,
      ...options,
    });
  }

  async getTableWhereData(attributes: string[], options: any) {
    let listData = await this.repository.findAll({
      attributes,
      ...options,
      distinct: true,
    });
    listData = listData.map((el) => el.get({ plain: true }));
  }
  async getTableDataWithCount(attributes: string[], options) {
    const listData = await this.repository.findAndCountAll({
      attributes,
      ...options,
      distinct: true,
    });
    listData.rows = listData.rows.map((el) => el.get({ plain: true }));
    return listData;
  }

  async updateRowData(updatedData: any, id: number) {
    return await this.repository.update(updatedData, { where: { id } });
  }
  async updateRowDataWithOptions(updatedData: any, options) {
    return await this.repository.update(updatedData, options);
  }
}
