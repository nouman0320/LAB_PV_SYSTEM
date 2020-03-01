export class EGCR_Info{
    EGCR_ID: Number; //Unique ID for each EGCR page
    Lat: Number; //Latitude for google maps
    Lon: Number; //Longitude for google maps

    constructor(EGCR_ID: Number, Lat: Number, Lon: Number){
        this.EGCR_ID = EGCR_ID;
        this.Lat = Lat;
        this.Lon = Lon;
    }
}