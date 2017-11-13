import { Component, OnInit } from '@angular/core';
import {DataService } from '../service/data.service';
import { Message,SelectItem } from 'primeng/primeng';
import { Group } from '../group.modal';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups :Array<Group>;
  cols: any[];
  sortF = '';
  updateGroup: boolean;
  group: Group = new Group();
  groupId : string;
  selectedGroup: Group;
  newGroup: boolean;
  groupss: Group[];
  name:string;
  description : string;
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];
  responseStatus:Object= [];
  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
      this.getAllGroups();

            this.userform = this.fb.group({
              'name': new FormControl('', Validators.required),
              'description': new FormControl('', Validators.required),
          });
  }

  /**
   * @function getAllGroups
   * @description make an api call through service to get all groups
   */
  getAllGroups(){
    this.dataService.getGroups().subscribe(groupData =>{
      this.groups = groupData;
    });
  }
/**
 * @function onSubmit
 * @param value 
 * @description On submitting a form for a group for create or update group.
 */
  onSubmit(value: string) {
    this.submitted = true;
    this.userform.reset();
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Group Submitted'});
    console.log(value);
    
    //Passing the value to API to add Group
    if(!this.updateGroup){
        this.dataService.addGroup(value).subscribe(
        data => console.log(this.responseStatus = data),
        err => console.log(err),
        () => {
        console.log('Group Added Succesfully');
        this.msgs.push({severity:'info', summary:'Success', detail:'Group Added Succesfully'});
        this.getAllGroups();
        }
      );  
    }else if(this.updateGroup){
          this.dataService.updateGroup(this.groupId,value).subscribe(
          data => console.log(this.responseStatus = data),
          err => console.log(err),
          () => {
          console.log('Group Updated Succesfully');
          this.msgs.push({severity:'info', summary:'Success', detail:'Group Updated Succesfully'});
          this.getAllGroups();
        }
      );
    }

}

/**
 * @function changeSort
 * @param event 
 * @description used to sort the DataTable of Group List
 */
changeSort(event) {
    if (!event.order) {
      this.sortF = 'name';
    } else {
      this.sortF = event.field;
    }
}

/**
 * @function deleteGroup
 * @param group 
 * @description make an api call to delete a group from the list
 */
deleteGroup(group){
  console.log(group._id);
  this.dataService.deleteGroup(group._id).subscribe(
    data => console.log(this.responseStatus = data),
    err => console.log(err),
    () => {
      console.log('Group Deleted Succesfully');
      this.msgs.push({severity:'info', summary:'Success', detail:'Group Deleted Succesfully'});
      this.getAllGroups();
    }
 ); 
}

/**
 * @function editGroup
 * @param group 
 * @description used to edit a group details
 */
editGroup(group){
  console.log(group);
  this.userform.patchValue(group);
  this.updateGroup = true;
  this.groupId = group._id;
}

/**
 * @function detailGroup
 * @param group 
 * @description  used to navigate to team list
 */
detailGroup(group){
  console.log(group._id);
  this.router.navigate(['/team',group._id]);
}
}
