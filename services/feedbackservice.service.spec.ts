import { TestBed, inject } from '@angular/core/testing';

import { FeedbackserviceService } from './feedbackservice.service';

describe('FeedbackserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackserviceService]
    });
  });

  it('should be created', inject([FeedbackserviceService], (service: FeedbackserviceService) => {
    expect(service).toBeTruthy();
  }));
});
