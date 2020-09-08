import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MyNavbar from './MyNavbar';
import EditMealForm from './EditMealForm';
import Meal from './Meal';
import NutritionTable, { checkNutritionExists } from './NutritionTable';
import { getUserFromLocalStorage } from './SignIn';

const user = getUserFromLocalStorage();

export default function Days() {
    const [day, setDay] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddMealForm, setShowAddMealForm] = useState(false);
    const [editMeal, setEditMeal] = useState('');

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
        const response = await fetch('http://localhost:8081/days/' + dateStr + '?user=' + user, { // TODO do NOT pass user as a path param, there should be some sort of session management
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const responseJSON = await response.json();
        if (responseJSON._id === "000000000000000000000000") {
            return null;
        }
        return responseJSON;
    };

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
        fetchDay(user, date);
        setShowAddMealForm(false);
    };

    const onAddMealButtonClick = () => {
        setShowAddMealForm(true);
    };

    const submitAddMealForm = async (meal) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch('http://localhost:8081/days/' + dateStr + '/meals?user=' + user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
        });

        fetchDay(user, selectedDate);
        setShowAddMealForm(false);
    };

    const cancelAddMealForm = () => {
        setShowAddMealForm(false);
    };

    const submitEditMealForm = async (meal) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch('http://localhost:8081/days/' + dateStr + '/meals/' + meal._id + '?user=' + user, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
        });

        fetchDay(user, selectedDate);
        setEditMeal('');
    };

    const deleteMeal = async (mealId) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch('http://localhost:8081/days/' + dateStr + '/meals/' + mealId + '?user=' + user, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        fetchDay(user, selectedDate);
    };

    const updateMeal = (meal) => {
        if (editMeal) {
            setEditMeal('');
        } else {
            setEditMeal(meal);
        }
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}> */}
                {day.meals && day.meals.map((meal, j) => (
                    <Meal
                        key={j}
                        meal={meal}
                        updateMeal={updateMeal}
                        deleteMeal={deleteMeal}
                    />
                ))}
                </div>
                <div>
                    {checkNutritionExists(day.nutrition) &&
                        <span>
                            Nutrition summary of the day
                            <NutritionTable nutrition={day.nutrition} />
                        </span>
                    }
                </div>
            </div>}
            {!day && <div>no data for this date</div>}
            {!showAddMealForm && <Button onClick={onAddMealButtonClick}>Add meal</Button>}
            {showAddMealForm && <EditMealForm
                submit={submitAddMealForm}
                cancel={cancelAddMealForm}
            />}
            {editMeal && <EditMealForm
                submit={submitEditMealForm}
                cancel={() => setEditMeal('')}
                meal={editMeal}
            />}
        </div>
    );
}
