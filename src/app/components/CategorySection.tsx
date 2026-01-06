import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export interface GroceryItem {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}

interface CategorySectionProps {
  categories: Category[];
  items: GroceryItem[];
  purchaseList: string[];
  onAddItemToCategory: (categoryId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onToggleItemInPurchaseList: (itemId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateItemDescription: (itemId: string, description: string) => void;
}

export function CategorySection({
  categories,
  items,
  purchaseList,
  onAddItemToCategory,
  onDeleteItem,
  onToggleItemInPurchaseList,
  onDeleteCategory,
  onUpdateItemDescription,
}: CategorySectionProps) {
  // Define Material Design colors for categories
  const categoryColors = [
    { bg: "bg-blue-50", border: "border-blue-200", header: "bg-blue-500", text: "text-blue-900" },
    { bg: "bg-pink-50", border: "border-pink-200", header: "bg-pink-500", text: "text-pink-900" },
    { bg: "bg-teal-50", border: "border-teal-200", header: "bg-teal-500", text: "text-teal-900" },
    { bg: "bg-green-50", border: "border-green-200", header: "bg-green-500", text: "text-green-900" },
    { bg: "bg-orange-50", border: "border-orange-200", header: "bg-orange-500", text: "text-orange-900" },
    { bg: "bg-purple-50", border: "border-purple-200", header: "bg-purple-500", text: "text-purple-900" },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const categoryItems = items.filter(
          (item) => item.categoryId === category.id
        );
        const colors = categoryColors[index % categoryColors.length];

        return (
          <Card key={category.id} className={`${colors.border} border-2 overflow-hidden shadow-md`}>
            <CardHeader className={`${colors.header} text-white pb-3`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{category.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onAddItemToCategory(category.id)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Plus className="size-4 mr-1" />
                    Add Item
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteCategory(category.id)}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {categoryItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No items in this category
                </p>
              ) : (
                <div className="space-y-3">
                  {categoryItems.map((item) => {
                    const isInPurchaseList = purchaseList.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={isInPurchaseList}
                          onCheckedChange={() => onToggleItemInPurchaseList(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0 space-y-2">
                          <Label
                            htmlFor={`item-${item.id}`}
                            className="cursor-pointer"
                          >
                            <div className="font-medium">{item.name}</div>
                          </Label>
                          <Input
                            type="text"
                            placeholder="Add price, quantity, or notes..."
                            value={item.description || ""}
                            onChange={(e) => onUpdateItemDescription(item.id, e.target.value)}
                            className="text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                          onClick={() => onDeleteItem(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}