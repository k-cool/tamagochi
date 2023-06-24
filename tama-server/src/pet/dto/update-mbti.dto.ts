import { MBTIType } from "../types/mbti.type";
import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
export class UpdateMBTIDto {
    @IsString()
    petId: string;

    @IsString()
    MBTIType: MBTIType;

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    variableValue: number;
}