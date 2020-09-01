import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import FoodSearch, { NutrientIds } from './FoodSearch';

const mealOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
]

export default function AddMealForm(props) {
    const [foods, setFoods] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState(0);

    const getCalories = (food) => {
        return food?.foodDetails?.FoodNutrients?.filter((foodNutrient) => foodNutrient?.Nutrient.Id == NutrientIds.ENERGY)[0]?.Amount;
    }

    const addFood = (food) => {
        setFoods(foods => [...foods, food]);
        setMealCalories(mealCalories + getCalories(food));
    };

    const removeFood = (fdcId) => {
        const removedFood = foods.filter(food => food.FdcId == fdcId);
        setFoods(foods.filter(food => food.FdcId != fdcId));
        setMealCalories(mealCalories - getCalories(removedFood));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formattedFoods = foods.map((food) => {
            const formattedFood = {
                name: food.food.Description,
                group: "food group",
                serving: "100 g",
                nutrition: {
                    calories: getCalories(food),
                },
            };
            return formattedFood;
        });
        const meal = {
            name: mealName.value,
            foods: formattedFoods,
            nutrition: {
                calories: mealCalories,
            },
        };

        props.submit(meal);
    };

    return (
        <div style={{ 'margin': '50px' }}>
            <div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', padding: '20px' }}>
                    <div>Meal:</div>
                    <div>Calories: {mealCalories}</div>
                    <Select
                        options={mealOptions}
                        value={mealName}
                        onChange={setMealName}
                    />

                    <div>Foods:</div>
                    <FoodSearch
                        addFood={addFood}
                        removeFood={removeFood}
                    />

                    <div style={{ paddingTop: '20px' }}>
                        <Button variant="secondary" type="button" onClick={props.cancel} style={{ marginRight: '5px' }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
