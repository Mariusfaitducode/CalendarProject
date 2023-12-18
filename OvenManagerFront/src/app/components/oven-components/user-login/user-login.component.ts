import { Component, OnInit, Input } from '@angular/core';
// import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {

  @Input() loginModal : any = {
    show : false,
    user : {},
  };

  @Input() user : any = {}

  constructor() { } 

  // ngOnInit() {
    
  // }

  onWillDismiss(){
    console.log("onWillDismiss")
    this.loginModal.show = false;
  }

  onClose(){
    console.log("onClose")
    this.loginModal.show = false;
  }

  validConnexion(){

    if (this.loginModal.user.login = "admin" && this.loginModal.user.password == "admin"){

      this.loginModal.show = false;
      this.user.login = "admin";
      this.user.admin = true;
      this.user.connected = true;
      console.log("validConnexion")

      // this.authService.setUserCookie(this.user, 1);

    }
    else{
      console.log("invalidConnexion")
    }
  }


  disconnexion(){
    this.user = {};
    // this.authService.clearUserCookie();
  }

}

