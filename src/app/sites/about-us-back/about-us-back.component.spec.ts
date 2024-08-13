import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsBackComponent } from './about-us-back.component';

describe('AboutUsComponent', () => {
  let component: AboutUsBackComponent;
  let fixture: ComponentFixture<AboutUsBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutUsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
