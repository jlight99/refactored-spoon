import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MyNavbar from './MyNavbar';

export default function Days() {
    const [days, setDays] = useState([]);
    const [day, setDay] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        async function fetchDays(user) {
            const responseJson = await getDays(user);
            const filteredDay = getDayByDate(selectedDate, responseJson);   

            setDay(filteredDay);
            setDays(responseJson);
        };
        fetchDays("5f4552d03b8cd948cd803e7c");
    }, []);

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
        </div>
    );
}
