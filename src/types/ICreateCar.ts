//Будемо проводити на основі даної моделі
//Створення авто
export interface ICreateCar {
    model: string;
    mark: string;
    description: string;
    year: number;
    color: string;
    image: string;
    price: number;
}