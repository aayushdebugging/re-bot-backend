import { Controller, Post, Body } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { PaymentPlanDto, InstallmentDto } from './finance.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('payment-plan')
  async createPaymentPlan(@Body() paymentPlanDto: PaymentPlanDto) {
    return this.financeService.createPaymentPlan(paymentPlanDto);
  }

  @Post('installment')
  async createInstallment(@Body() installmentDto: InstallmentDto) {
    return this.financeService.createInstallment(installmentDto);
  }
}
