import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { serverURL } from './App';
import FoodSearchResult from './FoodSearchResult';

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
        await searchFood(foodKeyword);
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
        await searchFood(foodKeyword, 9, pageNumber);
        setLoading(false);
    };

    const searchFood = async (keyword, pageSize = 9, pageNumber = 1) => {
        const searchResponse = await searchUSDAFood(keyword, pageSize, pageNumber);
        const searchedFoods = searchResponse?.foods ? searchResponse.foods : [];

        if (searchedFoods.length === 0) {
            setSearchResults([]);
            return;
        }

        const searchResultFdcIds = [];
        searchedFoods.forEach((result) => {
            searchResultFdcIds.push(result.fdcId);
        });

        setTotalPages(searchResponse.totalPages);
        setPageNumber(searchResponse.currentPage);

        const foodsDetails = await getUSDAFoodDetailsBulk(searchResultFdcIds);
        const usdaSearchResults = [];
        for (var i = 0; i < searchedFoods.length; i++) {
            const newUSDASearchResult = {
                result: searchedFoods[i],
                details: foodsDetails[i],
            };
            usdaSearchResults.push(newUSDASearchResult);
        }

        setSearchResults(usdaSearchResults);
    };

    const searchUSDAFood = async (keyword, pageSize, pageNumber) => {
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

        return await response.json();
    };

    const getUSDAFoodDetailsBulk = async (fdcIds) => {
        const foodsDetailRes = await fetch(serverURL + '/foods/detail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foods: fdcIds,
            }),
        });

        return await foodsDetailRes.json();
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
                        <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {searchResults.map((searchResult) => (
                                    <FoodSearchResult
                                        showSelect={props.showSelect}
                                        selectFood={props.selectFood}
                                        fdcIds={props.fdcIds}
                                        searchResult={searchResult}
                                    />
                                ))}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
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
