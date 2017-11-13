import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Group } from '../group.modal';

@Injectable()
export class DataService {
  groupBaseURL = 'https://team-organizer.herokuapp.com';

  constructor(public http: Http) { }

  // Load all Groups
 getGroups(): Observable<Group[]> {
   return this.http.get(`${this.groupBaseURL}/group`)
     .map(res => <Group[]> res.json());
 }

 //Add New Group
 addGroup(group){
  console.log(group); 
  return this.http.post(`${this.groupBaseURL}/group`, group, { 
  })
 .map(res =>  res.json()); 

 }

 //Delete a Group
 deleteGroup(groupId){
  console.log(groupId);
  return this.http
  .delete(`${this.groupBaseURL}/group/${groupId}`)
  .map(res =>  res.json()); 
 }

 //Update a Group 
 updateGroup(groupId,group){
  return this.http
  .put(`${this.groupBaseURL}/group/${groupId}`,group)
  .map(res =>  res.json()); 
 }

//  https://team-organizer.herokuapp.com/team

 //Getall Teams

 getAllTeams(): Observable<Group[]> {
  return this.http.get(`${this.groupBaseURL}/team`)
    .map(res => <Group[]> res.json());
}

//Add Team
addTeam(team,id){
  console.log(team,id);
  return this.http.post(`${this.groupBaseURL}/team`,team,{ 
  })
 .map(res =>  res.json()); 

 }

 //Delete a Team
 deleteTeam(teamId){
  console.log(teamId);
  return this.http
  .delete(`${this.groupBaseURL}/team/${teamId}`)
  .map(res =>  res.json()); 
 }

 //Update a Team 
 updateTeam(teamId,team){
  return this.http
  .put(`${this.groupBaseURL}/team/${teamId}`,team)
  .map(res =>  res.json()); 
 }

//GetAll Team Members
getAllTeamMembers(): Observable<Group[]> {
  return this.http.get(`${this.groupBaseURL}/teamMember`)
    .map(res => <Group[]> res.json());
}

//Add Team Member
addTeamMember(teamMember){
  console.log(teamMember); 
  return this.http.post(`${this.groupBaseURL}/teamMember`, teamMember, { 
  })
 .map(res =>  res.json()); 

 }

 //Delete a Team
 deleteTeamMember(teamId){
  console.log(teamId);
  return this.http
  .delete(`${this.groupBaseURL}/teamMember/${teamId}`)
  .map(res =>  res.json()); 
 }

 //Update a Team 
 updateTeamMember(teamMemberId,teamMember){
  return this.http
  .put(`${this.groupBaseURL}/teamMember/${teamMemberId}`,teamMember)
  .map(res =>  res.json()); 
 }



}
