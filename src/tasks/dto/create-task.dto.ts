import { IsNotEmpty, Length } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    title:string;

    @Length(10, 30)
    description:string;
}