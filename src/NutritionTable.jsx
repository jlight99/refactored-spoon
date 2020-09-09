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
                {!!props.nutrition.calories && <tr>
                    <td>Calories</td>
                    <td>{round(props.nutrition.calories)}</td>
                </tr>}
                {!!props.nutrition.protein && <tr>
                    <td>Protein</td>
                    <td>{round(props.nutrition.protein)}</td>
                </tr>}
                {!!props.nutrition.carbs && <tr>
                    <td>Carbs</td>
                    <td>{round(props.nutrition.carbs)}</td>
                </tr>}
                {!!props.nutrition.fat && <tr>
                    <td>Fat</td>
                    <td>{round(props.nutrition.fat)}</td>
                </tr>}
                {!!props.nutrition.sugar && <tr>
                    <td>Sugar</td>
                    <td>{round(props.nutrition.sugar)}</td>
                </tr>}
                {!!props.nutrition.fiber && <tr>
                    <td>Fiber</td>
                    <td>{round(props.nutrition.fiber)}</td>
                </tr>}
                {!!props.nutrition.sodium && <tr>
                    <td>Sodium</td>
                    <td>{round(props.nutrition.sodium)}</td>
                </tr>}
                {!!props.nutrition.calcium && <tr>
                    <td>Calcium</td>
                    <td>{round(props.nutrition.calcium)}</td>
                </tr>}
                {!!props.nutrition.iron && <tr>
                    <td>Iron</td>
                    <td>{round(props.nutrition.iron)}</td>
                </tr>}
                {!!props.nutrition.cholesterol && <tr>
                    <td>Cholesterol</td>
                    <td>{round(props.nutrition.cholesterol)}</td>
                </tr>}
                {!!props.nutrition.potassium && <tr>
                    <td>Potassium</td>
                    <td>{round(props.nutrition.potassium)}</td>
                </tr>}
                {!!props.nutrition.vitaminA && <tr>
                    <td>Vitamin A</td>
                    <td>{round(props.nutrition.vitaminA)}</td>
                </tr>}
                {!!props.nutrition.vitaminC && <tr>
                    <td>Vitamin C</td>
                    <td>{round(props.nutrition.vitaminC)}</td>
                </tr>}
            </tbody>
        </Table>
        </span>
    );
}
