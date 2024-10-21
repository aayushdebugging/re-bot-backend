import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(@Body() addressDto: AddressDto) {
    return this.addressService.createAddress(addressDto);
  }

  @Get()
  async getAllAddresses() {
    return this.addressService.getAllAddresses();
  }
}
