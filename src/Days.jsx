import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";
import MyNavbar from './MyNavbar';
import AddMealForm from './AddMealForm';

const user = "5f4552d03b8cd948cd803e7c";

export default function Days() {
    const [day, setDay] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddMealForm, setShowAddMealForm] = useState(false);

    useEffect(() => {
        fetchDay(user, selectedDate);
        // disabled lint on next line because otherwise lint would complain about fetchDays being a missing dependency
        // when in reality, fetchDays is a method defined separately underneath, since it is used in other places
        // eslint-disable-next-line
    }, []);

    const fetchDay = async (user, date) => {
        const fetchedDay = await getDay(user, date);
        setDay(fetchedDay);
    };

    const getDay = async (user, date) => {
        const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate();
        const response = await fetch('http://localhost:8083/days/' + dateStr + '?user=' + user, { // TODO do NOT pass user as a path param, there should be some sort of session management
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const responseJSON = await response.json();
        return responseJSON;
    };

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
        fetchDay(user, date);
        setShowAddMealForm(false);
    };

    const onAddFoodButtonClick = () => {
        setShowAddMealForm(true);
    };

    const submitAddMealForm = async (rawMeal) => {
        const meal = {
            Name: rawMeal.name,
            Nutrition: {
                Calories: rawMeal.nutrition.calories,
            },
            Foods: rawMeal.foods.map((rawFood) => {
                const food = {
                    Group: "food group",
                    Name: rawFood.name,
                    Nutrition: {
                        Calories: rawFood.nutrition.calories,
                    },
                    Serving: rawFood.serving,
                };
                return food;
            }),
        };

        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        const response = await fetch('http://localhost:8083/days/' + dateStr + '/meals?user=' + user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: meal.Name,
                foods: meal.Foods,
                nutrition: meal.Nutrition,
            })
        });

        fetchDay(user, selectedDate);
        setShowAddMealForm(false);
    };

    const cancelAddMealForm = () => {
        setShowAddMealForm(false);
    };

    const deleteMeal = async (mealId) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        const response = await fetch('http://localhost:8083/days/' + dateStr + '/meals/' + mealId + '?user=' + user, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        fetchDay(user, selectedDate);
    };

    return (
        <div>
            <MyNavbar />
            <div style={{ margin: '10px' }}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleSelectedDateChange}
                />
            </div>
            {day && <div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
                {day.Meals && day.Meals.map((meal, j) => (
                    <Card
                        key={j}
                        style={{ width: '24rem', margin: '0 auto' }}
                        className="mb-2"
                    >
                        <Card.Header>{meal.Name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {meal.Foods.map((food, k) => (
                                    <span key={k}>
                                        {food.Name}<br />
                                        {<span>
                                            group: {food.Group}<br />
                                            serving: {food.Serving}<br />
                                            calories: {food?.Nutrition?.Calories}<br />
                                        </span>}
                                        <br />
                                    </span>
                                ))}
                            </Card.Text>
                            <Button variant="danger" onClick={() => deleteMeal(meal.ID)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </Card.Body>
                        <div>
                            nutrition
                            <div>calories: {meal?.Nutrition?.Calories}</div>
                        </div>
                    </Card>
                ))}
                </div>
                <div>
                    nutrition
                    <div>calories: {day?.Nutrition?.Calories}</div>
                </div>
            </div>}
            {!day && <div>no data for this date</div>}
            {!showAddMealForm && <Button onClick={onAddFoodButtonClick}>Add meal</Button>}
            {showAddMealForm && <AddMealForm
                submit={submitAddMealForm}
                cancel={cancelAddMealForm}
            />}
        </div>
    );
}
