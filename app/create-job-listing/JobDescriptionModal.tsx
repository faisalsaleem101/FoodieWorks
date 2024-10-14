import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onDescriptionChange: (newDescription: string) => void;
}

const JobDescriptionModal: React.FC<JobDescriptionModalProps> = ({
  isOpen,
  onClose,
  description,
  onDescriptionChange,
}) => {
  const [localDescription, setLocalDescription] = React.useState(description);

  React.useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  const handleSave = () => {
    onDescriptionChange(localDescription);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Job Description</DialogTitle>
        </DialogHeader>
        <Textarea
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          rows={20}
          className="w-full mt-4"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDescriptionModal;
