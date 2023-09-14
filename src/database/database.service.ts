import { TodoEntity } from 'src/entity/todo.entity';
import { databaseConfig } from './database.config';
import { Sequelize } from 'sequelize-typescript';


export const DatabaseProvider = [
 
  {
    provide: 'TODODATABASE',
    useFactory: async () => {
      const config: any = databaseConfig.todoDB;
      const sequelize = new Sequelize(config);
      const entities = [TodoEntity];
      sequelize.addModels(entities);
      await sequelize.sync();
      return sequelize;
    },
  },
 
];