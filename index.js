// class Payment{
//     calculateCost(hours){}
// }

// class CarPayment extends Payment(){
//     calculateCost(hours){
//         return hours*2;
//     }
// }

// class BikePayment extends Payment(){
//     calculateCost(hours){
//         return hours*2;
//     }
// }

// class HandicappedPayment extends Payment(){
//     calculateCost(hours){
//         return 0;
//     }
// }

class Vehicle {
    constructor(){
        this.payment = null;
        this.parkedTime = null;
    }
    getType(){};

    // calculateCost(hours){
    //   return this.payment.calculateCost(hours);
    // }
    setParkedTime(){
        this.parkedTime = new Date();
    }
    getParkedTime(){
        return this.parkedTime;
    }
}

class Car extends Vehicle{
    constructor(){
        super();
        // this.payment = new CarPayment();
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
}

const parkingLot = new ParkingLot(2,10,20);

// lets park one car
const carOne = new Car();
carOne.setParkedTime();
console.log(carOne.getParkedTime());
parkingLot.park(carOne,0,1,0);

// Lets park second car
const carTwo = new Car();
carTwo.setParkedTime();
console.log(carTwo.getParkedTime());
parkingLot.park(carTwo,0,1,0);




