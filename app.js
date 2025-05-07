// Elementos del DOM
const recipeList = document.getElementById('recipeList');
const searchInput = document.getElementById('search');
const clearSearchButton = document.getElementById('clearSearch');
const navButtons = document.querySelectorAll('.nav-button');

// Estado de la aplicación
let currentRecipes = [...recipes];
let currentCategory = '';
let currentSearch = '';

// Función para crear una tarjeta de receta
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-info">
            <h3>${recipe.name}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span class="recipe-category">${recipe.category}</span>
                <span class="recipe-time">${recipe.cookingTime}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `detalle.html?id=${recipe.id}`;
    });

    return card;
}

// Función para filtrar recetas
function filterRecipes() {
    currentRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(currentSearch.toLowerCase());
        const matchesCategory = !currentCategory || recipe.category.toLowerCase() === currentCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    displayRecipes();
}

// Función para mostrar las recetas
function displayRecipes() {
    recipeList.innerHTML = '';
    if (currentRecipes.length === 0) {
        recipeList.innerHTML = '<p class="no-results">No se encontraron recetas que coincidan con tu búsqueda.</p>';
        return;
    }
    currentRecipes.forEach(recipe => {
        recipeList.appendChild(createRecipeCard(recipe));
    });
}

// Función para actualizar el estado activo de los botones
function updateActiveButton(category) {
    navButtons.forEach(button => {
        if (button.dataset.category === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    filterRecipes();
});

clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    filterRecipes();
});

// Manejar clics en los botones de navegación
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        window.location.href = `index.html?category=${category}`;
    });
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Obtener la categoría de la URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl) {
        currentCategory = categoryFromUrl;
        updateActiveButton(categoryFromUrl);
    }
    
    filterRecipes();
}); 