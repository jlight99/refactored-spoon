import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MyNavbar from './MyNavbar';
import EditMealForm from './EditMealForm';
import Meal from './Meal';
import NutritionTable, { checkNutritionExists } from './NutritionTable';
import { getUserFromLocalStorage } from './SignIn';
import { serverURL } from './App';

export default function Days(props) {
    const [day, setDay] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddMealForm, setShowAddMealForm] = useState(false);
    const [editMeal, setEditMeal] = useState('');

    useEffect(() => {
        fetchDay(selectedDate);
        // disabled lint on next line because otherwise lint would complain about fetchDays being a missing dependency
        // when in reality, fetchDays is a method defined separately underneath, since it is used in other places
        // eslint-disable-next-line
    }, []);

    const fetchDay = async (date) => {
        const fetchedDay = await getDay(date);
        setDay(fetchedDay);
    };

    const getDay = async (date) => {
        const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate();
        const response = await fetch(serverURL + '/days/' + dateStr + '?userId=' + getUserFromLocalStorage(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const responseJSON = await response.json();
        if (responseJSON._id === "000000000000000000000000") { // response for nonexistent record
            return null;
        }
        return responseJSON;
    };

    const handleSelectedDateChange = (date) => {
        setSelectedDate(date);
        fetchDay(date);
        setShowAddMealForm(false);
    };

    const onAddMealButtonClick = () => {
        setShowAddMealForm(true);
    };

    const submitAddMealForm = async (meal) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch(serverURL + '/days/' + dateStr + '/meals?userId=' + getUserFromLocalStorage(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
        });

        fetchDay(selectedDate);
        setShowAddMealForm(false);
    };

    const cancelAddMealForm = () => {
        setShowAddMealForm(false);
    };

    const submitEditMealForm = async (meal) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch(serverURL + '/days/' + dateStr + '/meals/' + meal._id + '?userId=' + getUserFromLocalStorage(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meal),
        });

        fetchDay(selectedDate);
        setEditMeal('');
    };

    const deleteMeal = async (mealId) => {
        const dateStr = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getUTCDate();

        await fetch(serverURL + '/days/' + dateStr + '/meals/' + mealId + '?userId=' + getUserFromLocalStorage(), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        fetchDay(selectedDate);
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
            <MyNavbar setAuthenticated={props.setAuthenticated} />
            <div style={{ margin: '10px' }}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleSelectedDateChange}
                />
            </div>
            {showAddMealForm && <EditMealForm
                submit={submitAddMealForm}
                cancel={cancelAddMealForm}
            />}
            {editMeal && <EditMealForm
                submit={submitEditMealForm}
                cancel={() => setEditMeal('')}
                meal={editMeal}
            />}
            {!showAddMealForm && !editMeal &&
                <Button onClick={onAddMealButtonClick} style={{ margin: '10px' }}>
                    Add meal
                </Button>
            }
            {!showAddMealForm && !editMeal && day && <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                {day.meals && day.meals.map((meal, j) => (
                    <Meal
                        key={j}
                        meal={meal}
                        updateMeal={() => updateMeal(meal)}
                        deleteMeal={deleteMeal}
                    />
                ))}
                </div>
                <div>
                    {day?.meals && checkNutritionExists(day.nutrition) &&
                        <span>
                            <div className="nutritionSummary">
                                Daily nutrition summary
                            </div>
                            <NutritionTable nutrition={day.nutrition} />
                        </span>
                    }
                </div>
            </div>}
            {!day?.meals && <div>No data for this date</div>}
        </div>
    );
}
