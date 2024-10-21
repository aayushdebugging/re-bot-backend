import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PaymentPlanDto {
  @IsOptional()
  @IsNumber()
  totalAmountRent: number;

  @IsOptional()
  @IsNumber()
  totalAmountBuy: number;

  @IsString()
  paymentCriteria: string;
}

export class InstallmentDto {
  @IsString()
  percentage: string;

  @IsString()
  time: string;

  @IsString()
  description: string;
}
