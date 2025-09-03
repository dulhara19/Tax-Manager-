export interface TaxRecord {
  id?: number; // optional when creating
  recordTitle: string;
  taxYear: number;
  incomeAmount: number;
  deductionsAmount: number;
  notes?: string;
}
