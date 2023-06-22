import { MBTIType } from "../types/mbti.type";
import { IsString, IsInt } from 'class-validator';
export class UpdateMBTIDto {
    @IsString()
    petId: string;

    @IsString()
    MBTIType: MBTIType;

    @IsInt()
    variableValue: number;
}