import { createSlice } from "@reduxjs/toolkit";

// Récupérer le panier du localStorage s'il existe
const loadPanierFromStorage = () => {
  try {
    const savedPanier = localStorage.getItem("panier");
    if (savedPanier) {
      const parsedPanier = JSON.parse(savedPanier);
      return {
        panier: parsedPanier.panier || [],
        total: parsedPanier.total || 0,
        nbrArticles: parsedPanier.nbrArticles || 0
      };
    }
  } catch (error) {
    console.error("Erreur lors du chargement du panier:", error);
  }
  return {
    panier: [],
    total: 0,
    nbrArticles: 0
  };
};

const initialState = loadPanierFromStorage();

const PanierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    ajouterAuPanier: (state, action) => {
      const article = action.payload;
      state.panier.push(article); // Ajoute l'article au panier
      state.nbrArticles += 1;     // Augmente le nombre total d'articles
      state.total += article.price; // Ajoute le prix au total
      
      // Sauvegarder dans localStorage
      localStorage.setItem("panier", JSON.stringify(state));
    },
    supprimerDuPanier: (state, action) => {
      const articleIndex = state.panier.findIndex(item => item.id === action.payload);
      if (articleIndex !== -1) {
        const article = state.panier[articleIndex];
        state.nbrArticles -= 1;      // Diminue le nombre total d'articles
        state.total -= article.price; // Diminue le total
        state.panier.splice(articleIndex, 1); // Supprime l'article
        
        // Sauvegarder dans localStorage
        localStorage.setItem("panier", JSON.stringify(state));
      }
    },
    viderPanier: (state) => {
      state.panier = [];
      state.nbrArticles = 0;
      state.total = 0;
      
      // Supprimer du localStorage
      localStorage.removeItem("panier");
    },
    // Pour synchroniser le panier après une commande réussie
    synchroniserPanier: (state, action) => {
      const { panier, total, nbrArticles } = action.payload;
      state.panier = panier;
      state.total = total;
      state.nbrArticles = nbrArticles;
      
      // Sauvegarder dans localStorage
      localStorage.setItem("panier", JSON.stringify(state));
    }
  },
});

export const { ajouterAuPanier, supprimerDuPanier, viderPanier, synchroniserPanier } = PanierSlice.actions;
export default PanierSlice.reducer;
