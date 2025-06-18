import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDelete } from './history-delete';

describe('HistoryDelete', () => {
  let component: HistoryDelete;
  let fixture: ComponentFixture<HistoryDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
