import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { CategorySection, Category, GroceryItem } from "../components/CategorySection";
import { AddItemDialog } from "../components/AddItemDialog";
import { AddCategoryDialog } from "../components/AddCategoryDialog";
import { useState } from "react";

interface CategoriesPageProps {
  categories: Category[];
  items: GroceryItem[];
  purchaseList: string[];
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddItem: (itemName: string, description: string, categoryId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onToggleItemInPurchaseList: (itemId: string) => void;
  onUpdateItemDescription: (itemId: string, description: string) => void;
}

export function CategoriesPage({
  categories,
  items,
  purchaseList,
  onAddCategory,
  onDeleteCategory,
  onAddItem,
  onDeleteItem,
  onToggleItemInPurchaseList,
  onUpdateItemDescription,
}: CategoriesPageProps) {
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleAddItemToCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setAddItemDialogOpen(true);
  };

  const handleAddItem = (itemName: string, description: string) => {
    onAddItem(itemName, description, selectedCategoryId);
    setSelectedCategoryId("");
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border-2 border-blue-100">
          <h2 className="text-xl text-blue-900">Categories & Items</h2>
          <Button 
            onClick={() => setAddCategoryDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
          >
            <Plus className="size-4 mr-2" />
            Add Category
          </Button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300">
            <p className="text-muted-foreground text-lg">No categories yet. Click "Add Category" to get started.</p>
          </div>
        ) : (
          <CategorySection
            categories={categories}
            items={items}
            purchaseList={purchaseList}
            onAddItemToCategory={handleAddItemToCategory}
            onDeleteItem={onDeleteItem}
            onToggleItemInPurchaseList={onToggleItemInPurchaseList}
            onDeleteCategory={onDeleteCategory}
            onUpdateItemDescription={onUpdateItemDescription}
          />
        )}
      </div>

      <AddItemDialog
        open={addItemDialogOpen}
        categoryName={selectedCategory?.name || ""}
        onClose={() => setAddItemDialogOpen(false)}
        onAdd={handleAddItem}
      />

      <AddCategoryDialog
        open={addCategoryDialogOpen}
        onClose={() => setAddCategoryDialogOpen(false)}
        onAdd={onAddCategory}
      />
    </div>
  );
}