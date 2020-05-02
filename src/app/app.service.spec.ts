import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Covid19ervice } from './app.service';

describe('Covid19ervice', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({}).compileComponents();
    }));


    it('should be created ', () => {
        const service: Covid19ervice = TestBed.get(DataNewService);
        expect(service).toBeTruthy();
  });


});
