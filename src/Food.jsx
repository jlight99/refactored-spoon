import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import NutritionTable, { checkNutritionExists } from './NutritionTable';

export default function Food(props) {
    const [displayNutritionInfo, setDisplayNutritionInfo] = useState(false);

    return (
        <span>
            {props.food.name}<br />
            {<span>
                serving: {props.food.serving}<br />
                calories: {props.food.nutrition?.calories?.value} kcal<br />

                {!displayNutritionInfo &&
                    <span>
                        <Button variant="secondary" onClick={() => setDisplayNutritionInfo(true)} style={{ marginTop: '10px', marginBottom: '20px' }}>See nutrition</Button>
                        <br />
                    </span>
                }
                {displayNutritionInfo && checkNutritionExists(props.food.nutrition) &&
                    <span>
                        Food nutrition
                        <NutritionTable nutrition={props.food.nutrition} height='180px' />
                        <Button variant="secondary" onClick={() => setDisplayNutritionInfo(false)} style={{ marginTop: '10px', marginBottom: '20px' }}>Hide nutrition</Button>
                    </span>
                }
            </span>}
        </span>
    );
}
