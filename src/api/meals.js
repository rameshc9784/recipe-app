// src/api/meals.js
import axios from "axios";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export const searchMealsByName = (q) =>
    axios.get(`${BASE}/search.php`, { params: { s: q } }).then(r => r.data);

export const filterMeals = (params) =>
    // params: { i: 'Chicken' } or { c: 'Seafood' } or { a: 'Canadian' }
    axios.get(`${BASE}/filter.php`, { params }).then(r => r.data);

export const lookupMealById = (id) =>
    axios.get(`${BASE}/lookup.php`, { params: { i: id } }).then(r => r.data);

export const listCategories = () =>
    axios.get(`${BASE}/categories.php`).then(r => r.data);

export const listIngredientNames = () =>
    axios.get(`${BASE}/list.php`, { params: { i: "list" } }).then(r => r.data);

export const listAreas = () =>
    axios.get(`${BASE}/list.php`, { params: { a: "list" } }).then(r => r.data);
