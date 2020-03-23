import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUserNames = ['Punit', 'Harshit'];
  submitted : boolean = false;

  signupForm : FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl('kanhaiya', [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl('abc@mail.com', [Validators.required, Validators.email]),
      }),
      'gender' : new FormControl('male', [Validators.required]),
      'hobbies' : new FormArray([])

    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm)

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  getHobbyControls(){
    (<FormArray>this.signupForm.get('hobbies')).controls
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control : FormControl) : {[key : string] : boolean } {
    if(this.forbiddenUserNames.indexOf(control.value) > -1) {
      console.log('Invalid name ' +control.value)
      return {'userNameInvalid' : true};
    }
    return null
  }

}
