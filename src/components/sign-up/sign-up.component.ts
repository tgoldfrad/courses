import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatOption } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,
    MatButtonModule,MatDialogModule,MatRadioModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userRoles:string[] = ["teacher","student"];
  addUserForm!: FormGroup;

  constructor(private userService: UserService,private fb: FormBuilder, private dialogRef: MatDialogRef<SignUpComponent>){}

  ngOnInit(): void {
    
    this.addUserForm = this.fb.group({
      name:['',Validators.compose([Validators.required, Validators.minLength(3)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])],
      role:['',Validators.required],

    })
  }


  signUp(){
    if(this.addUserForm.valid){
    this.userService.signUp(this.addUserForm.value.name as string,this.addUserForm.value.email as string,
       this.addUserForm.value.password as string,this.addUserForm.value.role as string).subscribe(
        (response:any)=>{
          console.log(response);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('userId', response.userId);
          this.dialogRef.close(true);
        },
        (error)=>{
          this.dialogRef.close(false);
          alert("Error: registration failed");
          console.log(error);
        }
      )

        
    }
  }

}
