import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedServiceService {

  // public $location: any = '';
  public locationSource = new BehaviorSubject<any>(null);
  private missionAnnouncedSource = new Subject<string>();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  // public $location = this.locationSource.asObservable();


  constructor() {
  }

  public setLocation(location: any) {
    console.log(location);

    this.locationSource.next(location);
  }

  public getLocation(): Observable<any> {
    console.log(this.locationSource.asObservable());

    return this.locationSource.asObservable();
  }


}
