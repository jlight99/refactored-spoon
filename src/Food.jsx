import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Food(props) {
    const [servingSize, setServingSize] = useState(props.food.serving);

    const updateServingSize = (newServingSize) => {
        setServingSize(newServingSize);
        props.updateServingSize(props.food, newServingSize)
    }

    return (
        <Card
            style={{ width: '24rem', margin: '0 auto' }}
            className="mb-2"
        >
            <Card.Header>{props.food.fdcId}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <span style={{ margin: '5px' }}>FDC ID: {props.food.fdcId}</span><br />
                    <span style={{ margin: '5px' }}>Description: {props.food.details.Description}</span><br />
                    <span style={{ margin: '5px' }}>Calories: {props.food.nutrition.calories}</span><br />

                    <span>
                        Serving size:
                        <FormControl
                            type="number"
                            placeholder={100}
                            // className="mr-sm-2"
                            style={{ width: '80px', display: 'inline-block', margin: '5px' }}
                            value={servingSize}
                            onChange={(e) => updateServingSize(e.target.value)}
                        />
                        g
                    </span><br />
                </Card.Text>
                <Button variant="danger" onClick={() => props.removeFood(props.food.fdcId)}>Remove</Button>
            </Card.Body>
        </Card>
    );
}
