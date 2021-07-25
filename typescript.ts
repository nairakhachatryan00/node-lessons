abstract class Car {
    name: string;
    public getDesc(): string {
        return `${this.name}`;
    }
    public abstract getInfo(): string;
    public abstract cost():number;
}

//`BMW with color green decorated and price 10200$ and your car has hybrid engine`.


class Toyota extends Car {
    name = 'Toyota';
    getInfo(): string {
        return this.getDesc() + ` and price ${this.cost()}$`;
    };
    cost(): number {
        return 1000;
    }
}

abstract class CarOptions extends Car{
    decoratedCar: Car;
    abstract getInfo(): string;
    abstract cost(): number;
}

class Black extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    getDesc(): string {
        return this.decoratedCar.getDesc() + ` with black color decorated`;
    }

    getInfo(): string {
        return this.getDesc() + ` and price ${this.cost()}$`;
    }

    cost(): number {
        return this.decoratedCar.cost() + 100;
    }
}

class FourDoors extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    getDesc(): string {
        return this.decoratedCar.getDesc() + ' and has 4 doors';
    }

    getInfo(): string {
        return this.getDesc() + ` and price ${this.cost()}$`;
    }

    cost(): number {
        return this.decoratedCar.cost() + 200;
    }
}


class Hybrid extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    getDesc(): string {
        return this.decoratedCar.getDesc() + ' and your car has hybrid engine';
    }

    getInfo(): string {
        return this.getDesc() + ` and price ${this.cost()}$`;
    }

    cost(): number {
        return this.decoratedCar.cost() + 300;
    }
}

class OilBased extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    getInfo(): string {
        return this.decoratedCar.getInfo() + 'oil based engine.';
    }
    cost(): number {
        return this.decoratedCar.cost() + 100;
    }
}
let myCar = new Toyota(); //output "Toyota and price 1000$"
// myCar = new Black(myCar);  //output "Toyota with black color decorated and price 1100$"
// myCar = new FourDoors(new Black(myCar)); //output "Toyota with black color decorated and has 4 doors and price 1300$"
// myCar = new Hybrid(new Black(myCar)); //output "Toyota with black color decorated and your car has hybrid engine and price 1400$"
myCar = new Hybrid(new FourDoors(new Black(myCar))); //output "Toyota with black color decorated and has 4 doors and your car has hybrid engine and price 1600$"
console.log(myCar.getInfo());
