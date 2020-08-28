import React, { useState } from 'react';
import MyNavbar from './MyNavbar';
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

export default function FoodSearch() {
    const [foodKeyword, setFoodKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [foodDetails, setFoodDetails] = useState('');
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

    return (
        <div>
            <MyNavbar />
            <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <span style={{ flexDirection: 'column' }}>
                    <Form inline onSubmit={handleSubmitSearch}>
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
                        <Accordion>
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
                                                        {foodDetails.FoodNutrients.filter((foodNutrient) => [NutrientIds.ENERGY, NutrientIds.PROTEIN].includes(foodNutrient.Nutrient.Id)
                                                        ).map((foodNutrient) => (
                                                            <tr key={foodNutrient.Id}>
                                                                <td>{foodNutrient.Nutrient.Name}</td>
                                                                <td>{foodNutrient.Amount} {foodNutrient.Nutrient.UnitName}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            }
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))}
                        </Accordion>
                    </div>
                </span>
            </span>
        </div>
    );
}
