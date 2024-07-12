import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { vegRecipes } from './vegRecipes';
import { nonvegRecipes } from './nonvegRecipes';
import logo from './logo.png';
import { images } from './img';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddRecipeForm from './AddRecipeForm'; // Import the AddRecipeForm component

const allRecipes = {
  veg: [...vegRecipes],
  nonveg: [...nonvegRecipes], // Combined non-veg recipes
  all: [...vegRecipes,...nonvegRecipes,] // All recipes
};

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [signedIn, setSignedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes.all); // Default to all recipes
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // New state for sign-in form
  const [showAddRecipe, setShowAddRecipe] = useState(false); // State to control Add Recipe form
  const [filterView, setFilterView] = useState(false); // State to track if filter view is active
  const [editingRecipe, setEditingRecipe] = useState(null); // State to track the recipe being edited

  const handleSignIn = () => {
    setSignedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Store logged-in status in local storage
    setShowSignIn(false); // Close the sign-in form after signing in
  };
  const handleSignOut = () => {
    setSignedIn(false);
    localStorage.removeItem('loggedIn'); // Remove logged-in status from local storage
  };
  const handleRecipeSelect = (recipe) => setSelectedRecipe(recipe);
  const handleBackToRecipes = () => setSelectedRecipe(null);
  const handleFilter = (type) => {
    setFilteredRecipes(allRecipes[type]);
    setFilterView(true); // Set filter view to active
  };
  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = allRecipes.all.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredRecipes(filtered);
  };

  const handleSignUpClick = () => setShowSignUp(true);
  const handleBackToMainFromSignUp = () => setShowSignUp(false);
  const handleSignInClick = () => setShowSignIn(true); // Show sign-in form
  const handleBackToMainFromSignIn = () => setShowSignIn(false); // Hide sign-in form and show main content
  const handleAddRecipeClick = () => setShowAddRecipe(true); // Show Add Recipe form
  const handleBackToMainFromAddRecipe = () => setShowAddRecipe(false); // Hide Add Recipe form and show main content

  const handleAddRecipe = (newRecipe) => {
    setFilteredRecipes([...filteredRecipes, newRecipe]);
    setShowAddRecipe(false);
  };

  const handleBackToAllRecipes = () => {
    setFilteredRecipes(allRecipes.all);
    setFilterView(false); // Set filter view to inactive
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowAddRecipe(true); // Reuse AddRecipeForm for editing
  };

  const handleDeleteRecipe = (recipe) => {
    setFilteredRecipes(filteredRecipes.filter(r => r !== recipe));
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setFilteredRecipes(filteredRecipes.map(r => (r === editingRecipe ? updatedRecipe : r)));
    setEditingRecipe(null);
    setShowAddRecipe(false);
  };

  return (
    <div className="App" style={{ backgroundColor: 'white' }}>
      <header className="App-header">
        <div className="logo">
          <img src={logo} className="App-logo-small" alt="Logo" />
          <span style={{ fontSize: '2em', fontWeight: 'bold' }}>CulinaryCorner</span>
        </div>
        <div className="buttons">
          {!signedIn && !showSignUp && !showSignIn && (
            <>
              <button onClick={handleSignInClick}>Sign In</button>
              <button onClick={handleSignUpClick}>Sign Up</button>
            </>
          )}
          {signedIn && (
            <>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          )}
        </div>
      </header>
      <main className="content">
        {showSignUp ? (
          <SignUpForm handleBackToMain={handleBackToMainFromSignUp} />
        ) : showSignIn ? (
          <SignInForm handleBackToMain={handleBackToMainFromSignIn} handleSignIn={handleSignIn} />
        ) : showAddRecipe ? (
          <AddRecipeForm 
            handleAddRecipe={editingRecipe ? handleUpdateRecipe : handleAddRecipe} 
            handleBackToMain={handleBackToMainFromAddRecipe} 
            editingRecipe={editingRecipe} // Pass the recipe being edited to the form
          />
        ) : selectedRecipe ? (
          <div className="recipe-details">
            <h1>{selectedRecipe.title}</h1>
            <img src={images[selectedRecipe.title]} alt={selectedRecipe.title} />
            <div>
              <h3>Ingredients:</h3>
              <ul>
                {Array.isArray(selectedRecipe.Ingredients) ? (
                  selectedRecipe.Ingredients.map((Ingredient, index) => (
                    <li key={index}>{Ingredient}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.Ingredients}</li>
                )}
              </ul>
              <h3>Procedure:</h3>
              <ul>
                {Array.isArray(selectedRecipe.Procedure) ? (
                  selectedRecipe.Procedure.map((Procedure, index) => (
                    <li key={index}>{Procedure}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.Procedure}</li>
                )}
              </ul>
              <p>Time: {selectedRecipe.time || '50 minutes'}</p>
              {signedIn && (
                <div className="edit-delete-buttons">
                  <button onClick={() => handleEditRecipe(selectedRecipe)}>Edit</button>
                  <button onClick={() => handleDeleteRecipe(selectedRecipe)}>Delete</button>
                  <button onClick={handleBackToRecipes}>Back to Recipes</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '30%', margin: '10px 10px 10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <button 
                onClick={handleSearch} 
                style={{ 
                  padding: '10px 20px', 
                  margin: '10px 10px 10px 0', 
                  backgroundColor: '#f5a623', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                Search
              </button>
              {signedIn && (
                <button 
                  onClick={handleAddRecipeClick} 
                  style={{ 
                    padding: '10px 20px', 
                    margin: '10px 0', 
                    backgroundColor: '#f5a623', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                  Add Recipe
                </button>
              )}
            </div>
            <div className="filter-buttons">
              <button 
                onClick={() => handleFilter('veg')} 
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'green', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  margin: '5px'
                }}>
                Veg
              </button>
              <button 
                onClick={() => handleFilter('nonveg')} 
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'red', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  margin: '5px'
                }}>
                Non-Veg
              </button>
              {filterView && (
                <button 
                  onClick={handleBackToAllRecipes} 
                  style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    margin: '5px'
                  }}>
                  Back to All Recipes
                </button>
              )}
            </div>
            <div className="recipes-container">
              {filteredRecipes.map((recipe, index) => (
                <div
                  className="recipe-item"
                  key={index}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <img src={images[recipe.title]} alt={recipe.title} />
                  <p><b>{recipe.title}</b></p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;