import { Injectable } from '@angular/core';
import { LabMachineInfo } from '../models/lab-machine-info';
import { PVInfo } from '../models/model.pv-info';

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

  constructor() { }
}
