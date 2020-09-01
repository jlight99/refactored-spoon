import React, { useState } from 'react';
import MyNavbar from './MyNavbar';
import FoodSearch from './FoodSearch';

export default function FoodSearchPage() {
    const [selectedFood, setSelectedFood] = useState('');

    const onFoodSelected = (food) => {
        setSelectedFood(food.FdcId);
    };

    return (
        <div>
            <MyNavbar />
            {selectedFood && <span>selected food fdc ID: {selectedFood}</span>}
            <FoodSearch selectFood={onFoodSelected} />
        </div>
    );
}
