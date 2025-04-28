import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export default function SuccessModal() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const handleSubscriptionSuccess = () => setOpen(true);
    window.addEventListener('subscription-success', handleSubscriptionSuccess);
    
    return () => {
      window.removeEventListener('subscription-success', handleSubscriptionSuccess);
    };
  }, []);
  
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader className="justify-center items-center">
          <div className="text-green-500 w-12 h-12 mx-auto mb-2">
            <CheckCircle className="w-full h-full" />
          </div>
          <DialogTitle className="text-xl">تم الإرسال بنجاح!</DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            شكراً لك! تم استلام بياناتك وسنقوم بالتواصل معك قريباً.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button 
            onClick={handleClose} 
            className="bg-primary hover:bg-primary-dark"
          >
            العودة للصفحة الرئيسية
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
