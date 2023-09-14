import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { validate } from 'class-validator';
  import { plainToClass } from 'class-transformer';
  
//  validation pipe for dto
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    constructor() {}
  
    async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
  
      const object = plainToClass(metatype, value, { exposeUnsetFields: false });
      const errors = await validate(object, {});
      if (errors.length > 0) {
        let errorMessages = [];
        for (let row of errors) {
          for (let msg in row['constraints']) {
            errorMessages.push(row['constraints'][msg]);
          }
        }
        throw new BadRequestException(errorMessages);
      }
      return object;
    }
  
    private toValidate(metatype: Function): boolean {
      const types: Function[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
  }