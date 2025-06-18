import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteById } from './delete-by-id';

describe('DeleteById', () => {
  let component: DeleteById;
  let fixture: ComponentFixture<DeleteById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteById);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
