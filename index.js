class Payment {
  calculateCost(hours) {}
}

// class CurrencyConverter {
//   constructor(exchangeRates) {
//     this.exchangeRates = {
//       USD: { toRupees: 75.0 },
//       EUR: { toRupees: 88.5 },
//       GBP: { toRupees: 102.0 },
//     };
//   }
// }

class CarPayment extends Payment {
  calculateCost(hours) {
    return hours * 2;
  }
}

class BikePayment extends Payment {
  calculateCost(hours) {
    return hours * 2;
  }
}

class HandicappedPayment extends Payment {
  calculateCost(hours) {
    return 0;
  }
}

class Vehicle {
  constructor() {
    this.payment = null;
    this.parkedTime = null;
  }
  getType() {}

  calculateCost(hours) {
    return this.payment.calculateCost(hours);
  }

  setParkedTime() {
    this.parkedTime = new Date();
  }
  getParkedTime() {
    console.log("ParkedTime", this.parkedTime);
    return this.parkedTime;
  }
}

class Car extends Vehicle {
  constructor() {
    super();
    this.payment = new CarPayment();
  }
  getType() {
    return "Car";
  }
}

class Bike extends Vehicle {
  constructor() {
    super();
    this.payment = new BikePayment();
  }
  getType() {
    return "Bike";
  }
}

class HandicappedVehicle extends Vehicle {
  constructor() {
    super();
    this.payment = new HandicappedPayment();
  }
  getType() {
    return "HandicappedVehicle";
  }
}

class ParkingLot {
  constructor(floors, rows, spotPerRows) {
    this.spots = new Map();
    this.floors = floors;
    this.rows = rows;
    this.spotPerRows = spotPerRows;
    // first initialize all spots as available
    for (let floor = 0; floor < this.floors; floor++) {
      for (let row = 0; row < this.rows; row++) {
        for (let spot = 0; spot < this.spotPerRows; spot++) {
          const key = `${floor}_${row}_${spot}`;
          this.spots.set(key, null);
        }
      }
    }
  }

  park(vehicle, floor, row, spot) {
    const isHandicapped = vehicle instanceof HandicappedVehicle;

    if (floor === 1 && !isHandicapped) {
      console.log("Only handicapped vehicles can park on the ground floor");
      return false;
    }
    const spotKey = `${floor}_${row}_${spot}`;
    if (this.spots.get(spotKey)===null) {
      if ((floor === 1 && isHandicapped) || (floor !== 1 && !isHandicapped)) {
        this.spots.set(spotKey,vehicle);
        console.log(
          `${vehicle.getType()} parked successfully at floor: ${floor}, row: ${row}, spot: ${spot}`
        );
        return true;
      } else {
        console.log("Spot already occupied");
      }
    } else {
      console.log("Spot already occupied");
    }
    return false;
  }

  leave(vehicle) {
    for (const [key, value] of this.spots) {
    if (value === vehicle) {
      const hoursParked = this.calculateHourOfParked(vehicle);
      const cost = vehicle.calculateCost(hoursParked);
      this.spots.set(key,null);
      // console.log(timeZone());
      console.log(
        `${vehicle.getType()} left successfully. Total cost: ${cost}`
      );
      return true;
    }
  }
    console.log("Vehicle not found");
    return false;
  }

  availableSpot(floor) {
    let count = 0;
    for (let row = 0; row < this.rows; row++) {
      for (let spot = 0; spot < this.spotPerRows; spot++) {
        const spotKey = `${floor}_${row}_${spot}`;
        if (this.spots.get(spotKey) === null) {
          count++;
        }
      }
    }
    console.log(`Spots available at floor no:${floor} are ${count}`);
    return count;
  }

  calculateHourOfParked(vehicle) {
        const currentTime = Date.now();
        const parkedTime = vehicle.getParkedTime();
        const duration = (currentTime - parkedTime) / (100 * 60 * 60);
        console.log("duration", duration);
        return duration;
  }
}

const parkingLot = new ParkingLot(3, 10, 20);

// lets park one car
const carOne = new Car();
carOne.setParkedTime();
console.log(carOne.getParkedTime());
parkingLot.park(carOne, 0, 1, 0);
parkingLot.availableSpot(0);
parkingLot.leave(carOne);
parkingLot.availableSpot(0);

// console.log(parkingLot.availableSpot(1));

// Lets park second car
const carTwo = new Car();
carTwo.setParkedTime();
// console.log(carTwo.getParkedTime());
parkingLot.park(carTwo, 0, 1, 0);

// Lets park one handicapped vehicle

// const handiCappedVehicle = new HandicappedVehicle();
// handiCappedVehicle.setParkedTime();
// parkingLot.park(handiCappedVehicle, 2, 1, 1);
// parkingLot.park(handiCappedVehicle, 2, 1, 1);

// parkingLot.park(handiCappedVehicle, 2, 2, 1);

// console.log(parkingLot.handicappedSpots(1));
