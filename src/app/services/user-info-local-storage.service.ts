import { Injectable } from '@angular/core';

import { ToastService } from './toast.service';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoLocalStorageService {

  public isAvailable: boolean;
  
  private key = "HSST_UserInfo";

  constructor(private toastService: ToastService) { 
    this.isAvailable = localStorage != undefined;
    if (!this.isAvailable) {
      this.toastService.show("该浏览器不支持LocalStorage，本应用将无法进行存储操作。");
    }
  }

  public setUserInfo(value: UserInfo): boolean {
    if (!this.isAvailable) {
      return false;
    }
    
    localStorage.setItem(this.key, JSON.stringify({
      name: value.name,
      date: value.date != null ? value.date.toDateString() : "null"
    }));
    return true;
  }

  public getUserInfo(): UserInfo {
    let userInfo = JSON.parse(localStorage.getItem(this.key));

    return (!this.isAvailable || userInfo == null) ? null : {
      name: userInfo.name,
      date: userInfo.date != "null" ? new Date(userInfo.date) : null
    }

  }

}
