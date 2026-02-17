import { useEffect, useState } from "react";
import { Select, Slider } from "antd";
import type { ICarItem } from "../types/ICarItem.ts";

const MIN_YEAR = 1950;
const MAX_YEAR = 2026;

const HomePage = () => {
  //useState - спеціальний хук, який призначений для зберігання інформації
  // cars - це масив, який зберігає інформацію типи ICarItem
  // setCars - це функція, яка вміє змінювати масив cars
  // Якщо записуємо дані у setCars - тоді відбувається render компонента
  // render - це оновлення вмісту компонента
  const [cars, setCars] = useState<ICarItem[]>([]);
  // filters - це об'єкт, який зберігає інформацію про фільтри
  const [filters, setFilters] = useState({ min: MIN_YEAR, max: MAX_YEAR });

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    if (cars) {
      setCars(
        // filter - це функція масиву, яка використовується для фільтрації масиву
        cars.filter(
          (car: ICarItem) => car.year >= filters.min && car.year <= filters.max,
        ),
      );
    }
  }, [filters]);

  const sortByPrice = (sort: string) => {
    //sort - це функція масиву, яка використовується для сортування масиву
    if (sort === "desc") {
      const sorted = [...cars].sort((a, b) => b.price - a.price);
      setCars(sorted);
      return;
    } else if (sort === "asc") {
      const sorted = [...cars].sort((a, b) => a.price - b.price);
      setCars(sorted);
      return;
    } else {
      return;
    }
  };

  const handleDeleteCar = (id: number) => {
    // filter - це функція масиву, яка використовується для фільтрації масиву
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
    localStorage.setItem("cars", JSON.stringify(newCars));
  };

  return (
    <>
      <h1 className={"text-4xl font-bold text-center mb-4"}>
        Головна сторінка
      </h1>

      <div className="flex mb-4 justify-between">
        {/* Select - це компонент Ant Design, який використовується для створення компонента вибору */}
        <Select
          defaultValue="default"
          style={{ width: 200 }}
          onChange={(value) => sortByPrice(value)}
          options={[
            { value: "default", label: "За замовчуванням" },
            { value: "asc", label: "Від меншої до більшої" },
            { value: "desc", label: "Від більшої до меншої" },
          ]}
        />
        <div className="w-full max-w-sm">
          <div className="text-gray-600">Фільтр за роками</div>
          {/* Slider - це компонент Ant Design, який використовується для створення слаљдера */}
          {/* range - це властивість, яка використовується для створення діапазону */}
          <Slider
            range={true}
            min={MIN_YEAR}
            max={MAX_YEAR}
            defaultValue={[MIN_YEAR, MAX_YEAR]}
            onChange={(value) => setFilters({ min: value[0], max: value[1] })}
          />
        </div>
      </div>
      {/* cars.length ? - це перевірка, чи масив cars не пустиий, якщо масив не пустий - виводиться список автомобілів */}
      {/* cars.map - це функція масиву, яка використовується для мапування масиву (змінює вихідні значення елементів масиву) */}
      {/* key - це властивість, яка використовується для ідентифікації елементів масиву для оптимізації роботи віртуального DOM з масивами */}
      {cars.length ? (
        cars.map((car) => (
          <div
            key={car.id}
            className="max-w-sm w-full lg:max-w-full lg:flex mb-4"
          >
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url('${car.image}')` }}
              title="car"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {car.mark} {car.model} {car.year}
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-800 font-bold text-lg">
                  {car.price} ₴
                </div>
                <div
                  className={`h-8 w-16 rounded flex items-center justify-center`}
                  style={{ backgroundColor: car.color }}
                >
                  <p className="text-white text-sm">{`${car.color}`}</p>
                </div>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Видалити
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-900">No cars available</div>
      )}
    </>
  );
};

export default HomePage;
