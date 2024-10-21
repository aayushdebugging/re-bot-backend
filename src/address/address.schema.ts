import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ type: String })
  houseNo: string;

  @Prop({ type: String, required: true })
  locality: string;

  @Prop({ type: String })
  subLocality: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String })
  pinCode: string;

  @Prop({ type: String, required: true })
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
