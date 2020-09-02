import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import FoodSearch, { NutrientIds } from './FoodSearch';
import Food from './Food';

const mealOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
]

export default function AddMealForm(props) {
    const [foods, setFoods] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState(0);
    const [fdcIds, setFdcIds] = useState([]);

    const updateMealCalories = () => {
        var totalCalories = 0;
        foods.forEach((food) => {
            totalCalories += food.nutrition.calories;
        });
        setMealCalories(totalCalories);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formattedFoods = foods.map((food) => {
            const formattedFood = {
                name: food.details.Description,
                group: "food group",
                serving: food.serving,
                nutrition: {
                    calories: food.nutrition.calories,
                },
            };
            return formattedFood;
        });
        const meal = {
            name: mealName,
            foods: formattedFoods,
            nutrition: {
                calories: mealCalories,
            },
        };

        props.submit(meal);
    };

    const updateServingSize = (food, newServingSize) => {
        const newFoods = foods.map((oldFood) => {
            if (oldFood.fdcId === food.fdcId) {
                food.serving = parseInt(newServingSize);
                food.nutrition.calories = getCalories(food.details, newServingSize);
                return food;
            }
            return oldFood;
        });
        setFoods(newFoods);
        updateMealCalories();
    };

    const getCalories = (foodDetails, serving = 100) => {
        const standardServingCalories = foodDetails?.FoodNutrients?.filter((foodNutrient) => foodNutrient?.Nutrient.Id === NutrientIds.ENERGY)[0]?.Amount;
        return Math.round(standardServingCalories / 100 * serving);
    };

    const addFood = (food, foodDetails) => {
        const newFood = {
            brand: food.BrandOwner,
            ingredients: food.Ingredients,
            fdcId: food.FdcId,
            serving: 100,
            nutrition: {
                calories: getCalories(foodDetails),
            },
            details: foodDetails,
        };
        setFoods(foods => [...foods, newFood]);
        setFdcIds(fdcIds => [...fdcIds, food.FdcId]);

        setMealCalories(mealCalories + newFood.nutrition.calories);
    };

    const removeFood = (garbageFdcId) => {
        setFoods(foods.filter(food => food.fdcId !== garbageFdcId));
        setFdcIds(fdcIds.filter(fdcId => fdcId !== garbageFdcId));

        const removedFood = foods.filter(food => food.fdcId === garbageFdcId)[0];
        setMealCalories(mealCalories - removedFood.nutrition.calories);
    };

    return (
        <div style={{ 'margin': '50px' }}>
            <div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', padding: '20px' }}>
                    <div>Meal:</div>
                    <div>Calories: {mealCalories}</div>

                    <Dropdown onSelect={setMealName} value={mealName}>
                        <Dropdown.Toggle style={{ backgroundColor: 'white', color: 'black' }}>
                            {mealName ? mealName : "Meal"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {mealOptions.map((option) => (
                                <Dropdown.Item key={option.value} eventKey={option.value}>{option.label}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <div>Foods:</div>
                    {foods.map((food) => {
                        return (
                            <Food
                                key={food.fdcId}
                                food={food}
                                updateServingSize={updateServingSize}
                                removeFood={removeFood}
                            />
                        );
                    })}

                    <FoodSearch
                        selectFood={addFood}
                        showSelect
                        fdcIds={fdcIds}
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
