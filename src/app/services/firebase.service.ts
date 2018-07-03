import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Asset } from '../models/asset'
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class FirebaseService {
  users: Observable<any[]>;
  assets: Observable<any[]>;
  videos : Observable<any[]>;
  UserAddress : string;


  //para agregar un nuevo elemento
  constructor(public db: AngularFirestore) {
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  getUserAddress(address: string){
    this.UserAddress = address;
    this.getUserInfo();
  }

  getUserInfo(){
    if(this.UserAddress){
      return this.users = this.db.collection('Users',  ref => ref.where('address', '==', this.UserAddress)).valueChanges();
    }
  }

  getContent(){
    return this.videos = this.db.collection<Asset>('Assets').valueChanges();
  }

  addNewUser(user: User){
    const usersColection = this.db.collection<User>('Users');
    usersColection.add(user);
  }

  getSpecificUser(email : string){
    if(email){
      return this.users = this.db.collection('Users',  ref => ref.where('email', '==', email)).valueChanges();
    }
  }

  addNewContent(asset : Asset){
    const assetCollection = this.db.collection<Asset>('Assets');
    assetCollection.add(asset);
  }
}
