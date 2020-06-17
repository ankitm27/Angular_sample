import { TestBed } from '@angular/core/testing';

import { QuizStorageService } from './quiz-storage.service';

describe('QuizStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizStorageService = TestBed.get(QuizStorageService);
    expect(service).toBeTruthy();
  });
});
