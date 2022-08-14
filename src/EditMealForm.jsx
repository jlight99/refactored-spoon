import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import FoodSearch from './FoodSearch';
import { NutrientIds } from './FoodSearchResult';
import EditableFood from './EditableFood';
import NutritionTable, { checkNutritionExists } from './NutritionTable';

const mealOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
]

export default function EditMealForm(props) {
    const [foods, setFoods] = useState(props.meal?.foods ? props.meal.foods : []);
    const [mealName, setMealName] = useState(props.meal?.name ? props.meal.name : '');
    const [mealNutrition, setMealNutrition] = useState(props.meal?.nutrition ? props.meal.nutrition : {});
    const [fdcIds, setFdcIds] = useState([]);

    const updateMealNutrition = () => {
        const nutrition = mealNutrition;
        Object.keys(nutrition).forEach(nutrient => {
            if (nutrition[nutrient]) {
                nutrition[nutrient].value = 0;
            }
        });

        foods.forEach((food) => {
            Object.keys(nutrition).forEach(nutrient => {
                if (nutrition[nutrient] && food.nutrition[nutrient]) {
                    nutrition[nutrient].value += food.nutrition[nutrient].value;
                }
            });
        });

        setMealNutrition(nutrition);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formattedFoods = foods.map((food) => {
            food.name = food.name ? food.name : food.description;
            return food;
        });
        const meal = {
            _id: props.meal?._id,
            name: mealName,
            foods: formattedFoods,
            nutrition: mealNutrition,
        };
        props.submit(meal);
    };

    const updateServingSize = (food, newServingSize) => {
        const newFoods = foods.map((oldFood) => {
            const isMatch = food._id ? oldFood._id === food._id : oldFood.fdcId === food.fdcId;
            if (isMatch) {
                food.serving = newServingSize ? parseInt(newServingSize) : 0;
                Object.keys(food.nutrition).forEach(nutrient => {
                    if (oldFood.usdaNutrition[nutrient]?.value) {
                        food.nutrition[nutrient].value = getRoundedNutrient(oldFood.usdaNutrition[nutrient].value, food.serving);
                    }
                });
                return food;
            }
            return oldFood;
        });
        setFoods(newFoods);
        updateMealNutrition();
    };

    const getRoundedNutrient = (nutrientValue, servingSize) => {
        return Math.round(nutrientValue * servingSize) / 100;
    };

    const getNutrient = (usdaNutrient) => {
        return {
            nutrientId: usdaNutrient.nutrientId,
            nutrientName: usdaNutrient.nutrientName,
            unitName: usdaNutrient.unitName,
            value: usdaNutrient.value,
        };
    };

    const addFood = (food) => {
        const calories = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.ENERGY)[0];
        const protein = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.PROTEIN)[0];
        const carbs = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.CARBOHYDRATE)[0];
        const fat = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.FAT)[0];
        const sugar = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.SUGAR)[0];
        const fiber = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.FIBER)[0];
        const sodium = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.SODIUM)[0];
        const calcium = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.CALCIUM)[0];
        const iron = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.IRON)[0];
        const cholesterol = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.CHOLESTEROL)[0];
        const potassium = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.POTASSIUM)[0];
        const vitaminA = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.VITAMIN_A)[0];
        const vitaminC = food.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrientId === NutrientIds.VITAMIN_C)[0];

        const newFood = {
            description: food.description,
            brand: food.brandOwner,
            ingredients: food.ingredients,
            fdcId: food.fdcId,
            serving: 100,
            nutrition: {
                calories: calories ? getNutrient(calories) : null,
                protein: protein ? getNutrient(protein) : null,
                carbs: carbs ? getNutrient(carbs) : null,
                fat: fat ? getNutrient(fat) : null,
                sugar: sugar ? getNutrient(sugar) : null,
                fiber: fiber ? getNutrient(fiber) : null,
                sodium: sodium ? getNutrient(sodium) : null,
                calcium: calcium ? getNutrient(calcium) : null,
                iron: iron ? getNutrient(iron) : null,
                cholesterol: cholesterol ? getNutrient(cholesterol) : null,
                potassium: potassium ? getNutrient(potassium) : null,
                vitaminA: vitaminA ? getNutrient(vitaminA) : null,
                vitaminC: vitaminC ? getNutrient(vitaminC) : null,
            },
            usdaNutrition: {
                calories: calories ? getNutrient(calories) : null,
                protein: protein ? getNutrient(protein) : null,
                carbs: carbs ? getNutrient(carbs) : null,
                fat: fat ? getNutrient(fat) : null,
                sugar: sugar ? getNutrient(sugar) : null,
                fiber: fiber ? getNutrient(fiber) : null,
                sodium: sodium ? getNutrient(sodium) : null,
                calcium: calcium ? getNutrient(calcium) : null,
                iron: iron ? getNutrient(iron) : null,
                cholesterol: cholesterol ? getNutrient(cholesterol) : null,
                potassium: potassium ? getNutrient(potassium) : null,
                vitaminA: vitaminA ? getNutrient(vitaminA) : null,
                vitaminC: vitaminC ? getNutrient(vitaminC) : null,
            },
        };
        setFoods(foods => [...foods, newFood]);
        setFdcIds(fdcIds => [...fdcIds, food.fdcId]);

        const newMealNutrition = calculateNewMealNutrition(newFood, 1.0);
        setMealNutrition(newMealNutrition);
    };

    const removeFoodFromAddForm = (garbageFdcId) => {
        const removedFood = foods.filter(food => food.fdcId === garbageFdcId)[0];

        setFoods(foods.filter(food => food.fdcId !== garbageFdcId));
        setFdcIds(fdcIds.filter(fdcId => fdcId !== garbageFdcId));

        const newMealNutrition = calculateNewMealNutrition(removedFood, -1.0);
        setMealNutrition(newMealNutrition);
    };

    const removeFoodFromEditForm = (garbageId) => {
        const removedFood = foods.filter(food => food._id === garbageId)[0];
        setFoods(foods.filter(food => food._id !== garbageId));

        const newMealNutrition = calculateNewMealNutrition(removedFood, -1.0);
        setMealNutrition(newMealNutrition);
    };

    const calculateNewMealNutrition = (updatedFood, sign) => {
        var nutrition = mealNutrition;
        if (!checkNutritionExists(mealNutrition)) {
            const newMealNutrition = {};
            Object.keys(updatedFood.nutrition).forEach(nutrient => {
                if (updatedFood.nutrition[nutrient]) {
                    newMealNutrition[nutrient] = {
                        nutrientId: updatedFood.nutrition[nutrient].nutrientId,
                        nutrientName: updatedFood.nutrition[nutrient].nutrientName,
                        unitName: updatedFood.nutrition[nutrient].unitName,
                        value: updatedFood.nutrition[nutrient].value,
                    };
                }
            });
            return newMealNutrition;
        }
        Object.keys(nutrition).forEach(nutrient => {
            if (nutrition[nutrient] && updatedFood.nutrition[nutrient]) {
                nutrition[nutrient].value = calculateNewNutrient(nutrition[nutrient].value, updatedFood.nutrition[nutrient].value, sign);
            }
        });
        return nutrition;
    };

    const calculateNewNutrient = (mealNutrient, foodNutrient, sign) => {
        return (mealNutrient ? mealNutrient : 0) + sign * (foodNutrient ? foodNutrient : 0)
    };

    return (
        <div style={{ 'margin': '50px' }}>
            <div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', padding: '20px' }}>
                    <Dropdown onSelect={setMealName} value={mealName}>
                        <Dropdown.Toggle style={{ backgroundColor: 'white', color: 'black' }}>
                            {mealName ? mealName : "Meal"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {mealOptions.map((option) => (
                                <Dropdown.Item key={option.label} eventKey={option.label}>{option.label}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {foods?.length > 0 && checkNutritionExists(mealNutrition) &&
                        <div>
                            <div className="nutritionSummary">
                                Nutrition summary
                            </div>
                            <NutritionTable nutrition={mealNutrition} />
                        </div>
                    }

                    <div style={{ marginTop: '20px' }}>Foods</div>
                    <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {foods.map((food) => (
                            <EditableFood
                                key={food._id ? food._id : food.fdcId}
                                food={food}
                                updateServingSize={(servingSize) => updateServingSize(food, servingSize)}
                                removeFood={props.meal ? removeFoodFromEditForm : removeFoodFromAddForm}
                            />
                        ))}
                    </span>

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
                            {!props.meal && 'Add Meal'}
                            {props.meal && 'Update Meal'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
