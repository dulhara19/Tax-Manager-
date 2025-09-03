import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxRecordService } from '../../services/tax-record.service';
import { TaxRecord } from '../../models/tax-record';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tax-record-form',
  templateUrl: './tax-record-form.component.html',
  styleUrls: ['./tax-record-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class TaxRecordFormComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  saving = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private service: TaxRecordService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null],
      recordTitle: ['', [Validators.required, Validators.maxLength(200)]],
      taxYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      incomeAmount: [0, [Validators.required]],
      deductionsAmount: [0, [Validators.required]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.service.getTaxRecord(id).subscribe({
        next: record => this.form.patchValue(record),
        error: () => alert('Failed to load record')
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value as TaxRecord;
    this.saving = true;

    if (this.isEdit && value.id) {
      this.service.updateTaxRecord(value.id, value).subscribe({
        next: () => { this.saving = false; this.router.navigate(['/']); },
        error: () => { this.saving = false; alert('Update failed'); }
      });
    } else {
      this.service.createTaxRecord(value).subscribe({
        next: () => { this.saving = false; this.router.navigate(['/']); },
        error: () => { this.saving = false; alert('Create failed'); }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
