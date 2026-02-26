import type {ICarItem} from "../../types/ICarItem.ts";
import ConfirmDeleteModal from "../../componetns/common/ConfirmDeleteModal";

//Вхідні параметри методу
interface ItemCarProps {
    car: ICarItem,
    //Буде передаватися вказівник на метод
    //Цей метод буде спрацьовувати на зовні callBack
    deleteCar: (id: number) => void // метод, який будемо викликати для виделення
}

const ItemCar = (props: ItemCarProps) => {
    const {car, deleteCar} = props;
    return (
        <>
            <div key={car.id} className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
                <div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{backgroundImage: `url('${car.image}')`}} title="Woman holding a mug">
                </div>
                <div
                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>
                            </svg>
                            Members only
                        </p>
                        {/**/}
                        <div className="text-gray-900 font-bold text-xl mb-2">{car.mark} {car.model} {car.year} ({car.color})
                        </div>
                        <p className="text-gray-700 text-base">{car.description}</p>
                    </div>
                    <div className="flex items-center">
                        <p className={'font-bold text-lg text-gray-900'}>{car.price}₴</p>
                    </div>
                    <div>
                        <ConfirmDeleteModal confirmDeleteHandler={() => deleteCar(car.id)} />
                        {/*<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"*/}
                        {/*    onClick={() => deleteCar(car.id)}>*/}
                        {/*    Delete*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCar;