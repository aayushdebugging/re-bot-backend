import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentPlan, PaymentPlanSchema } from './payment-plan.schema';
import { Installment, InstallmentSchema } from './installment.schema';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentPlan.name, schema: PaymentPlanSchema },
      { name: Installment.name, schema: InstallmentSchema },
    ]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
