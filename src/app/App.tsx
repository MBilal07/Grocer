import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { ShoppingCart, List } from "lucide-react";
import { Category, GroceryItem } from "./components/CategorySection";
import { CategoriesPage } from "./pages/CategoriesPage";
import { PurchaseListPage } from "./pages/PurchaseListPage";

const STORAGE_KEYS = {
  CATEGORIES: "grocery-categories",
  ITEMS: "grocery-items",
  PURCHASE_LIST: "grocery-purchase-list",
};

function Navigation({ purchaseListCount }: { purchaseListCount: number }) {
  const location = useLocation();
  const isCategories = location.pathname === "/";
  const isPurchaseList = location.pathname === "/purchase-list";

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl mb-4 text-white">🛒 Grocery List Manager</h1>
        <p className="text-blue-50 text-lg mb-6">
          Organize your grocery items by category and build your purchase list
        </p>
        
        <div className="flex gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              isCategories
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <List className="size-5" />
            <span className="font-medium">Categories</span>
          </Link>
          <Link
            to="/purchase-list"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              isPurchaseList
                ? "bg-white text-blue-600 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <ShoppingCart className="size-5" />
            <span className="font-medium">Purchase List</span>
            {purchaseListCount > 0 && (
              <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                {purchaseListCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [purchaseList, setPurchaseList] = useState<string[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const savedItems = localStorage.getItem(STORAGE_KEYS.ITEMS);
    const savedPurchaseList = localStorage.getItem(STORAGE_KEYS.PURCHASE_LIST);

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Set initial categories
      const initialCategories: Category[] = [
        { id: "1", name: "Dairy & Eggs" },
        { id: "2", name: "Fruits & Vegetables" },
        { id: "3", name: "Snacks" },
      ];
      setCategories(initialCategories);
    }

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Set initial items
      const initialItems: GroceryItem[] = [
        { id: "i1", name: "Milk", description: "2% fat, 1 gallon", categoryId: "1" },
        { id: "i2", name: "Eggs", description: "Large, organic", categoryId: "1" },
        { id: "i3", name: "Cheese", description: "Cheddar, sliced", categoryId: "1" },
        { id: "i4", name: "Apples", description: "Fuji, 3 lbs", categoryId: "2" },
        { id: "i5", name: "Bananas", description: "Fresh, yellow", categoryId: "2" },
        { id: "i6", name: "Carrots", description: "Baby carrots, 1 lb bag", categoryId: "2" },
        { id: "i7", name: "Chips", description: "Potato chips, family size", categoryId: "3" },
        { id: "i8", name: "Cookies", description: "Chocolate chip", categoryId: "3" },
      ];
      setItems(initialItems);
    }

    if (savedPurchaseList) {
      setPurchaseList(JSON.parse(savedPurchaseList));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PURCHASE_LIST, JSON.stringify(purchaseList));
  }, [purchaseList]);

  const handleAddCategory = (categoryName: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryName,
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
    // Also delete all items in this category
    setItems(items.filter((item) => item.categoryId !== categoryId));
  };

  const handleAddItem = (itemName: string, description: string, categoryId: string) => {
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: itemName,
      description: description || undefined,
      categoryId: categoryId,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
    setPurchaseList(purchaseList.filter((id) => id !== itemId));
  };

  const handleToggleItemInPurchaseList = (itemId: string) => {
    if (purchaseList.includes(itemId)) {
      setPurchaseList(purchaseList.filter((id) => id !== itemId));
    } else {
      setPurchaseList([...purchaseList, itemId]);
    }
  };

  const handleUpdateItemDescription = (itemId: string, description: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, description } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation purchaseListCount={purchaseList.length} />
      
      <Routes>
        <Route
          path="/"
          element={
            <CategoriesPage
              categories={categories}
              items={items}
              purchaseList={purchaseList}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onToggleItemInPurchaseList={handleToggleItemInPurchaseList}
              onUpdateItemDescription={handleUpdateItemDescription}
            />
          }
        />
        <Route
          path="/purchase-list"
          element={
            <PurchaseListPage
              purchaseList={purchaseList}
              items={items}
              onRemoveFromPurchaseList={handleToggleItemInPurchaseList}
              onUpdateItemDescription={handleUpdateItemDescription}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}