import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../DTO/Models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentPage: any;
  pages = [
    {
      route: '/login',
      title: 'Sign In',
      icon: 'login',
      isLogin: true,
      unlimitedAccess: true
    },
    {
      route: '/register-user',
      title: 'Sign Up',
      icon: 'login',
      isLogin: true,
      unlimitedAccess: true
    }
    ,
    {
      route: '/documents-list',
      title: 'Documents List',
      icon:'featured_play_list',
      viewMenuTab: true
    },
   
    {
      route: '/document',
      title: ' Edit Document',
      icon: 'edit',
      viewMenuTab: false
    },
    {
      route: '/share-document',
      title: 'Share Document',
      icon: 'share',
      viewMenuTab: false
    },
    {
      route: '/unsubscribe-user',
      title: 'Unsubscribe',
      icon: 'unsubscribe',
      viewMenuTab: true
    },
    {
      route: '',
      title: 'Logout',
      icon: 'logout',
      isLogout: true,
      unlimitedAccess: true,
    }
 
  ];
  currentUser: User;
  userLoggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private loginService: LoginService,

  ) {}

  ngOnInit(): void {
    this.loginService.onLogin()
    .subscribe(user=>{
     this.currentUser=user.user
     this.userLoggedIn=user.isLoggedIn
   })
    this.subsribeToUrlNavigation();

 
  }

  subsribeToUrlNavigation() {
    this.router.events.subscribe((data: any) => {
      if (!data.url || data.url === '' || data.url === '/') return;

      const currentPage = this.pages.find((page) =>
        data.url.includes(page.route)
      );

      let isAccessableUrl = false;
      
      if (currentPage.unlimitedAccess) {
        isAccessableUrl = true;
      } 
      else if (this.userLoggedIn) {
        isAccessableUrl =true;
      }

      if (isAccessableUrl) {
        this.currentPage = currentPage;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }



  logout() {  
      this.loginService.setCurrentUser(this.currentUser,false);

  }
}
