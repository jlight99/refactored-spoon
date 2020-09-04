import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

export default function Meal(props) {
    return (
        <Card
            style={{ width: '24rem', margin: '0 auto' }}
            className="mb-2"
        >
            <Card.Header>
                <span>{props.meal.name}</span><br />
                <Button variant="link" size="sm" onClick={() => props.updateMeal(props.meal)}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} />
                </Button>
                <Button variant="link" size="sm" onClick={() => props.deleteMeal(props.meal._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'black' }} />
                </Button>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.meal.foods.map((food, k) => (
                        <span key={k}>
                            {food.name}<br />
                            {<span>
                                group: {food.group}<br />
                                serving: {food.serving}<br />
                                calories: {food?.nutrition?.calories}<br />
                            </span>}
                            <br />
                        </span>
                    ))}
                </Card.Text>
            </Card.Body>
            <div>
                nutrition
                <div>calories: {props.meal?.nutrition?.calories}</div>
            </div>
        </Card>
    );
}
