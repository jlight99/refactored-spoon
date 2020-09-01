import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
// import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

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

export default function FoodSearch(props) {
    const [foodKeyword, setFoodKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [foodDetails, setFoodDetails] = useState('');
    const [foods, setFoods] = useState([]);
    const [fdcIds, setFdcIds] = useState([]);
    // const [loadingDetails, setLoadingDetails] = useState(false);

    const handleSubmitSearch = async event => {
        event.preventDefault();

        const usdaSearchResults = await getUSDASearchResults(foodKeyword);

        setSearchResults(usdaSearchResults);
    };

    const getUSDASearchResults = async (keyword) => {
        const response = await fetch('http://localhost:8082/food/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                food: keyword,
            }),
        });

        return await response.json();
    };

    const handleFoodKeywordChange = event => {
        setFoodKeyword(event.target.value);
    };

    const viewDetails = async fdcId => {
        // setLoadingDetails(true);
        const response = await fetch('http://localhost:8082/food/detail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                food: fdcId,
            }),
        });

        const details = await response.json();

        setFoodDetails(details);
        // setLoadingDetails(false);
    };

    const handleAccordionClick = (result) => {
        viewDetails(result.FdcId);
    };

    const addFood = (food, foodDetails) => {
        const newFood = {
            food: food,
            foodDetails: foodDetails,
        };
        setFoods(foods => [...foods, newFood]);
        setFdcIds(fdcIds => [...fdcIds, food.FdcId]);
        if (props.addFood) {
            props.addFood(newFood);
        }
    };

    const removeFood = (garbageFdcId) => {
        setFoods(foods.filter(food => food.food.FdcId != garbageFdcId));
        setFdcIds(fdcIds.filter(fdcId => fdcId != garbageFdcId));
        if (props.removeFood) {
            props.removeFood(garbageFdcId);
        }
    };

    const getCalories = (food) => {
        return food?.foodDetails?.FoodNutrients?.filter((foodNutrient) => foodNutrient?.Nutrient.Id == NutrientIds.ENERGY)[0]?.Amount;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <span style={{ flexDirection: 'column' }}>
                {foods.map((food) => (
                        <Card
                            key={food.food.FdcId}
                            style={{ width: '24rem', margin: '0 auto' }}
                            className="mb-2"
                        >
                            <Card.Header>{food.food.FdcId}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <span>FDC ID: {food.food.FdcId}</span><br />
                                    <span>Description: {food.food.Description}</span><br />
                                    <span>Calories: {getCalories(food)}</span>
                                </Card.Text>
                                <Button variant="danger" onClick={() => removeFood(food.food.FdcId)}>Remove</Button>
                            </Card.Body>
                        </Card>
                    ))}
                <Form inline onSubmit={handleSubmitSearch} style={{ margin: '10px' }}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        value={foodKeyword}
                        onChange={handleFoodKeywordChange}
                    />
                    <Button type="submit">Search</Button>
                </Form>
                <div>
                    <Accordion style={{ overflowY: 'scroll', maxHeight: '360px' }}>
                        {searchResults && searchResults.map((result) => (
                            <Card key={result.FdcId} onClick={() => handleAccordionClick(result)}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={result.FdcId}>
                                        {result.Description}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={result.FdcId}>
                                    <Card.Body>
                                        {/* {loadingDetails &&
                                                <Spinner animation="border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            } */}
                                            Brand: {result.BrandOwner}<br />
                                            Ingredients: {result.Ingredients}<br />
                                            FdcId: {result.FdcId}<br />
                                        {foodDetails &&
                                            /* {!loadingDetails && foodDetails && */
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Nutrient</th>
                                                        <th>Amount (per 100 grams)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {foodDetails.FoodNutrients.filter((foodNutrient) => [NutrientIds.ENERGY, NutrientIds.PROTEIN, NutrientIds.CARBOHYDRATE, NutrientIds.FAT].includes(foodNutrient.Nutrient.Id)
                                                    ).map((foodNutrient) => (
                                                        <tr key={foodNutrient.Id}>
                                                            <td>{foodNutrient.Nutrient.Name}</td>
                                                            <td>{foodNutrient.Amount} {foodNutrient.Nutrient.UnitName}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        }
                                        {!fdcIds.includes(result.FdcId) &&
                                            <Button onClick={() => addFood(result, foodDetails)}>Select food</Button>
                                        }
                                        {fdcIds.includes(result.FdcId) &&
                                            <span style={{ 'color': 'green' }}>Food selected</span>
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </span>
        </div>
    );
}
