import { useState } from "react";
import { Mail, MailOpen, Trash2, Reply } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { mockMessages as initialMessages } from "./mockAdminData";
import type { ContactMessage } from "./types";

function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  function openMessage(message: ContactMessage) {
    setSelectedMessage(message);
    setReplyText(message.adminReply ?? "");

    if (!message.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)),
      );
    }
  }

  function submitReply() {
    if (!selectedMessage) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedMessage.id ? { ...m, adminReply: replyText } : m,
      ),
    );
    toast.success("Reply sent to " + selectedMessage.email);
    setSelectedMessage(null);
    setReplyText("");
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    toast.success("Message deleted.");
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Messages</h1>
        {unreadCount > 0 && (
          <Badge variant="destructive">{unreadCount} unread</Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {messages.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No messages yet.
            </div>
          )}

          <div className="divide-y">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => openMessage(message)}
                className={cn(
                  "w-full text-left p-4 flex items-start gap-3 hover:bg-accent/50 transition-colors",
                  !message.isRead && "bg-primary/5",
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {message.isRead ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm",
                        !message.isRead && "font-semibold",
                      )}
                    >
                      {message.name}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={cn("text-sm", !message.isRead && "font-medium")}
                  >
                    {message.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {message.message}
                  </p>
                  {message.adminReply && (
                    <Badge variant="secondary" className="mt-1.5 text-[10px]">
                      Replied
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(message);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message detail + reply dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">{selectedMessage.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedMessage.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <p className="text-sm text-muted-foreground bg-secondary/50 rounded-md p-3">
                {selectedMessage.message}
              </p>

              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Reply className="h-3.5 w-3.5" />
                  Your Reply
                </p>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${selectedMessage.name}...`}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                <Button onClick={submitReply} disabled={!replyText.trim()}>
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the message from "
              {deleteTarget?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AdminMessagesPage;
