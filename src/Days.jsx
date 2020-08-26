import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function Days() {
    const [days, setDays] = useState([]);

    useEffect(() => {
        getDays("5f4552d03b8cd948cd803e7c");
    }, []);

    const getDays = async (user) => {
        const response = await fetch('http://localhost:8083/days?user=' + user, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();
        setDays(responseJson);
    };

    return (
        <div>
            days
            {days.map((day, i) => (
                <div key={i}>
                    {day.Date}
                    {day.Meals.map((meal, j) => (
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
                                                calories: {food.Nutrition.Calories}<br />
                                            </span>}
                                            <br />
                                        </span>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}
