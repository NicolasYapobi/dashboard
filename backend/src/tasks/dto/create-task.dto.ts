import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description: string;

    @ApiProperty({default: "A faire"})
    status: string;
}
