import { TestBed } from '@angular/core/testing';

import { ExcelServicesService } from './excel-service.service';

describe('ExcelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelServicesService = TestBed.get(ExcelServicesService);
    expect(service).toBeTruthy();
  });
});
