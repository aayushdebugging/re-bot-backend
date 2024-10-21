import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './address.schema';
import { AddressDto } from './address.dto';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}

  async createAddress(addressDto: AddressDto): Promise<Address> {
    const address = new this.addressModel(addressDto);
    return address.save();
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }
}
