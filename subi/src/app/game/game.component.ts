import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games: any;
  displayedColumns = ['game_name', 'team', 'organizer', 'contact_org'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.api.getGames()
      .subscribe(res => {
        console.log(res);
        this.games = res;
      }, err => {
        console.log(err);
      });
  }
}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getGames();
  }

  disconnect() {

  }
}
