import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (categoryName: string) => void;
}

export function AddCategoryDialog({
  open,
  onClose,
  onAdd,
}: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category to organize your grocery items.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="category-name">Category Name</Label>
          <Input
            id="category-name"
            placeholder="e.g., Dairy, Vegetables, Snacks"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!categoryName.trim()}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
