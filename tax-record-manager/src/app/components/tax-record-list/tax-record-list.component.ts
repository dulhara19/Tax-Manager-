import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, CommonModule } from '@angular/common';
import { TaxRecord } from '../../models/tax-record';
import { TaxRecordService } from '../../services/tax-record.service';

@Component({
  selector: 'app-tax-record-list',
  templateUrl: './tax-record-list.component.html',
  styleUrls: ['./tax-record-list.component.css'],
  standalone: true,
  imports: [DecimalPipe, CommonModule]
})
export class TaxRecordListComponent implements OnInit {
  records: TaxRecord[] = [];
  loading = false;
  error = '';

  constructor(private service: TaxRecordService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.service.getTaxRecords().subscribe({
      next: res => { this.records = res; this.loading = false; },
      error: err => { this.error = 'Failed to load records.'; this.loading = false; }
    });
  }

  edit(record: TaxRecord): void {
    this.router.navigate(['/form', record.id]);
  }

  addNew(): void {
    this.router.navigate(['/form']);
  }

  delete(record: TaxRecord): void {
    if (!record.id) return;
    const confirmed = confirm(`Delete "${record.recordTitle}" (${record.taxYear})?`);
    if (!confirmed) return;

    this.service.deleteTaxRecord(record.id).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed')
    });
  }

  totalIncome(record: TaxRecord): number {
    // total income here we will show IncomeAmount (you can add computations if needed)
    return record.incomeAmount;
  }
}
