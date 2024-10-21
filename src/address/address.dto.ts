import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsString()
  houseNo: string;

  @IsString()
  locality: string;

  @IsOptional()
  @IsString()
  subLocality: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  pinCode: string;

  @IsString()
  country: string;
}
