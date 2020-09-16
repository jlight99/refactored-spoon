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
        <Card key={props.searchResult.fdcId} border="primary" style={{ width: '30%', margin: '10px' }}>
            <Card.Header>
                {props.searchResult.description}
            </Card.Header>
            <Card.Body>
                FdcId: {props.searchResult.fdcId}<br />
                {props.searchResult.brandOwner && <span>Brand: {props.searchResult.brandOwner}<br /></span>}
                {props.searchResult.ingredients &&
                    <span>
                        Ingredients: {props.searchResult.ingredients}<br />
                    </span>
                }
                {props.searchResult.foodNutrients &&
                    <Table style={{ marginTop: '5px' }}>
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Amount (per 100 grams)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.searchResult.foodNutrients.filter((foodNutrient) => [NutrientIds.ENERGY, NutrientIds.PROTEIN, NutrientIds.CARBOHYDRATE, NutrientIds.FAT].includes(foodNutrient.nutrientId)
                            ).map((foodNutrient) => (
                                <tr key={foodNutrient.nutrientId}>
                                    <td>{foodNutrient.nutrientName}</td>
                                    <td>{foodNutrient.value} {foodNutrient.unitName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                {props.showSelect && !props.fdcIds?.includes(props.searchResult.fdcId) &&
                    <Button onClick={() => props.selectFood()}>Select food</Button>
                }
                {props.showSelect && props.fdcIds?.includes(props.searchResult.fdcId) &&
                    <span style={{ 'color': 'green' }}>Food selected</span>
                }
            </Card.Body>
        </Card>
    );
}
