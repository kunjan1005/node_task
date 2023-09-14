import { TODO_ENTITY } from "./constant/entities";
import { TodoEntity } from "./entity/todo.entity";

export const AppProvider = [
    // todo
    { provide: TODO_ENTITY, useValue: TodoEntity },
  
 
  ];