import { IsString, IsMongoId, IsOptional, IsObject } from 'class-validator';

export class InventoryDto {
  @IsString()
  type: string;

  @IsString()
  subType: string;

  @IsString()
  saleType: string;

  @IsMongoId()
  @IsOptional()
  project: string;

  @IsMongoId()
  @IsOptional()
  address: string;

  @IsMongoId()
  @IsOptional()
  paymentPlan: string;

  @IsObject()
  @IsOptional()
  metadata: object;

  @IsMongoId()
  @IsOptional()
  dimension: string;
}

export class InventoryFilterDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  subType: string;

  @IsString()
  @IsOptional()
  locality: string;

  @IsString()
  @IsOptional()
  saleType: string;

  @IsString()
  @IsOptional()
  bhk: string;

  @IsString()
  @IsOptional()
  minPrice: string;

  @IsString()
  @IsOptional()
  maxPrice: string;
}
