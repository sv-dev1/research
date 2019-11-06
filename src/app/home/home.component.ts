import {
	Component,
	OnInit
} from '@angular/core';
import {
	DataService
} from '../_services/data.service';
import {
	Router,
	ActivatedRoute
} from '@angular/router';
import {
	environment
} from '../../environments/environment';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	img_url;
	userId;
	profile_pic_default: boolean = false;;
	blogs: any = [];
	users: any = [];
	photos: any = [];
	researchers: any = [];
	searchResult: boolean = false;
	searchdata: any = [];
	searchItem: string = '';
	loading:boolean=false; 

	constructor(
		private dataService: DataService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.img_url = environment.img_url;
		this.route.queryParams.subscribe(params => {
			this.searchItem = params['search'];
			this.getData(this.searchItem);
		});
	}
	ngOnInit() {
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userId = user.user_ledgerid;
		this.getAllblogs();
		this.getSearchData();
		setTimeout(() => {
			this.getUsers();;
		}, 1000)
	}
	getSearchData() {
		this.dataService.inputData1$.subscribe(res => {
			//console.log(res);
			if (res['code'] == 200) {
				this.searchResult = true;
				this.searchdata = res['body'];
				//console.log(this.searchdata);
			}
		})
	}
	async getData(item) {
		let res = await this.dataService.searchblogs(item);
		if (res['code'] == 200) {
			this.searchResult = true;
			this.searchdata = res['body'];
			// console.log(this.searchdata);
		}
	}
	async getAllblogs() {
		this.loading=true;
		this.blogs = await this.dataService.getAllTypeBlogs();
		this.loading=false;
		console.log(this.blogs);
	}
	async getUsers() {
		let res = await this.dataService.getAllUser();
		let other_users;
		if (res) {
			this.users = res;
			let res1 = await this.dataService.getUserphotos();
			if (res1 != '') {
				this.photos = res1;
				 var result = this.users.filter(o1 =>{
					return !this.photos.some(o2 =>{
							if(o1.userId === o2.userID)
						return o1.userId === o2.userID;
					});
				});
				
				for(let i = 0; i < result.length; i++){
					       let   obj=  {
									"$class": "org.research.com.UserPhoto",
									"photoId": "",
									"userID": result[i].userId,
									"profile_pic": ""
								}
				  this.photos.push(obj);
				}
               
				this.users.forEach(u => {
					this.photos.forEach(p => {
						
						if (p.userID == u.userId) {
							other_users = {
								"id": u.userId,
								"firstName": u.firstName,
								"lastName": u.lastName,
								"profile_pic": p.profile_pic
							}
							this.researchers.push(other_users);
						} 
						
					})
				});
			} else {
				this.users = res;
				this.users.forEach(u => {
					other_users = {
						"id": u.userId,
						"firstName": u.firstName,
						"lastName": u.lastName,
						"profile_pic": ""
					}
					this.researchers.push(other_users);
				})
				this.profile_pic_default = true;
			}
		} else {
			this.users = [];
		}
	
	}

	
	openResearcherProfile(pvrId) {
		this.router.navigate(['researcher', pvrId]);
	}

	addConference(){
		this.router.navigate(['conference' , 'add']);
	  }
}