import type {ICarItem} from "../../types/ICarItem.ts";
import {useEffect, useState} from "react";
import {Select} from "antd";
import ItemCar from "./ItemCar.tsx";
import CarForm from "./CarForm.tsx";
import type { ICarForm } from "../../types/ICarForm.ts";

const emptyCar: ICarItem = {id: 0, mark: "", model: "", description: "", image: "", price: 0, year: 0, color: ""};

const HomePage = () =>
{
    //useState - спеціальний хук, який призначений для зберігання інформації
    // cars - це масив, який зберігає інформацію типи ICarItem
    // setCars - це функція, яка вміє змінювати масив cars
    // Якщо записуємо дані у setCars - тоді відбувається render компонента
    // render - це оновлення вмісту компонента
    const [cars, setCars] = useState<ICarItem[]>([
        {
            id: 1,
            mark: "Mercedes",
            model: "Citan",
            description: "Не бита, не крашена",
            image: "https://cdn1.riastatic.com/photosnew/auto/photo/mercedes-benz_citan__623549116fx.webp",
            price: 15550,
            color: "Сірий",
            year: 2022
        },
        {
            id: 2,
            mark: "Nissan",
            model: "X-Trail",
            description: "Не бита, не крашена",
            image: "https://cdn2.riastatic.com/photosnew/auto/photo/nissan_x-trail__576168297hd.webp",
            price: 3800,
            color: "Сірий",
            year: 2002
        },
        {
            id: 3,
            mark: "Hyundai",
            model: "S-Coupe",
            description: "Не бита, не крашена",
            image: "https://cdn3.riastatic.com/photosnew/auto/photo/hyundai_s-coupe__440301203fx.webp",
            price: 2500,
            color: "Червоний",
            year: 1997
        },
        {
            id: 4,
            mark: "Skoda",
            model: "Octavia",
            description: "Не бита, не крашена",
            image: "https://cdn2.riastatic.com/photosnew/auto/photo/skoda_octavia__630330942hd.webp",
            price: 3500 ,
            color: "Чорний",
            year: 2008
        },
    ]);
    // selectedCar - це об'єкт, який зберігає обране нами авто для його оновлення
    const [selectedCar, setSelectedCar] = useState<ICarItem>(emptyCar);

    // при зміні масиву cars - очищаємо selectedCar за допомогою useEffect
    useEffect(() => {
        setSelectedCar(emptyCar);
    }, [cars]);

    const sortByPrice = (value: string) => {
        // sort - функція списків, що сортує та змінює список за заданими значеннями
        // ... - деструктуризація
        if (value === "asc") {
            setCars([...cars].sort((a, b) => a.price - b.price));
        } else if (value === "desc") {
            setCars([...cars].sort((a, b) => b.price - a.price));
        } else {
            setCars([...cars].sort((a, b) => a.id - b.id));
        }
    }

    const createCarHandler = (car: ICarForm) => {
        // генеруємо id для нового авто за допомогою математичних обчислень
        const id = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
        // оновлюємо список авто, додаємо id в нове авто
        setCars(prev => [...prev, {...car, id}]);
    }

    const updateCarHandler = (id: number, car: ICarForm) => {
        // оновлюємо список авто
        setCars(prev => prev.map(item => item.id === id ? {...item, ...car} : item));
    }

    const deleteCarHandler = (id: number) => {
        // console.log("Delete item ", id);
        //будемо змінювати наш список таким чином,
        //щоб лишилися усі елементи крім id

        setCars(cars.filter(car => car.id !== id));
        // const result = confirm("Ви дійсно бажаєте видалити елемент?")
        // if(result === true) //Якщо користувач сказав Так - то ми видалаємо
        //     setCars(cars.filter(car => car.id !== id));
    }

    return (
        <>
            <h1 className={"text-4xl font-bold text-center mb-4"}>Головна сторінка</h1>
            <div className={"flex mb-4"}>
                {/*Select - компонент Ant Design, що створює випадаючий список*/}
                <Select defaultValue={"default"} style={{width: 200}}
                        onChange={(value: string) => sortByPrice(value)}
                        options={[
                            {
                                value: "default",
                                label: "За замовчуванням"
                            },
                            {
                                value: "asc", // збільшення
                                label: "Ціна: від меншої до більшої"
                            },
                            {
                                value: "desc", // зменшення
                                label: "Ціна: від більшої до меншої"
                            }
                        ]} />
            </div>

            {/*передаємо стан selectedCar та функції createCarHandler, updateCarHandler у дочірній компонент CreateCarItem*/}
            <CarForm selectedCar={selectedCar} onCreate={createCarHandler} onUpdate={updateCarHandler}/>
            {/*key - змінна для забезпечення ідентифікації списків у віртуальному DOM*/}
            {cars.map(car =>
                <ItemCar key={car.id} car = {car}
                    deleteCar={deleteCarHandler} setSelectedCar={setSelectedCar}/>
            )}

        </>
    );
}

export default HomePage;