import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,
    MatFormFieldModule,
    MatButtonModule,MatDialogModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  addUserForm!: FormGroup;
  constructor(private userService: UserService,private fb: FormBuilder, private dialogRef: MatDialogRef<SignInComponent>){}

  ngOnInit(): void {
    
    this.addUserForm = this.fb.group({   
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])]
    })
  }


    signIn(){
      if(this.addUserForm.valid){
      this.userService.signIn(this.addUserForm.value.email as string, this.addUserForm.value.password as string).subscribe(
        (response:any) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('userId', response.userId);

              console.log("success", response);
              this.dialogRef.close(true);

        },
        (error)=>{
          this.dialogRef.close(false);
          alert("Error: logintion failed");
          console.log(error);
        })
      }
    }
  
}


 