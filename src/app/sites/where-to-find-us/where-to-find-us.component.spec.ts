import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereToFindUsComponent } from './where-to-find.us.component';

describe('ContactComponent', () => {
  let component: WhereToFindUsComponent;
  let fixture: ComponentFixture<WhereToFindUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhereToFindUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhereToFindUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
