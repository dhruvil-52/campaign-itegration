import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteformsComponent } from './deleteforms.component';

describe('DeleteformsComponent', () => {
  let component: DeleteformsComponent;
  let fixture: ComponentFixture<DeleteformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
