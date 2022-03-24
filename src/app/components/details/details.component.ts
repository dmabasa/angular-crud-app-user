import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  currentUser: any;
  message = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id: string | null): void {
    this.usersService.getItem(id)
      .subscribe(
        (user: null) => {
          this.currentUser = user;
          console.log(user);
        },
        (error: any) => {
          console.log(error);
        });
  }

  setAvailableStatus(status: any): void {
    const data = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      available: status
    };

    this.usersService.update(this.currentUser.id, data)
      .subscribe(
        response => {
          this.currentUser.available = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.usersService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          alert('The user was updated!');
          this.message = 'The user was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.usersService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

}
