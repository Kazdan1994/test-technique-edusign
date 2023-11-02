import { GlobalService } from './services/global/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'client';

  bodyText: string = '';

  constructor(private _global: GlobalService) {}

  ngOnInit(): void {

    this._global.loadHomeText().then(bodyText => {
      this.bodyText = bodyText;
    });
    
  }
}
