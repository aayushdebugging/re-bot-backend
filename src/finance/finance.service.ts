import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentPlan } from './payment-plan.schema';
import { Installment } from './installment.schema';
import { PaymentPlanDto, InstallmentDto } from './finance.dto';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(PaymentPlan.name) private paymentPlanModel: Model<PaymentPlan>,
    @InjectModel(Installment.name) private installmentModel: Model<Installment>,
  ) {}

  async createPaymentPlan(data: PaymentPlanDto): Promise<PaymentPlan> {
    const paymentPlan = new this.paymentPlanModel(data);
    return paymentPlan.save();
  }

  async createInstallment(data: InstallmentDto): Promise<Installment> {
    const installment = new this.installmentModel(data);
    return installment.save();
  }
}
