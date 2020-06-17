import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizStorageService {

  constructor() {  if (!this.get('currentUser')) {
    localStorage.setItem('OnlineQuiz', '');
  }
}

get(key?: string) {
  const val = JSON.parse(decodeURIComponent(escape(localStorage.getItem('OnlineQuiz') ?
    atob(localStorage.getItem('OnlineQuiz')) : '{}')));
  return val[key];
}

set(key: string, val: any) {
  const all = JSON.parse(decodeURIComponent(escape(localStorage.getItem('OnlineQuiz') ?
    atob(localStorage.getItem('OnlineQuiz')) : '{}')));
  all[key] = val;
  return localStorage.setItem('OnlineQuiz', btoa(unescape(encodeURIComponent(JSON.stringify(all)))));
}

remove(key) {
  const all = JSON.parse(decodeURIComponent(escape(localStorage.getItem('OnlineQuiz') ?
    atob(localStorage.getItem('OnlineQuiz')) : '{}')));
  delete all[key];
  localStorage.setItem('OnlineQuiz', btoa(unescape(encodeURIComponent(JSON.stringify(all)))));
  return true;
}
}
