import { ApiProperty } from "@nestjs/swagger";

export class BasePresenter {
  @ApiProperty()
  data: any;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status: number;
}
