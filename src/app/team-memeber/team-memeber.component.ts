import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Group } from "../group.modal";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Message,SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-team-memeber',
  templateUrl: './team-memeber.component.html',
  styleUrls: ['./team-memeber.component.scss']
})
export class TeamMemeberComponent implements OnInit {
teamMemberId:string;
sortF:string;
teamMembers :Array<Group>;
userform: FormGroup;
submitted: boolean;
msgs: Message[] = [];
responseStatus:Object= [];
updateTeamMember:boolean;

  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder, private dataService: DataService) {
    this.teamMemberId = this.route.snapshot.params.secret;
   }

   ngOnInit() {
    this.getAllTeamMembers();

    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'middleName': new FormControl(''),
      'lastName': new FormControl('', Validators.required),
      'EmailAddress': new FormControl('', Validators.required),
      'teamId': new FormControl(this.teamMemberId)
  });
  }
  /**
   * @function getAllTeamMembers
   * @description make an api call through service to get all team members
   */
  getAllTeamMembers(){

    this.dataService.getAllTeamMembers().subscribe(teamData =>{
      this.teamMembers = teamData;
    });
  }

/**
 * @function changeSort
 * @param event 
 * @function used to sort the data table.
 */
  changeSort(event) {
    if (!event.order) {
      this.sortF = 'name';
    } else {
      this.sortF = event.field;
    }
 }


/**
 * @function onSubmit
 * @param value 
 * @description on Submit form of team member make an api call through service save or 
 *              update the team member
 */
 onSubmit(value: string) {
  this.submitted = true;
  this.userform.reset();
  this.msgs = [];
  this.msgs.push({severity:'info', summary:'Success', detail:'Team Submitted'});
  
  // Passing the value to API to add Team Member
  if(!this.updateTeamMember){
      this.dataService.addTeamMember(value).subscribe(
      data => console.log(this.responseStatus = data),
      err => console.log(err),
      () => {
      console.log('Team Member Added Succesfully');
      this.msgs.push({severity:'info', summary:'Success', detail:'Team Memeber Added Succesfull'});
      
      this.getAllTeamMembers();
      }
    );  
  }else if(this.updateTeamMember){
        this.dataService.updateTeamMember(this.teamMemberId,value).subscribe(
        data => console.log(this.responseStatus = data),
        err => console.log(err),
        () => {
        console.log('Team Member Updated Succesfully');
        this.msgs.push({severity:'info', summary:'Success', detail:'Team Member Updated Succesfull'});
        
        this.getAllTeamMembers();
      }
    );
  }

}

/**
 * @function editTeamMember
 * @param teamMember 
 * @description used to edit the Team Member
 */
 editTeamMember(teamMember){
   this.userform.patchValue(teamMember);
   this.updateTeamMember = true;
   this.teamMemberId = teamMember._id;
 }

 /**
  * @function deleteTeamMember
  * @param teamMember 
  * @description call dataservice to delete a Team member.
  */

 deleteTeamMember(teamMember){
   this.dataService.deleteTeamMember(teamMember._id).subscribe(
     data => console.log(this.responseStatus = data),
     err => console.log(err),
     () => {
       console.log('Team Member Deleted Succesfully');
       this.msgs.push({severity:'info', summary:'Success', detail:'Team Member deleted Succesfull'});
       
       this.getAllTeamMembers();
     }
  ); 

   
 }
}
