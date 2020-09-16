import React from 'react';
import Table from 'react-bootstrap/Table';

export function checkNutritionExists(nutrition) {
    return nutrition && !(Object.keys(nutrition).length === 0 && nutrition.constructor === Object);
};

export default function NutritionTable(props) {
    const round = (nutrient) => {
        return Math.round(nutrient * 100) / 100;
    };

    return (
        <span style={{ display: 'block', overflowY: 'scroll', overflowX: 'hidden', maxHeight: props.height ? props.height : '300px', border: '1px solid lightGrey', maxWidth: '450px', margin: '0 auto' }}>

        <Table>
            <thead style={{ display: 'block', marginLeft: '27%', position: 'sticky', top: '0', backgroundColor: 'white' }}>
                <tr>
                    <th style={{ position: 'sticky', top: '0' }}>Nutrient</th>
                    <th style={{ position: 'sticky', top: '0' }}>Amount</th>
                </tr>
            </thead>
            <tbody style={{ marginLeft: '25%', float: 'left' }}>
                {!!props.nutrition.calories?.value && <tr>
                    <td>Calories</td>
                    <td>{round(props.nutrition.calories.value)} {props.nutrition.calories.unitName}</td>
                </tr>}
                {!!props.nutrition.protein?.value && <tr>
                    <td>Protein</td>
                    <td>{round(props.nutrition.protein.value)} {props.nutrition.protein.unitName}</td>
                </tr>}
                {!!props.nutrition.carbs?.value && <tr>
                    <td>Carbs</td>
                    <td>{round(props.nutrition.carbs.value)} {props.nutrition.carbs.unitName}</td>
                </tr>}
                {!!props.nutrition.fat?.value && <tr>
                    <td>Fat</td>
                    <td>{round(props.nutrition.fat.value)} {props.nutrition.fat.unitName}</td>
                </tr>}
                {!!props.nutrition.sugar?.value && <tr>
                    <td>Sugar</td>
                    <td>{round(props.nutrition.sugar.value)} {props.nutrition.sugar.unitName}</td>
                </tr>}
                {!!props.nutrition.fiber?.value && <tr>
                    <td>Fiber</td>
                    <td>{round(props.nutrition.fiber.value)} {props.nutrition.fiber.unitName}</td>
                </tr>}
                {!!props.nutrition.sodium?.value && <tr>
                    <td>Sodium</td>
                    <td>{round(props.nutrition.sodium.value)} {props.nutrition.sodium.unitName}</td>
                </tr>}
                {!!props.nutrition.calcium?.value && <tr>
                    <td>Calcium</td>
                    <td>{round(props.nutrition.calcium.value)} {props.nutrition.calcium.unitName}</td>
                </tr>}
                {!!props.nutrition.iron?.value && <tr>
                    <td>Iron</td>
                    <td>{round(props.nutrition.iron.value)} {props.nutrition.iron.unitName}</td>
                </tr>}
                {!!props.nutrition.cholesterol?.value && <tr>
                    <td>Cholesterol</td>
                    <td>{round(props.nutrition.cholesterol.value)} {props.nutrition.cholesterol.unitName}</td>
                </tr>}
                {!!props.nutrition.potassium?.value && <tr>
                    <td>Potassium</td>
                    <td>{round(props.nutrition.potassium.value)} {props.nutrition.potassium.unitName}</td>
                </tr>}
                {!!props.nutrition.vitaminA?.value && <tr>
                    <td>Vitamin A</td>
                    <td>{round(props.nutrition.vitaminA.value)} {props.nutrition.vitaminA.unitName}</td>
                </tr>}
                {!!props.nutrition.vitaminC?.value && <tr>
                    <td>Vitamin C</td>
                    <td>{round(props.nutrition.vitaminC.value)} {props.nutrition.vitaminC.unitName}</td>
                </tr>}
            </tbody>
        </Table>
        </span>
    );
}
