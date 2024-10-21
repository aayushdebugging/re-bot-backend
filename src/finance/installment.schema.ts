import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentPlan } from './payment-plan.schema';

@Schema()
export class Installment extends Document {
  @Prop({ type: String })
  percentage: string;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'PaymentPlan' })
  paymentPlan: PaymentPlan;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
