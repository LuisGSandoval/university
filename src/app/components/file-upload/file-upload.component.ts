import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { FirebaseService } from '../../services/firebase.service';
import { SmartContractService } from '../../services/smart-contract.service'
import { User } from '../../models/user'
import { Asset } from '../../models/asset'

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { finalize } from 'rxjs/operators';

declare let require: any;
var sha256 = require('js-sha256').sha256;

declare var M: any;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: []
})
export class FileUploadComponent implements OnInit {
  totalStes: number = 3;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  uploadState: Observable<string>;
  fileNameId: string;
  fileExtension : string;


  finalizeDeal: boolean = false
  currentUserAccountAddress: any = "Not reachable";
  downloadURL: string;


  userTodealWith: User[];
  userToDealStep3: User;
  currentUserInfo: User[];

  userPercentage: number;
  expertPercentage: number;
  userToDealWithAddress: string;
  videoHashsha256: string;
  userToDealWithEmail: string;
  uploaderImageLink: string;

  asset: Asset = {
    assetURL: '',
    assetSha256Hash: '',
    expertAddress: '',
    expertPercentage: null,
    userAddress: '',
    userPercentage: null,
    price: null,
    currency: '',
    assetDescription : '',
    title : '',
    documentType: '',
    assetUploaderPicture : ''
  }

  constructor(private router: Router, private afStorage: AngularFireStorage, private fireService: FirebaseService, private contractServices: SmartContractService) { }

  ngOnInit() {
    let selectInputOptions = {}
    var selectInputElems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(selectInputElems, selectInputOptions);
  }

  upload(event) {
    const id: string = new Date().getTime().toString();

    this.fileNameId = `assets/${id}_${event.target.files[0].name}`
    this.fileExtension = this.fileNameId.split('.').pop();
    

    this.ref = this.afStorage.ref(this.fileNameId);
    this.task = this.ref.put(event.target.files[0])
    this.videoHashsha256 = sha256(this.fileNameId);

    //Para el porcentaje del progreso del upload
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        let fileNameIdToDownload = this.afStorage.ref(`assets/${id}_${event.target.files[0].name}`);
        fileNameIdToDownload.getDownloadURL().subscribe(url => {
          this.downloadURL = url
        })
        this.finalizeDeal = true;
      })).subscribe()
    this.showAgreementSection();
    ///UploadState
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  }
  //////This functions hides the loading section and shows the section where two people agree in a deal
  showAgreementSection() {
    let sectionOne = document.getElementById('setDealStepOne')
    sectionOne.classList.add('hide')

    let sectionTow = document.getElementById("setDealStepTwo");
    sectionTow.classList.remove('hide')
  }


  findUserByAddress() {

    ///******************************/
    ///Firebase
    if (this.userToDealWithEmail) {
      this.fireService.getSpecificUser(this.userToDealWithEmail).subscribe(data => {
        this.userTodealWith = data;
      });
      document.getElementById('serchUserByIdForm').classList.add('scale-out');
      document.getElementById('serchUserByIdForm').classList.add('hide');
    } else {
      M.toast({ html: 'The field is empty!' })
    }
  }

  resetForm() {
    let serchUserByIdForm = document.getElementById("serchUserByIdForm") as HTMLFormElement;
    serchUserByIdForm.reset();
    this.userToDealWithEmail = "";
    this.userTodealWith = null;
    document.getElementById('serchUserByIdForm').classList.remove('hide');

  }

  selectUserToDealWith(userToDealStep3: User) {
    document.getElementById('setDealStepTwo').classList.add('hide')
    document.getElementById('setDealStepThree').classList.remove('hide')


    ///get The current user Data
    ///******************************/
    ///Firebase
    this.contractServices.getUserAccount()
      .then(account => {
        this.currentUserAccountAddress = account;
        ///******************************/
        ///Firebase
        this.fireService.getUserAddress(account)
        this.fireService.getUserInfo().subscribe(queriedItems => {
          this.currentUserInfo = queriedItems;

          queriedItems.forEach(data => {
            console.log(data['profilePicture'])
            this.uploaderImageLink = data['profilePicture']
          })
        });
      });

    this.userToDealWithAddress = userToDealStep3['address']
    this.userToDealStep3 = userToDealStep3

  }



  sendAssetToDB() {
    this.asset.assetURL = this.downloadURL;
    this.asset.assetSha256Hash = this.videoHashsha256;
    this.asset.expertAddress = this.currentUserAccountAddress
    this.asset.userAddress = this.userToDealWithAddress;
    this.asset.userPercentage = this.userPercentage;
    this.asset.expertPercentage = this.expertPercentage;
    this.asset.documentType = this.fileExtension;
    this.asset.assetUploaderPicture = this.uploaderImageLink;

    if (this.asset.price == null) {
      M.toast({ html: "Please assign a price to the content" })
    } else if (this.asset.expertPercentage == undefined || this.asset.userPercentage == undefined) {
      M.toast({ html: "Please assign a percentage" })
    } else if (this.asset.currency == null) {
      M.toast({ html: "Please select a currency" })
    } else {
      this.fireService.addNewContent(this.asset)
      M.toast({ html: "Se ha registrado el contrato exitosamente" })
      this.router.navigate(['/user'])
    }
  }
}
