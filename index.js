class Payment{
    calculateCost(hours){};
}

class CarPayment extends Payment{
    calculateCost(hours){
        return hours*2;
    }
}

class BikePayment extends Payment{
    calculateCost(hours){
        return hours*2;
    }
}

class HandicappedPayment extends Payment{
    calculateCost(hours){
        return 0;
    }
}

class Vehicle {
    constructor(){
        this.payment = null;
        this.parkedTime = null;
    }
    getType(){};

    calculateCost(hours){
      return this.payment.calculateCost(hours);
    }

    setParkedTime(){
        this.parkedTime = new Date();
    }
    getParkedTime(){
        console.log("ParkedTime",this.parkedTime);
        return this.parkedTime;
    }
}

class Car extends Vehicle{
    constructor(){
        super();
        this.payment = new CarPayment();
    }
    getType(){
        return "Car"
    }
}

class Bike extends Vehicle{
    constructor(){
        super();
        this.payment = new BikePayment();
    }
    getType(){
        return "Bike";
    }
}

class HandicappedVehicle extends Vehicle{
    constructor(){
        super();
        this.payment = new HandicappedPayment();
    }
    getType(){
        return "HandicappedVehicle";
    }
}

class ParkingLot{
  constructor(floors,rows,spotPerRows){
    // making  3d matrix as a default parking lot
    this.spots = new Array(floors).fill(null).map(()=> new Array(rows).fill(null).map(()=>new Array(spotPerRows).fill(null)));

    this.floors = floors;
    this.rows = rows;
    this.spotPerRows = spotPerRows;
  }

  park(vehicle,row,floor,spot){
    if(this.spots[floor][row][spot] === null){
        this.spots[floor][row][spot] = vehicle;
        console.log(`${vehicle.getType()} parked successfully at ${floor},${row},${spot}`);
        return true;
    }else{
        console.log("Spot already occupied");
        return false;
    }
  }

  leave(vehicle){
    for(let floor = 0;floor<this.floors;floor++){
        for(let row = 0;row<this.rows;row++){
            for(let spot = 0;spot<this.spotPerRows;spot++){
               if(this.spots[floor][row][spot] === vehicle){
                const hoursParked = this.calculateHourOfParked(vehicle)
                const cost = this.spots[floor][row][spot].calculateCost(hoursParked);
                this.spots[floor][row][spot] = null;
                console.log(`${vehicle.getType()} left successfully. Total cost: ${cost}`)
                return true;
            };
            }
        }
    }
    console.log("Vehicle not found");
    return false;
  }
  
  availableSpot(floor){
    let count = 0;
    for(let row = 0;row<this.rows;row++){
        for(let spot = 0;spot<this.spotPerRows;spot++){
            if(this.spots[floor][row][spot]){
                count++;
            }
        }
    }
    return count;
  }
  
  calculateHourOfParked(vehicle){
    for(let floor = 0;floor<this.floors;floor++){
        for(let row = 0;row<this.rows;row++){
            for(let spot = 0;spot<this.spotPerRows;spot++){
                if(this.spots[floor][row][spot] === vehicle){
                    const currentTime = Date.now();
                    const parkedTime = this.spots[floor][row][spot].getParkedTime();
                    const duration = (currentTime-parkedTime)/(100*60*60);
                    console.log("duration",duration);
                    return duration;
                }
            }
        }
    }

  }

}

const parkingLot = new ParkingLot(2,10,20);

// lets park one car
const carOne = new Car();
carOne.setParkedTime();
console.log(carOne.getParkedTime());
parkingLot.park(carOne,0,1,0);
parkingLot.leave(carOne);
console.log(parkingLot.availableSpot(1));

// Lets park second car
const carTwo = new Car();
carTwo.setParkedTime();
console.log(carTwo.getParkedTime());
parkingLot.park(carTwo,0,1,0);




