import { Component, Injectable, input, OnDestroy, OnInit } from '@angular/core';
import { EntityService, UserService } from '@app/api/services';
import { Model } from "survey-core";
import { SurveyModule } from 'survey-angular-ui';
import { ActivatedRoute } from '@angular/router';
import { PlainLight } from 'survey-core/themes';
import { UnsubscribeOnDestroy } from 'fullswing-angular-library';

@Component({
    templateUrl: 'form.component.html',
    imports: [SurveyModule]
})
export class FormPageComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy
{
  surveyModel!: Model;
  id = input<string>();

  constructor(private entityService: EntityService, private userService: UserService, private route: ActivatedRoute)
  {
    super();
  }

  ngOnInit(): void {
    this.safe(this.entityService.apiEntityGetentityGet({ entityName: "User" })).subscribe((entities) => {
      console.log(entities);
    });

    // TODO last step for full automation, transform the above to the below
    const surveyJson = {
      elements: [{
        name: "firstName",
        title: "First Name:",
        type: "text"
      }, {
        name: "lastName",
        title: "Last Name:",
        type: "text"
      }, {
        name: "username",
        title: "Username:",
        type: "text"
      }, {
        name: "email",
        title: "Email:",
        type: "text"
      }]
    };

    let survey = new Model(surveyJson);
    survey.applyTheme(PlainLight);
    survey.completeText = "Add User";
    survey.completedHtml = "User added successfully!";
    if (this.id()) {
      this.safe(this.userService.apiUserIdGet({ id: this.id()! })).subscribe((user) => {
        console.log(user);
        survey.data = user;
      });
    }
    // TODO handle edit instead of always adding new user
    survey.onComplete.add((sender, options) => {
      console.log("Survey results: " + survey.data);
      this.safe(this.userService.apiUserPost({ body: survey.data })).subscribe((user) => {
        console.log("User created", user);
      });
    });
    this.surveyModel = survey;
  }
}
