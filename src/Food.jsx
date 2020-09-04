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
                    {props.food.fdcId && <span style={{ margin: '5px' }}>FDC ID: {props.food.fdcId}<br /></span>}
                    {props.food.name && <span style={{ margin: '5px' }}>Name: {props.food.name}<br /></span>}
                    {props.food.details && <span style={{ margin: '5px' }}>Description: {props.food.details.description}<br /></span>}
                    <span style={{ margin: '5px' }}>Calories: {props.food.nutrition.calories}<br /></span>

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
