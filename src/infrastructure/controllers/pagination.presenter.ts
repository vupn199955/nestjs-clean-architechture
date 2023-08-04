import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationOptionsDto } from "./pagination-options.dto";
import { IResponsePagination } from "../../business/core/pagination-response.interface";

export class PaginationMetaPresenter {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly totalItem: number;

  @ApiProperty()
  readonly totalPage: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ paginationOptionsDto, totalItem }: PageMetaDtoParameters) {
    this.page = paginationOptionsDto.page;
    this.take = paginationOptionsDto.take;
    this.totalItem = totalItem;
    this.hasPreviousPage = this.page > 1;
    this.totalPage = Math.ceil(this.totalItem / this.take);
    this.hasNextPage = this.page < this.totalPage;
  }
}

export class PaginationPresenter<T> implements IResponsePagination<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PaginationMetaPresenter })
  readonly meta: PaginationMetaPresenter;

  constructor(data: T[], meta: PaginationMetaPresenter) {
    this.data = data;
    this.meta = meta;
  }
}

export interface PageMetaDtoParameters {
  paginationOptionsDto: PaginationOptionsDto;
  totalItem: number;
}
