import { ApiProperty } from "@nestjs/swagger";
import { BasePresenter } from "../../base.presenter";

export class TokenPresenter {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SignInPresenter extends BasePresenter {
  @ApiProperty({ type: TokenPresenter })
  data: TokenPresenter;
}
