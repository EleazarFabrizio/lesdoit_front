import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CebollaComponent } from './cebolla.component';

describe('CebollaComponent', () => {
  let component: CebollaComponent;
  let fixture: ComponentFixture<CebollaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CebollaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CebollaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
