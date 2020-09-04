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

export default function EditMealForm(props) {
    const [foods, setFoods] = useState(props.meal?.foods ? props.meal.foods : []);
    const [mealName, setMealName] = useState(props.meal?.name ? props.meal.name : '');
    const [mealCalories, setMealCalories] = useState(props.meal?.nutrition.calories ? props.meal.nutrition.calories : 0);
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
            food.name = food.name ? food.name : food.details.description;
            return food;
        });
        const meal = {
            _id: props.meal?._id,
            name: mealName,
            foods: formattedFoods,
            nutrition: {
                calories: mealCalories,
            },
        };
        props.submit(meal);
    };

    // need to store base cal / 100 in food somewhere
    const updateServingSize = (food, newServingSize) => {
        const newFoods = foods.map((oldFood) => {
            const updatedCals = Math.round(oldFood.nutrition.calories / oldFood.serving * newServingSize);
            const isMatch = food._id ? oldFood._id === food._id : oldFood.fdcId === food.fdcId;
            if (isMatch) {
                food.serving = parseInt(newServingSize);
                food.nutrition = {
                    calories: updatedCals,
                };
                return food;
            }
            return oldFood;
        });
        setFoods(newFoods);
        updateMealCalories();
    };

    const getCaloriesFromFoodDetails = (foodDetails, serving = 100) => {
        const standardServingCalories = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.ENERGY)[0]?.amount;
        return Math.round(standardServingCalories / 100 * serving);
    };

    const addFood = (food, foodDetails) => {
        const newFood = {
            brand: food.brandOwner,
            ingredients: food.ingredients,
            fdcId: food.fdcId,
            serving: 100,
            nutrition: {
                calories: getCaloriesFromFoodDetails(foodDetails),
            },
            details: foodDetails,
        };
        setFoods(foods => [...foods, newFood]);
        setFdcIds(fdcIds => [...fdcIds, food.fdcId]);

        setMealCalories((mealCalories + newFood.nutrition.calories));
    };

    const removeFood = (garbageFdcId) => {
        setFoods(foods.filter(food => food.fdcId !== garbageFdcId));
        setFdcIds(fdcIds.filter(fdcId => fdcId !== garbageFdcId));

        const removedFood = foods.filter(food => food.fdcId === garbageFdcId)[0];
        setMealCalories((mealCalories - removedFood.nutrition.calories));
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
                    <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {foods.map((food) => (
                            <Food
                                key={food.fdcId}
                                food={food}
                                updateServingSize={updateServingSize}
                                removeFood={removeFood}
                            />
                        ))}
                    </span>

                    <div style={{ paddingTop: '20px' }}>
                        <Button variant="secondary" type="button" onClick={props.cancel} style={{ marginRight: '5px' }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            {!props.meal && 'Add Meal'}
                            {props.meal && 'Update Meal'}
                        </Button>
                    </div>

                    <FoodSearch
                        selectFood={addFood}
                        showSelect
                        fdcIds={fdcIds}
                    />
                </div>
            </div>
        </div>
    );
}
