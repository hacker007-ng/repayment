import { Component, OnInit } from '@angular/core';
import { RepaymentService } from '../service/repayment.service';
import { Repayment } from '../models/repayment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from '../payment/payment.component';

@Component({
    selector: 'app-repayment',
    standalone: true,
    imports: [CommonModule, FormsModule, PaymentComponent],
    templateUrl: './repayment.component.html',
    styleUrl: './repayment.component.css',
})
export class RepaymentComponent implements OnInit {
    repayments: Repayment[] = [];
    outstandingBalance = 0;
    userId = 123;
    filterStatus: 'ALL' | 'PENDING' | 'COMPLETED' = 'ALL';

    availableUserIds: number[] = [123, 456, 789];
    isPaymentModalVisible = false;
    selectedRepaymentIdForPayment?: number;
    selectedRepaymentAmount?: number;

    constructor(private repaymentService: RepaymentService) {}

    ngOnInit(): void {
        this.loadRepayments();
        this.outstandingBalance = this.repaymentService.getOutstandingBalance(this.userId);
    }

    loadRepayments(): void {
        if (this.filterStatus === 'ALL') {
            this.repayments = this.repaymentService.getRepaymentSchedule(this.userId);
        } else {
            this.repayments = this.repaymentService.getRepaymentSchedule(this.userId, this.filterStatus);
        }
    }

    makePayment(repaymentId: number, amountDue: number): void {
        this.selectedRepaymentIdForPayment = repaymentId;
        this.selectedRepaymentAmount = amountDue;
        this.isPaymentModalVisible = true;
    }

    handlePaymentCompleted(repaymentId?: number): void {
        if (repaymentId) {
            this.repaymentService.markPaymentAsComplete(this.userId, repaymentId, new Date());
            this.loadRepayments();
            this.outstandingBalance = this.repaymentService.getOutstandingBalance(this.userId);
        }
        this.isPaymentModalVisible = false;
        this.selectedRepaymentIdForPayment = undefined;
        this.selectedRepaymentAmount = undefined;
    }

    filterRepayments(status: 'ALL' | 'PENDING' | 'COMPLETED'): void {
        this.filterStatus = status;
        this.loadRepayments();
    }

    selectUser(userId: number): void {
        this.userId = userId;
        this.loadRepayments();
        this.outstandingBalance = this.repaymentService.getOutstandingBalance(this.userId);
    }
}