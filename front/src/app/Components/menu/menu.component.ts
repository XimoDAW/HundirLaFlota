import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  instructuions() {
    this.router.navigate(['/instructions']);
  }

  game() {
    this.router.navigate(['/game']);
  }

}
