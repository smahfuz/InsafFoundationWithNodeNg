import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donations.html',
  styleUrl: './donations.scss',
})
export class Donations {

  today = new Date();

  // last 30 days transactions (static generate)
  transactions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(this.today.getDate() - i);

    return {
      name: ['Rahim', 'Karim', 'Sakib', 'Hasan'][i % 4],
      payment: ['Bkash', 'Nagad', 'Rocket'][i % 3],
      trxId: 'TRX' + (10000 + i),
      amount: 500 + (i * 10),
      date: date
    };
  });

  // expenses (fixed total 20000)
  expenses = [
    { title: 'Students Help', amount: 5000 },
    { title: 'Poor People Food', amount: 4000 },
    { title: 'Medical Treatment', amount: 6000 },
    { title: 'Mosque Support', amount: 3000 },
    { title: 'Emergency Aid', amount: 2000 },
  ];

  get totalIncome() {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpense() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}