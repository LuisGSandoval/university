import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmartContractService } from '../../services/smart-contract.service'

declare var M:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  
  constructor( private router : Router, private contractServices: SmartContractService,) {
  }
  account: any;
  showRegisterForm : boolean = false;
  userIsSet : boolean = false;
  userNickname : string = '';
  searching : boolean = false;
  

  ngOnInit() {
    if(this.contractServices.metamaskHolder == false){
      alert('Deberías probar metamask')
    } 


    //this.account = this.contractServices.getUserAccount();
    // let accountAddress : any ;
    //let getAccount = this.contractServices.getAccount();
    // console.log(getAccount.toString())
    // accountAddress = this.contractServices.getAccount().then(data => {
    //   return data;
    // });
    // console.log(accountAddress[1].toString())

    



    ///******************************/
    ///Inicializaciones para materialize

    let modalOptions = new Object();
    var modalElems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(modalElems, modalOptions);

    let sideNavOptions = new Object();
    var sidenavElems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(sidenavElems, sideNavOptions);

    var selectElemsOptions = new Object();
    var selectElems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(selectElems, selectElemsOptions);
    ///******************************/
  }

//  Mostrar formulario de registro
  getRegisterForm(){
    if(this.showRegisterForm == false){
      this.showRegisterForm = true;
    }else{
      this.showRegisterForm = false;
    }
  }
// Utilizar el nombre del usuario para la vsita
  setNickname(){
    if(this.userNickname.length < 2){
      M.toast({html: 'Please fill out the form!'}); 
    }
  }

// Mostrar input para realizar busqueda
  showSearchInput() {
    if(this.searching == true){
      this.searching = false;
    }else{
      this.searching = true; 
    }
  }
// realizar busqueda de topic seleccionado
  onSubmitSearchImages(){
    this.router.navigate(['/videoSearch']); 
  }
}
