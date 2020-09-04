import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

    const handleSubmitSearch = async event => {
        event.preventDefault();

        await getUSDASearchResults(foodKeyword);
    };

    const getUSDASearchResults = async (keyword) => {
        const response = await fetch('http://localhost:8081/food/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                food: keyword,
                pageSize: "9",
            }),
        });

        const searchResultFdcIds = [];

        const responseJSON = await response.json();
        responseJSON.forEach((result) => {
            searchResultFdcIds.push(result.fdcId);
        });

        const totalPages = responseJSON.TotalPages;
        console.log("totalPages");
        console.log(totalPages);

        const foodsDetailRes = await fetch('http://localhost:8081/foods/detail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foods: searchResultFdcIds,
            }),
        });

        const foodsDetailResJSON = await foodsDetailRes.json();

        const usdaSearchResults = [];
        responseJSON.forEach((result) => {
            const newUSDASearchResult = {
                result: result,
                details: foodsDetailResJSON.filter((detail) => detail.fdcId === result.fdcId)[0],
            };
            usdaSearchResults.push(newUSDASearchResult);
        });

        setSearchResults(usdaSearchResults);
    };

    const handleFoodKeywordChange = event => {
        setFoodKeyword(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <span style={{ flexDirection: 'column' }}>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {searchResults && searchResults.map((searchResult) => (
                        <Card key={searchResult.result.fdcId} border="primary" style={{ width: '30%', margin: '10px' }}>
                            <Card.Header>
                                {searchResult.result.description}
                            </Card.Header>
                            <Card.Body>
                                FdcId: {searchResult.result.fdcId}<br />
                                {searchResult.result.brandOwner && <span>Brand: {searchResult.result.brandOwner}</span>}<br />
                                {searchResult.result.ingredients && <span>Ingredients: {searchResult.result.ingredients}</span>}<br />

                                {searchResult.details &&
                                        <Table style={{ marginTop: '5px' }}>
                                            <thead>
                                                <tr>
                                                    <th>Nutrient</th>
                                                    <th>Amount (per 100 grams)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchResult.details.foodNutrients.filter((foodNutrient) => [NutrientIds.ENERGY, NutrientIds.PROTEIN, NutrientIds.CARBOHYDRATE, NutrientIds.FAT].includes(foodNutrient.nutrient.id)
                                                ).map((foodNutrient) => (
                                                    <tr key={foodNutrient.id}>
                                                        <td>{foodNutrient.nutrient.name}</td>
                                                        <td>{foodNutrient.amount} {foodNutrient.nutrient.unitName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    }
                                    {props.showSelect && !props.fdcIds?.includes(searchResult.result.fdcId) &&
                                        <Button onClick={() => props.selectFood(searchResult.result, searchResult.details)}>Select food</Button>
                                    }
                                    {props.showSelect && props.fdcIds?.includes(searchResult.result.fdcId) &&
                                        <span style={{ 'color': 'green' }}>Food selected</span>
                                    }
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </span>
        </div>
    );
}
