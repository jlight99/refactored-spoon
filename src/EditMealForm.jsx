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
        const nutrition = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            sugar: 0,
            fiber: 0,
            sodium: 0,
            calcium: 0,
            iron: 0,
            cholesterol: 0,
            potassium: 0,
            vitaminA: 0,
            vitaminC: 0,
        };
        foods.forEach((food) => {
            nutrition.calories += food.nutrition.calories;
            nutrition.protein += food.nutrition.protein;
            nutrition.carbs += food.nutrition.carbs;
            nutrition.fat += food.nutrition.fat;
            nutrition.sugar += food.nutrition.sugar;
            nutrition.fiber += food.nutrition.fiber;
            nutrition.sodium += food.nutrition.sodium;
            nutrition.calcium += food.nutrition.calcium;
            nutrition.iron += food.nutrition.iron;
            nutrition.cholesterol += food.nutrition.cholesterol;
            nutrition.potassium += food.nutrition.potassium;
            nutrition.vitaminA += food.nutrition.vitaminA;
            nutrition.vitaminC += food.nutrition.vitaminC;
        });

        setMealNutrition(nutrition);
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
            nutrition: mealNutrition,
        };
        props.submit(meal);
    };

    const updateServingSize = (food, newServingSize) => {
        const newFoods = foods.map((oldFood) => {
            const isMatch = food._id ? oldFood._id === food._id : oldFood.fdcId === food.fdcId;
            if (isMatch) {
                food.serving = parseInt(newServingSize);
                food.nutrition = {
                    calories: getRoundedWholeNutrient(oldFood.usdaNutrition.calories, newServingSize),
                    protein: getRounded2DecNutrient(oldFood.usdaNutrition.protein, newServingSize),
                    carbs: getRounded2DecNutrient(oldFood.usdaNutrition.carbs, newServingSize),
                    fat: getRounded2DecNutrient(oldFood.usdaNutrition.fat, newServingSize),
                    sugar: getRounded2DecNutrient(oldFood.usdaNutrition.sugar, newServingSize),
                    fiber: getRounded2DecNutrient(oldFood.usdaNutrition.fiber, newServingSize),
                    sodium: getRoundedWholeNutrient(oldFood.usdaNutrition.sodium, newServingSize),
                    calcium: getRoundedWholeNutrient(oldFood.usdaNutrition.calcium, newServingSize),
                    iron: getRounded2DecNutrient(oldFood.usdaNutrition.iron, newServingSize),
                    cholesterol: getRoundedWholeNutrient(oldFood.usdaNutrition.cholesterol, newServingSize),
                    potassium: getRoundedWholeNutrient(oldFood.usdaNutrition.potassium, newServingSize),
                    vitaminA: getRounded2DecNutrient(oldFood.usdaNutrition.vitaminA, newServingSize),
                    vitaminC: getRounded2DecNutrient(oldFood.usdaNutrition.vitaminC, newServingSize),
                };
                return food;
            }
            return oldFood;
        });
        setFoods(newFoods);
        updateMealNutrition();
    };

    const getRounded2DecNutrient = (nutrient, servingSize) => {
        return Math.round(nutrient * servingSize) / 100;
    };

    const getRoundedWholeNutrient = (nutrient, servingSize) => {
        return Math.round(nutrient / 100 * servingSize);
    };

    const addFood = (food, foodDetails) => {
        const calories = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.ENERGY)[0]?.amount;
        const protein = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.PROTEIN)[0]?.amount;
        const carbs = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.CARBOHYDRATE)[0]?.amount;
        const fat = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.FAT)[0]?.amount;
        const sugar = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.SUGAR)[0]?.amount;
        const fiber = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.FIBER)[0]?.amount;
        const sodium = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.SODIUM)[0]?.amount;
        const calcium = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.CALCIUM)[0]?.amount;
        const iron = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.IRON)[0]?.amount;
        const cholesterol = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.CHOLESTEROL)[0]?.amount;
        const potassium = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.POTASSIUM)[0]?.amount;
        const vitaminA = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.VITAMIN_A)[0]?.amount;
        const vitaminC = foodDetails?.foodNutrients?.filter((foodNutrient) => foodNutrient?.nutrient.id === NutrientIds.VITAMIN_C)[0]?.amount;


        const newFood = {
            brand: food.brandOwner,
            ingredients: food.ingredients,
            fdcId: food.fdcId,
            serving: 100,
            nutrition: {
                calories: calories ? calories : 0,
                protein: protein ? protein : 0,
                carbs: carbs ? carbs : 0,
                fat: fat ? fat : 0,
                sugar: sugar ? sugar : 0,
                fiber: fiber ? fiber : 0,
                sodium: sodium ? sodium : 0,
                calcium: calcium ? calcium : 0,
                iron: iron ? iron : 0,
                cholesterol: cholesterol ? cholesterol : 0,
                potassium: potassium ? potassium : 0,
                vitaminA: vitaminA ? vitaminA : 0,
                vitaminC: vitaminC ? vitaminC : 0,
            },
            usdaNutrition: {
                calories: calories ? calories : 0,
                protein: protein ? protein : 0,
                carbs: carbs ? carbs : 0,
                fat: fat ? fat : 0,
                sugar: sugar ? sugar : 0,
                fiber: fiber ? fiber : 0,
                sodium: sodium ? sodium : 0,
                calcium: calcium ? calcium : 0,
                iron: iron ? iron : 0,
                cholesterol: cholesterol ? cholesterol : 0,
                potassium: potassium ? potassium : 0,
                vitaminA: vitaminA ? vitaminA : 0,
                vitaminC: vitaminC ? vitaminC : 0,
            },
            details: foodDetails,
        };
        setFoods(foods => [...foods, newFood]);
        setFdcIds(fdcIds => [...fdcIds, food.fdcId]);

        const newMealNutrition = calculateNewMealNutrition(newFood, 1);
        setMealNutrition(newMealNutrition);
    };

    const removeFoodFromAddForm = (garbageFdcId) => {
        const removedFood = foods.filter(food => food.fdcId === garbageFdcId)[0];

        setFoods(foods.filter(food => food.fdcId !== garbageFdcId));
        setFdcIds(fdcIds.filter(fdcId => fdcId !== garbageFdcId));

        const newMealNutrition = calculateNewMealNutrition(removedFood, -1);
        setMealNutrition(newMealNutrition);
    };

    const removeFoodFromEditForm = (garbageId) => {
        const removedFood = foods.filter(food => food._id === garbageId)[0];
        setFoods(foods.filter(food => food._id !== garbageId));

        const newMealNutrition = calculateNewMealNutrition(removedFood, -1);
        setMealNutrition(newMealNutrition);
    };

    const calculateNewMealNutrition = (updatedFood, sign) => {
        return {
            calories: calculateNewNutrient(mealNutrition.calories, updatedFood.nutrition.calories, sign),
            protein: calculateNewNutrient(mealNutrition.protein, updatedFood.nutrition.protein, sign),
            carbs: calculateNewNutrient(mealNutrition.carbs, updatedFood.nutrition.carbs, sign),
            fat: calculateNewNutrient(mealNutrition.fat, updatedFood.nutrition.fat, sign),
            sugar: calculateNewNutrient(mealNutrition.sugar, updatedFood.nutrition.sugar, sign),
            fiber: calculateNewNutrient(mealNutrition.fiber, updatedFood.nutrition.fiber, sign),
            sodium: calculateNewNutrient(mealNutrition.sodium, updatedFood.nutrition.sodium, sign),
            calcium: calculateNewNutrient(mealNutrition.calcium, updatedFood.nutrition.calcium, sign),
            iron: calculateNewNutrient(mealNutrition.iron, updatedFood.nutrition.iron, sign),
            cholesterol: calculateNewNutrient(mealNutrition.cholesterol, updatedFood.nutrition.cholesterol, sign),
            potassium: calculateNewNutrient(mealNutrition.potassium, updatedFood.nutrition.potassium, sign),
            vitaminA: calculateNewNutrient(mealNutrition.vitaminA, updatedFood.nutrition.vitaminA, sign),
            vitaminC: calculateNewNutrient(mealNutrition.vitaminC, updatedFood.nutrition.vitaminC, sign),
        };
    };

    const calculateNewNutrient = (mealNutrient, foodNutrient, sign) => {
        return (mealNutrient ? mealNutrient : 0) + sign * (foodNutrient ? foodNutrient : 0);
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

                    {checkNutritionExists(mealNutrition) &&
                        <div>
                            Nutrition summary
                            <NutritionTable nutrition={mealNutrition} />
                        </div>
                    }

                    <div style={{ marginTop: '20px' }}>Foods</div>
                    <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {foods.map((food) => (
                            <EditableFood
                                key={food._id ? food._id : food.fdcId}
                                food={food}
                                updateServingSize={updateServingSize}
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
