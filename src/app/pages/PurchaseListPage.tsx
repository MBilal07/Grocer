import { GroceryItem } from "../components/CategorySection";
import { PurchaseList } from "../components/PurchaseList";

interface PurchaseListPageProps {
  purchaseList: string[];
  items: GroceryItem[];
  onRemoveFromPurchaseList: (itemId: string) => void;
  onUpdateItemDescription: (itemId: string, description: string) => void;
}

export function PurchaseListPage({
  purchaseList,
  items,
  onRemoveFromPurchaseList,
  onUpdateItemDescription,
}: PurchaseListPageProps) {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <PurchaseList
          purchaseList={purchaseList}
          items={items}
          onRemoveFromPurchaseList={onRemoveFromPurchaseList}
          onUpdateItemDescription={onUpdateItemDescription}
        />
      </div>
    </div>
  );
}
