import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css'
})
export class PaymentComponent {
    @Input() repaymentId?: number;
    @Input() amountDue?: number;
    @Output() paymentCompleted = new EventEmitter<number>();
    @Output() paymentCancelled = new EventEmitter<void>();

    paymentOptions: string[] = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];
    selectedPaymentOption?: string;
    paymentInProgress = false;
    paymentSuccess = false;
    currentStep: 'selection' | 'details' | 'processing' | 'success' = 'selection';

    creditCardDetails = { cardholderName: '', cardNumber: '', expiry: '', cvv: '' };
    debitCardDetails = { cardholderName: '', cardNumber: '', expiry: '', cvv: '' };
    upiDetails = { upiId: '' };
    netBankingDetails = { bankName: '' };
    walletDetails = { walletType: '' };

    selectPaymentOption(option: string): void {
        this.selectedPaymentOption = option;
        this.currentStep = 'details';
    }

    initiatePayment(): void {
        if (this.selectedPaymentOption) {
            this.currentStep = 'processing';
            this.paymentInProgress = true;
            setTimeout(() => {
                this.paymentInProgress = false;
                this.paymentSuccess = true;
                this.currentStep = 'success';
                if (this.repaymentId) {
                    this.paymentCompleted.emit(this.repaymentId);
                    alert("Payment Completed");
                }
            }, 2000); // Simulate payment processing
        } else {
            alert('Please select a payment option.');
        }
    }

    cancelPayment(): void {
        this.paymentCancelled.emit();
        this.currentStep = 'selection'; 
        this.selectedPaymentOption = undefined;
        this.paymentSuccess = false;
    }

    goBackToSelection(): void {
        this.currentStep = 'selection';
        this.selectedPaymentOption = undefined;
    }

    getPaymentIcon(option: string): string {
        switch (option) {
            case 'Credit Card':
                return 'bi bi-credit-card';
            case 'Debit Card':
                return 'bi bi-credit-card';
            case 'UPI':
                return 'bi bi-phone';
            case 'Net Banking':
                return 'bi bi-bank';
            case 'Wallet':
                return 'bi bi-wallet';
            default:
                return 'bi bi-credit-card';
        }
    }
}