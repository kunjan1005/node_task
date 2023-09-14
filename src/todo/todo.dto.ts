import { Transform } from "class-transformer"
import { IsBoolean, IsIn, IsNotEmpty, IsOptional } from "class-validator"

export class CreateTodoDto{
    @IsNotEmpty()
    @Transform(f=>f.value.toLowerCase().trim())
    title:string
    @IsNotEmpty()
    @Transform(f=>f.value.trim())
    description:string
    @IsBoolean()
    status:boolean
}

export class UpdateTodoDto{
    @IsNotEmpty()
    id:number
    @IsOptional()
    @Transform(f=>f?.value.toLowerCase().trim())
    title:string
    @IsOptional()
    @Transform(f=>f?.value.trim())
    description:string
    @IsOptional()
    status:boolean
}

export class GetOrDeleteTodo{
    @IsNotEmpty()
    id:number

}