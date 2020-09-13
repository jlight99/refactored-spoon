import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { serverURL } from './App';

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
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageChangeError, setPageChangeError] = useState("");

    const handleSubmitSearch = async event => {
        event.preventDefault();
        setLoading(true);
        setSearchResults([]);
        await getUSDASearchResults(foodKeyword);
        setLoading(false);
    };

    const handleSubmitPageChange = async event => {
        event.preventDefault();
        if (pageNumber > totalPages) {
            setPageChangeError("error! page " + pageNumber + " does not exist.");
            return;
        }
        setPageChangeError("");
        setLoading(true);
        setSearchResults([]);
        await getUSDASearchResults(foodKeyword, 9, pageNumber);
        setLoading(false);
    };

    const getUSDASearchResults = async (keyword, pageSize = 9, pageNumber = 1) => {
        const response = await fetch(serverURL + '/food/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                generalSearchInput: keyword,
                pageSize: pageSize,
                pageNumber: pageNumber >= 0 ? pageNumber : 1,
                requireAllWords: true,
            }),
        });

        const searchResultFdcIds = [];

        const searchResponse = await response.json();
        const searchedFoods = searchResponse?.foods ? searchResponse.foods : [];
        if (!searchedFoods) {
            setSearchResults([]);
            return;
        }
        searchedFoods.forEach((result) => {
            searchResultFdcIds.push(result.fdcId);
        });

        const totalPages = searchResponse.totalPages;
        setTotalPages(totalPages);
        setPageNumber(searchResponse.currentPage);

        const foodsDetailRes = await fetch(serverURL + '/foods/detail', {
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
        searchedFoods.forEach((result) => {
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

    const handlePageNumberChange = event => {
        setPageNumber(parseInt(event.target.value));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <span>
                <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '10px' }}>
                    <Form inline onSubmit={handleSubmitSearch}>
                        <FormControl
                            type="text"
                            placeholder="Search for food"
                            className="mr-sm-2"
                            value={foodKeyword}
                            onChange={handleFoodKeywordChange}
                        />
                        <Button type="submit" style={{ margin: '5px' }}>Search</Button>
                        <Button variant="secondary" onClick={() => setSearchResults([])} style={{ margin: '5px' }}>Clear search</Button>
                    </Form>
                </span>
                <div>
                    {loading && <Spinner animation="border" />}
                    {searchResults && searchResults.length > 0 &&
                        <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {searchResults.map((searchResult) => (
                                <Card key={searchResult.result.fdcId} border="primary" style={{ width: '30%', margin: '10px' }}>
                                    <Card.Header>
                                        {searchResult.result.description}
                                    </Card.Header>
                                    <Card.Body>
                                        FdcId: {searchResult.result.fdcId}<br />
                                        {searchResult.result.brandOwner && <span>Brand: {searchResult.result.brandOwner}<br /></span>}
                                        {searchResult.result.ingredients &&
                                            <span>
                                                Ingredients: {searchResult.result.ingredients}<br />
                                            </span>
                                        }
                                        {searchResult?.details?.foodNutrients &&
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
                            <div>
                                <Form inline onSubmit={handleSubmitPageChange}>
                                    Page
                                    <FormControl
                                        type="number"
                                        style={{ margin: '5px', width: '80px' }}
                                        value={pageNumber}
                                        onChange={handlePageNumberChange}
                                    />
                                    of {totalPages}
                                    <Button type="submit" style={{ margin: '5px' }}>Go</Button>
                                </Form>
                                <div style={{ color: 'red' }}>{pageChangeError}</div>
                            </div>
                        </span>
                    }
                </div>
            </span>
        </div>
    );
}
