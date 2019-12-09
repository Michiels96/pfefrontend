import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  kid_connected=null;
  listeEnfants;
  kid_selected;
  isNotConnected=true;
  
  constructor(private api: ApiService,public authService: AuthService) { }

  ngOnInit() {
    
  
    if (localStorage.length > 0) {
      if(localStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant(JSON.parse(localStorage.getItem('kid_connected')));
      }
    } 
    localStorage.setItem('kid_connected', '');
    this.api.getUnloggedEnfants().subscribe(
      data => {
        //console.log(data);
        this.listeEnfants =data;//Array.of(data);
        console.log("enfant");
        console.log(this.listeEnfants);
      },
      error => {
        console.log(error);
      }
    )
  }
  connecterEnfant(){
    console.log("enfant a connecter");
    console.log(this.kid_selected.enfant_id);
    this.api.updateKid(this.kid_selected,true).subscribe(
      data => {
        //console.log(data);
        this.kid_selected = data;
        if(this.kid_selected.connecte==true){
          this.isNotConnected=false;
          this.authService.loginKid();
          console.log("connecté")
          localStorage.setItem('kid_connected', JSON.stringify(this.kid_selected));
        }
        
      },
      error => {
        console.log(error);
      }
    )
    
  }
  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
