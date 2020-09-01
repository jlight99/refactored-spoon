import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MyNavbar from './MyNavbar';
import AddMealForm from './AddMealForm';

const user = "5f4552d03b8cd948cd803e7c";

export default function Days() {
    const [days, setDays] = useState([]);
    const [day, setDay] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddMealForm, setShowAddMealForm] = useState(false);

    useEffect(() => {
        fetchDays(user);
    }, []);

    const fetchDays = async (user) => {
        const responseJson = await getDays(user);
        const filteredDay = getDayByDate(selectedDate, responseJson);

        setDay(filteredDay);
        setDays(responseJson);
    };

    const getDays = async (user) => {
        const response = await fetch('http://localhost:8083/days?user=' + user, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    };

    const getDayByDate = (date, days) => {
        const filteredDays = days.filter(day => {
            const filterDate = new Date(day.Date);
            return filterDate.getFullYear() == date.getFullYear() &&
                filterDate.getMonth() == date.getMonth() &&
                filterDate.getUTCDate() == date.getUTCDate();
        });
        return filteredDays[0];
    };

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
        const filteredDay = getDayByDate(date, days);
        setDay(filteredDay);
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

        const newMeals = day?.Meals;
        if (day) {
            newMeals.push(meal);
        }

        const response = await fetch('http://localhost:8083/day', {
            method: day ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                date: dateStr,
                meals: day ? newMeals : [meal],
                nutrition: {
                    calories: day ? day.Nutrition.Calories + meal.Nutrition.Calories : meal.Nutrition.Calories,
                },
            })
        });

        const responseText = await response.text();
        console.log(responseText);

        fetchDays(user);
        setShowAddMealForm(false);
    };

    const cancelAddMealForm = () => {
        setShowAddMealForm(false);
    };

    return (
        <div>
            <MyNavbar />
            <div>
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
            {!showAddMealForm && <Button onClick={onAddFoodButtonClick}>Add food</Button>}
            {showAddMealForm && <AddMealForm
                submit={submitAddMealForm}
                cancel={cancelAddMealForm}
            />}
        </div>
    );
}
