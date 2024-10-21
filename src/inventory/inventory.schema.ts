import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from '../address/address.schema';
import { PaymentPlan } from '../finance/payment-plan.schema';

@Schema()
export class Inventory extends Document {
  @Prop({ type: String, required: true })
  type: string;  // e.g., 'R', 'S', etc.

  @Prop({ type: String, required: true })
  subType: string;  // e.g., 'Flat', 'Villa', etc.

  @Prop({ type: String, required: true })
  saleType: string;  // e.g., 'off-plan', 'secondary'

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;  // Reference to Project

  @Prop({ type: Types.ObjectId, ref: 'Address', required: false })
  address: Address;  // Reference to Address schema

  @Prop({ type: Types.ObjectId, ref: 'PaymentPlan', required: false })
  paymentPlan: PaymentPlan;  // Reference to PaymentPlan schema

  @Prop({ type: Map, of: String, default: {} })
  metadata: Map<string, any>;  // Metadata as a key-value pair

  @Prop({ type: Types.ObjectId, ref: 'InventoryDimension', required: false })
  dimension: Types.ObjectId;  // Reference to InventoryDimension
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
