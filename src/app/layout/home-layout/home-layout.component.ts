import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
   
    <div>
      <router-outlet></router-outlet>
    </div>
    <!--<footer class="fixed-footer">
      <div class="container-fluid">
        <div class="row py-2 px-5">
          <div class="col-md-6">
            <p class="mb-0">&#169; 2019 IMMPAKT. All Rights Reserved</p>
          </div>
          <div class="col-md-6 text-right">
            <p class="mb-0">Powered by <a class="xen-red" href="http://www.xenneotech.com/">XENNEO</a></p>
          </div>
        </div>
      </div>
    </footer>-->`,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
