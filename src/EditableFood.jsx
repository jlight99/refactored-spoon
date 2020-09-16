import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import NutritionTable from './NutritionTable';

export default function EditableFood(props) {
    const [displayNutritionInfo, setDisplayNutritionInfo] = useState(false);

    return (
        <Card
            style={{ width: '30%', margin: '10px' }}
            className="mb-2"
        >
            <Card.Header>{props.food.fdcId}</Card.Header>
                    {props.food.fdcId && <span style={{ margin: '5px' }}>FDC ID: {props.food.fdcId}<br /></span>}
                    {props.food.name && <span style={{ margin: '5px' }}>Name: {props.food.name}<br /></span>}
                    {props.food.description && <span style={{ margin: '5px' }}>Description: {props.food.description}<br /></span>}
                    <span style={{ margin: '5px' }}>Calories: {props.food.nutrition.calories.value} kcal<br /></span>

                    {!displayNutritionInfo && 
                        <span>
                            <Button variant="secondary" onClick={() => setDisplayNutritionInfo(true)}>See nutrition</Button>
                            <br />
                        </span>
                    }
                    {displayNutritionInfo && <span>
                        Food nutrition
                        <NutritionTable nutrition={props.food.nutrition} />
                        <Button variant="secondary" onClick={() => setDisplayNutritionInfo(false)}>Hide nutrition</Button>
                        <br />
                    </span>}

                    <span>
                        Serving size:
                        <FormControl
                            type="number"
                            placeholder={100}
                            style={{ width: '80px', display: 'inline-block', margin: '5px' }}
                            value={props.food.serving}
                            onChange={(e) => props.updateServingSize(e.target.value)}
                        />
                        g
                    </span><br />
                <Button variant="danger" onClick={() => props.removeFood(props.food._id ? props.food._id : props.food.fdcId)}>Remove</Button>
        </Card>
    );
}
