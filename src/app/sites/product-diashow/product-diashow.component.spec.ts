import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiashowComponent } from './product-diashow.component';

describe('ProductDiashowComponent', () => {
  let component: ProductDiashowComponent;
  let fixture: ComponentFixture<ProductDiashowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDiashowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDiashowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
