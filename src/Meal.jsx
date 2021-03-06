import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import NutritionTable, { checkNutritionExists } from './NutritionTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Food from './Food';

export default function Meal(props) {
    return (
        <Card
            style={{ width: '24rem', margin: '0 auto' }}
            className="mb-2"
        >
            <Card.Header>
                <span>{props.meal.name}</span><br />
                <Button variant="link" size="sm" onClick={() => props.updateMeal()}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} />
                </Button>
                <Button variant="link" size="sm" onClick={() => props.deleteMeal(props.meal._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'black' }} />
                </Button>
            </Card.Header>
            <Card.Body>
                {props.meal?.foods?.map((food, k) => {
                    return (
                        <span key={k}>
                            <Food food={food} />
                        </span>
                    );
                })}
            </Card.Body>
            {!!props.meal?.foods && checkNutritionExists(props.meal?.nutrition) &&
                <div>
                    Meal nutrition
                    <NutritionTable nutrition={props.meal.nutrition} />
                </div>
            }
        </Card>
    );
}
