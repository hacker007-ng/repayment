import { Injectable } from '@angular/core';
import { Repayment } from '../models/repayment.model';

@Injectable({
  providedIn: 'root',
})
export class RepaymentService {
  private userRepayments: { [userId: number]: Repayment[] } = {};

  constructor() {
    this.generateDummyData();
  }

  private generateDummyData(): void {
    this.userRepayments[123] = this.generateDummyRepayments(123);
    this.userRepayments[456] = this.generateDummyRepayments(456, 8, new Date(2024, 0, 1), 400, 600);
    this.userRepayments[789] = [];
  }

  generateDummyRepayments(
    applicationId: number,
    numRepayments: number = 12,
    startDate: Date = new Date(),
    minAmount: number = 500,
    maxAmount: number = 700
  ): Repayment[] {
    const repayments: Repayment[] = [];

    for (let i = 1; i <= numRepayments; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(startDate.getMonth() + i);
      repayments.push({
        repaymentId: i,
        applicationId: applicationId,
        dueDate: dueDate,
        amountDue: minAmount + Math.floor(Math.random() * (maxAmount - minAmount + 1)),
        paymentDate: i <= 3 ? new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate() - 1) : undefined,
        paymentStatus: i <= 3 ? 'COMPLETED' : 'PENDING',
      });
    }
    return repayments;
  }

  getRepaymentSchedule(userId: number, status?: 'PENDING' | 'COMPLETED'): Repayment[] {
    let repayments = this.userRepayments[userId] || [];
    if (status) {
      repayments = repayments.filter((r) => r.paymentStatus === status);
    }
    return repayments;
  }

  //for payment method <app-payment/>

  markPaymentAsComplete(userId: number, repaymentId: number, paymentDate: Date): void {
    const repayments = this.userRepayments[userId];
    if (repayments) {
      const repayment = repayments.find((r) => r.repaymentId === repaymentId);
      if (repayment && repayment.paymentStatus === 'PENDING') {
        repayment.paymentDate = paymentDate;
        repayment.paymentStatus = 'COMPLETED';
      }
    }
  }

  getOutstandingBalance(userId: number): number {
    const repayments = this.userRepayments[userId] || [];
    return repayments
      .filter((r) => r.paymentStatus === 'PENDING')
      .reduce((sum, r) => sum + r.amountDue, 0);
  }
}