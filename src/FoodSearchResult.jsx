import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const NutrientIds = {
    ENERGY: 1008,
    CALCIUM: 1087,
    IRON: 1089,
    VITAMIN_A: 1104,
    VITAMIN_C: 1162,
    PROTEIN: 1003,
    FAT: 1004,
    CARBOHYDRATE: 1005,
    SUGAR: 2000,
    FIBER: 1079,
    POTASSIUM: 1092,
    SODIUM: 1093,
    CHOLESTEROL: 1253,
};

export default function FoodSearchResult(props) {
    return (
        <Card key={props.searchResult.result.fdcId} border="primary" style={{ width: '30%', margin: '10px' }}>
            <Card.Header>
                {props.searchResult.result.description}
            </Card.Header>
            <Card.Body>
                FdcId: {props.searchResult.result.fdcId}<br />
                {props.searchResult.result.brandOwner && <span>Brand: {props.searchResult.result.brandOwner}<br /></span>}
                {props.searchResult.result.ingredients &&
                    <span>
                        Ingredients: {props.searchResult.result.ingredients}<br />
                    </span>
                }
                {props.searchResult?.details?.foodNutrients &&
                    <Table style={{ marginTop: '5px' }}>
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Amount (per 100 grams)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.searchResult.details.foodNutrients.filter((foodNutrient) => [NutrientIds.ENERGY, NutrientIds.PROTEIN, NutrientIds.CARBOHYDRATE, NutrientIds.FAT].includes(foodNutrient.nutrient.id)
                            ).map((foodNutrient) => (
                                <tr key={foodNutrient.id}>
                                    <td>{foodNutrient.nutrient.name}</td>
                                    <td>{foodNutrient.amount} {foodNutrient.nutrient.unitName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                {props.showSelect && !props.fdcIds?.includes(props.searchResult.result.fdcId) &&
                    <Button onClick={() => props.selectFood(props.searchResult.result, props.searchResult.details)}>Select food</Button>
                }
                {props.showSelect && props.fdcIds?.includes(props.searchResult.result.fdcId) &&
                    <span style={{ 'color': 'green' }}>Food selected</span>
                }
            </Card.Body>
        </Card>
    );
}
