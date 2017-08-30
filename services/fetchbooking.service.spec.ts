import { TestBed, inject } from '@angular/core/testing';

import { FetchbookingService } from './fetchbooking.service';

describe('FetchbookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchbookingService]
    });
  });

  it('should be created', inject([FetchbookingService], (service: FetchbookingService) => {
    expect(service).toBeTruthy();
  }));
});
