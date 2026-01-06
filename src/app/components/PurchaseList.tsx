import { X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { GroceryItem } from "./CategorySection";

interface PurchaseListProps {
  purchaseList: string[];
  items: GroceryItem[];
  onRemoveFromPurchaseList: (itemId: string) => void;
  onUpdateItemDescription: (itemId: string, description: string) => void;
}

export function PurchaseList({
  purchaseList,
  items,
  onRemoveFromPurchaseList,
  onUpdateItemDescription,
}: PurchaseListProps) {
  const purchaseItems = items.filter((item) => purchaseList.includes(item.id));

  return (
    <div className="lg:sticky lg:top-6">
      <Card className="border-2 border-green-200 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white pb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-5" />
            <CardTitle className="text-white">Purchase List</CardTitle>
            <span className="ml-auto bg-white/20 px-2.5 py-0.5 rounded-full text-sm">
              {purchaseItems.length}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {purchaseItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Check items from categories to add them to your purchase list
            </p>
          ) : (
            <div className="space-y-2">
              {purchaseItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-2 p-3 rounded-md bg-secondary/50 border"
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="font-medium">{item.name}</div>
                    <Input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) =>
                        onUpdateItemDescription(item.id, e.target.value)
                      }
                      placeholder="Add price, quantity, or notes..."
                      className="text-sm"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                    onClick={() => onRemoveFromPurchaseList(item.id)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}