import React from 'react';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Food(props) {
    return (
        <Card
            style={{ width: '30%', margin: '10px' }}
            className="mb-2"
        >
            <Card.Header>{props.food.fdcId}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.food.fdcId && <br><span style={{ margin: '5px' }}>FDC ID: {props.food.fdcId}</span></br>}
                    {props.food.name && <br><span style={{ margin: '5px' }}>Name: {props.food.name}</span></br>}
                    {props.food.details && <br><span style={{ margin: '5px' }}>Description: {props.food.details.description}</span></br>}
                    <br><span style={{ margin: '5px' }}>Calories: {props.food.nutrition.calories}</span></br>

                    <span>
                        Serving size:
                        <FormControl
                            type="number"
                            placeholder={100}
                            style={{ width: '80px', display: 'inline-block', margin: '5px' }}
                            value={props.food.serving}
                            onChange={(e) => props.updateServingSize(props.food, e.target.value)}
                        />
                        g
                    </span><br />
                </Card.Text>
                <Button variant="danger" onClick={() => props.removeFood(props.food.fdcId)}>Remove</Button>
            </Card.Body>
        </Card>
    );
}
