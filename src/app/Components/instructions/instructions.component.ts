import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(){

  }

  back() {
    this.router.navigate([""])
  }
}
