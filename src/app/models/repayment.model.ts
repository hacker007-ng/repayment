export interface Repayment {
    repaymentId: number;
    applicationId: number;
    dueDate: Date;
    amountDue: number;
    paymentDate?: Date;
    paymentStatus: 'PENDING' | 'COMPLETED';
}