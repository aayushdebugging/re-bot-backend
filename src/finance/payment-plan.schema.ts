import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PaymentPlan extends Document {
  @Prop({ type: Number })
  totalAmountRent: number;

  @Prop({ type: Number })
  totalAmountBuy: number;

  @Prop({ type: String, required: true })
  paymentCriteria: string;
}

export const PaymentPlanSchema = SchemaFactory.createForClass(PaymentPlan);
