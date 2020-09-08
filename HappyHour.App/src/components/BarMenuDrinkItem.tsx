import {
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonRippleEffect,
    IonRow,
} from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useMemo, useRef } from 'react';
import { useToast } from '../context/toast';
import { Discount, Drink } from '../model';
import { DiscountList } from './DiscountList';

interface BarMenuDrinkItemProps {
    drink: Drink;
    activeDiscounts: Discount[];
    addDrink: (drink: Drink) => void;
}

const findDiscountsForDrink = (drink: Drink, discounts: Discount[]) =>
    discounts.filter((discount) => discount.validDrinks.some((validDrink) => validDrink.name === drink.name));

export const BarMenuDrinkItem: React.FC<BarMenuDrinkItemProps> = ({ drink, activeDiscounts, addDrink: add }) => {
    const { showToast } = useToast();
    const discounts = useMemo(() => findDiscountsForDrink(drink, activeDiscounts), [drink, activeDiscounts]);
    const slidingItem = useRef<HTMLIonItemSlidingElement>(null);

    const closeSlidingItem = () => slidingItem.current?.close();

    const addDrink = () => {
        add(drink);
        closeSlidingItem();
        showToast({
            message: `Added '${drink.name}' to the session!`,
            duration: 350,
            position: 'bottom',
        });
    };

    return (
        <IonItemSliding ref={slidingItem}>
            <IonItemOptions slot="start" onIonSwipe={addDrink}>
                <IonItemOption color="success" onClick={addDrink}>
                    <IonIcon slot="icon-only" icon={addIcon}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
            <IonItem className="ion-activatable" onClick={addDrink}>
                <IonGrid className="px-2 py-3">
                    <IonRow className="ion-justify-content-start">
                        <IonCol className="px-0" size="8">
                            <IonLabel className="font-bold ion-text-uppercase ion-text-wrap" color="warning">
                                {drink.name}
                            </IonLabel>
                        </IonCol>
                        <IonCol className="flex justify-end items-center">
                            <IonLabel className="ion-text-wrap">€ {drink.price.toFixed(2)}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <DiscountList discounts={discounts} />
                    </IonRow>
                </IonGrid>
                <IonRippleEffect></IonRippleEffect>
            </IonItem>
        </IonItemSliding>
    );
};
