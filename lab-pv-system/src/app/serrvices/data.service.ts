import { Injectable } from '@angular/core';
import { LabMachineInfo } from '../models/lab-machine-info';
import { PVInfo } from '../models/model.pv-info';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // for info panel
  infoPresent: Boolean = false;

  selectedLabMachine: LabMachineInfo = null;
  selectedPv: PVInfo = null;

  labMachineInfo: Boolean = false;
  pvInfo: Boolean = false;


  // for assigning pv to lab
  pvAssignInProgress: Boolean = false;
  pvAssignId: Number;
  labAssignId: Number;
  //

  constructor(public webService: WebService) { }


  getLabInfo(){
    return this.webService.getLabInfo();
  }

  getMachineInfo(){
    return this.webService.getMachineInfo();
  }

  getPvInfo(){
    return this.webService.getPvInfo();
  }

  getEgcrInfo(){
    return this.webService.getEgcrInfo();
  }

  updatePvInfo(pv: any){
    return this.webService.updatePvInfo(pv);
  }
}
