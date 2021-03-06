import { IonList, IonListHeader } from '@ionic/react';
import React from 'react';
import { Order } from '../model';
import { NoOrderedDrinks } from './NoOrderedDrinks';
import { OrderedDrink } from './OrderedDrink';

interface OrderedDrinkListProps {
    orders: Order[];
}

export const OrderedDrinkList: React.FC<OrderedDrinkListProps> = ({ orders }) => {
    if (orders.length === 0) {
        return <NoOrderedDrinks />;
    }

    return (
        <IonList>
            <IonListHeader>Ordered Drinks</IonListHeader>
            {orders.map((order) => (
                <OrderedDrink key={order.id} order={order} />
            ))}
        </IonList>
    );
};
