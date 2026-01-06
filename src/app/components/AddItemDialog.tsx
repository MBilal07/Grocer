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
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface AddItemDialogProps {
  open: boolean;
  categoryName: string;
  onClose: () => void;
  onAdd: (itemName: string, description: string) => void;
}

export function AddItemDialog({
  open,
  categoryName,
  onClose,
  onAdd,
}: AddItemDialogProps) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (itemName.trim()) {
      onAdd(itemName.trim(), description.trim());
      setItemName("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setItemName("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to {categoryName}</DialogTitle>
          <DialogDescription>
            Enter the name and optional description for the item.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name *</Label>
            <Input
              id="item-name"
              placeholder="e.g., Milk, Bread, Apples"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleAdd();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-description">Description (Optional)</Label>
            <Textarea
              id="item-description"
              placeholder="e.g., 2% fat, whole wheat, organic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!itemName.trim()}>
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}