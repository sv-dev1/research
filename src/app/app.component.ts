import { Component } from '@angular/core';
import {  DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Research';
  public type:any;

  constructor(
    private dataService: DataService
  ) { 

  }
 async ngOnInit() {
    this.type = await this.dataService.getType();
   // console.log(this.type);
    if(this.type.length == 0){
      var a1:any = {
        typeId : "78sdkhs37d8h4fhms4354d434ffaf6",
        typeNumber : 1,    
        typeName : 'Student'
      };
      await this.dataService.addType(a1);
      var a2 = {
        typeId : "bhbdvinn3w48mzKvdvs769dvsd9h9u4",
        typeNumber : 2,    
        typeName : 'Corporate or Govt'

      };
      await this.dataService.addType(a2);
      var a3 = {
        typeId : "Fwek67uds4532n9wwfwvni893wewe35d",
        typeNumber : 3,    
        typeName : 'Medical'
        
      }
      await this.dataService.addType(a3);

      var a4 = {
        typeId : "Shef4323249j93g4gml34gjksgsm5ls5",
        typeNumber : 4,    
        typeName : 'Not A Researcher'
        
      }
      await this.dataService.addType(a4);

    }
  }
}
