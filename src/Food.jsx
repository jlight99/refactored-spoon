import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import NutritionTable, { checkNutritionExists } from './NutritionTable';

export default function Food(props) {
    const [displayNutritionInfo, setDisplayNutritionInfo] = useState(false);

    return (
        <span>
            {props.food.name}<br />
            {<span>
                {props.food.group && <span>group: {props.food.group}<br /></span>}
                serving: {props.food.serving}<br />
                calories: {props.food?.nutrition?.calories}<br />

                {!displayNutritionInfo &&
                    <span>
                        <Button variant="secondary" onClick={() => setDisplayNutritionInfo(true)}>See nutrition</Button>
                        <br />
                    </span>
                }
                {displayNutritionInfo && checkNutritionExists(props.food.nutrition) &&
                    <span>
                        Food nutrition
                        <NutritionTable nutrition={props.food.nutrition} height='180px' />
                        <Button variant="secondary" onClick={() => setDisplayNutritionInfo(false)}>Hide nutrition</Button>
                        <br />
                    </span>
                }
            </span>}
        </span>
    );
}
