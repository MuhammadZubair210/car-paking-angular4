import { TestBed, async, inject } from '@angular/core/testing';

import { AdminguardGuard } from './adminguard.guard';

describe('AdminguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminguardGuard]
    });
  });

  it('should ...', inject([AdminguardGuard], (guard: AdminguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
