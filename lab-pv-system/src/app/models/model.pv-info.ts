export class PVInfo{
    PV_ID: Number; //Unique ID for each PV page
    Lat: Number; //Latitude for google maps
    Lon: Number; //Longitude for google maps
    LAB_ID: Number; //LAB_ID which this PV has been assigned to inspect and validate
    LAB_order: String; //Who assigned the LAB_ID? CCR or PV?


    constructor(PV_ID: Number, Lat: Number, Lon: Number, LAB_ID: Number, LAB_order: String){
        this.PV_ID = PV_ID;
        this.Lat = Lat;
        this.Lon = Lon;
        this.LAB_ID = LAB_ID;
        this.LAB_order = LAB_order;
    }
}