import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service'
import { Observable } from 'rxjs/Observable'
import { Asset } from '../../../models/asset'

declare var M: any;

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: []
})
export class VideoListComponent implements OnInit {

  modalInstances: any;
  modalInstanceEdit: any;
  VideoPriceToSell: any = 0.04;
  showDescription: boolean = false;
  constructor(private router: Router, private fireStore: FirebaseService) { }

  asset : Observable<any[]>;

  ngOnInit() {

    this.fireStore.getContent().subscribe(data => {
      this.asset =  data
    });

    let modalOption = new Object();
    let modalElems = document.querySelectorAll('.modal');
    this.modalInstances = M.Modal.init(modalElems, modalOption);
    this.modalInstanceEdit = M.Modal.getInstance(modalElems);

    let previewVideo = document.getElementById('previewVideo') as HTMLVideoElement;

    previewVideo.onplay = function () {
      setTimeout(() => {
        previewVideo.pause();
        previewVideo.currentTime = 0;
        previewVideo.load();
      }, 6000);
    };
  }

  BuyVideo() {
    this.router.navigate(['/video'])
  }
}
