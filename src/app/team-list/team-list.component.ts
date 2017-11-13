import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Group } from "../group.modal";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Message,SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  groupId:string;
  teams :Array<Group>;
  sortF:string;
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];
  responseStatus:Object= [];
  updateTeamList:boolean;

  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder, private dataService: DataService) {
    this.groupId = this.route.snapshot.params.id;
    console.log(this.groupId);
   }

  ngOnInit() {
    this.getAllTeams();

    this.userform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'techStack': new FormControl('', Validators.required),
      'groupId':new FormControl(this.groupId)
  });
  }
/**
 * @function getAllTeams
 * @description used 
 */
  getAllTeams(){
    // this.dataService.getAllTeams()

    this.dataService.getAllTeams().subscribe(teamData =>{
      this.teams = teamData;
      console.log(this.teams);
    });
  }

/**
 * @function changeSort
 * @param event 
 * @description used to sort the dataTable of team-list
 */
  changeSort(event) {
    console.log(event);
    
    if (!event.order) {
      this.sortF = 'name';
    } else {
      this.sortF = event.field;
    }
 }
/**
 * @function onSubmit
 * @param value 
 * @description used to save or update a team from list of teams
 */
 onSubmit(value: string) {
  this.submitted = true;
  this.userform.reset();
  this.msgs = [];
  this.msgs.push({severity:'info', summary:'Success', detail:'Team Submitted'});
  console.log(value);
  //Passing the value to API to add Team
  if(!this.updateTeamList){
      this.dataService.addTeam(value,this.groupId)
      .subscribe(
      data => console.log(this.responseStatus = data),
      err => console.log(err),
      () => {
      console.log('Team Added Succesfully');
      this.msgs.push({severity:'info', summary:'Success', detail:'Team Added Succesfull'});
      
      this.getAllTeams();
      }
    );  
  }else if(this.updateTeamList){
        this.dataService.updateTeam(this.groupId,value).subscribe(
        data => console.log(this.responseStatus = data),
        err => console.log(err),
        () => {
        console.log('Team Updated Succesfully');
        this.msgs.push({severity:'info', summary:'Success', detail:'Team updated Succesfull'});
      
        this.getAllTeams();
      }
    );
  }

}

/**
 * @function editTeam
 * @param team 
 * @description used to edit a team
 */
 editTeam(team){
   console.log(team);
   this.userform.patchValue(team);
   this.updateTeamList = true;
   this.groupId = team._id;
 }

 /**
  * @function deleteTeam
  * @param team 
  * @description used to delete a team by making an api call
  */
 deleteTeam(team){
   console.log(team);
   console.log(team._id);
   this.dataService.deleteTeam(team._id).subscribe(
     data => console.log(this.responseStatus = data),
     err => console.log(err),
     () => {
       console.log('Team Deleted Succesfully');
      this.msgs.push({severity:'info', summary:'Success', detail:'Team Deleted Succesfull'});
      
       this.getAllTeams();
     }
  ); 
   
 }

/**
 * @function detailTeam
 * @param team 
 * @description used to navigate to team member screen
 */
 detailTeam(team){
   console.log(team._id);
   this.router.navigate(['/team',this.groupId,team._id,'team-members']);
 }
}
