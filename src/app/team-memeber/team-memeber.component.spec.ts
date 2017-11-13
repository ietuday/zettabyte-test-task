import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemeberComponent } from './team-memeber.component';

describe('TeamMemeberComponent', () => {
  let component: TeamMemeberComponent;
  let fixture: ComponentFixture<TeamMemeberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemeberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
