export class LabMachineInfo {
    LAB_ID: Number; //Unique ID for each lab
    Lat: Number; //Latitude for google maps
    Lon: Number; //Longitute for google maps
    City: String; //City where the lab is installed
    Area: String; //Area of the city where the lab is installed
    Phase: String; //Phase of the area
    St: String; //Street of the area
    S_ST: String; //Sub street
    Building: String; //Building number
    Floor: String; //Floor of the building
    PR1: Number; //Alert in PR1 machine
    PR2: Number; //Alert in PR2 machine
    DR1: Number; //Alert in DR1 machine
    DR2: Number; //Alert in DR2 machine 
    SS: Number; //Alert in SS machine


    constructor(LAB_ID: Number, Lat: Number, Lon: Number, City: String, Area: String, Phase: String, St: String, S_ST: String, Building: String, Floor: String, PR1: Number, PR2: Number, DR1: Number, DR2: Number, SS: Number){
        this.LAB_ID = LAB_ID;
        this.Lat = Lat;
        this.Lon = Lon;
        this.City = City;
        this.Area = Area;
        this.Phase = Phase;
        this.St = St;
        this.S_ST = S_ST;
        this.Building = Building;
        this.Floor = Floor;
        this.PR1 = PR1;
        this.PR2 = PR2;
        this.DR1 = DR1;
        this.DR2 = DR2;
        this.SS = SS;
    }
}
