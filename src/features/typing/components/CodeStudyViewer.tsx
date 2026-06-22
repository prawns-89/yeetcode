"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus, MessageSquare, Loader2, Save, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface SnippetNote {
  id: string;
  snippetId: string;
  lineIndex: number;
  note: string;
}

interface CodeStudyViewerProps {
  code: string;
  snippetId: string;
  language?: string;
}

export function CodeStudyViewer({
  code,
  snippetId,
  language = "C++",
}: CodeStudyViewerProps) {
  const [notes, setNotes] = useState<Record<number, SnippetNote>>({});
  const [loading, setLoading] = useState(true);
  const [editingLine, setEditingLine] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  const lines = code.split("\n");

  useEffect(() => {
    let mounted = true;
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/notes?snippetId=${encodeURIComponent(snippetId)}`);
        if (res.ok) {
          const data: SnippetNote[] = await res.json();
          if (mounted) {
            const notesMap: Record<number, SnippetNote> = {};
            data.forEach((note) => {
              notesMap[note.lineIndex] = note;
            });
            setNotes(notesMap);
          }
        }
      } catch (err) {
        console.error("Failed to fetch notes", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNotes();
    return () => {
      mounted = false;
    };
  }, [snippetId]);

  const handleEdit = (lineIndex: number) => {
    setEditingLine(lineIndex);
    setEditValue(notes[lineIndex]?.note || "");
  };

  const handleCancel = () => {
    setEditingLine(null);
    setEditValue("");
  };

  const handleSave = async (lineIndex: number) => {
    setSaving(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snippetId,
          lineIndex,
          note: editValue,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setNotes((prev) => {
          const next = { ...prev };
          if (data.deleted || !editValue.trim()) {
            delete next[lineIndex];
          } else {
            next[lineIndex] = data;
          }
          return next;
        });
        setEditingLine(null);
      }
    } catch (err) {
      console.error("Failed to save note", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lineIndex: number, id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotes((prev) => {
          const next = { ...prev };
          delete next[lineIndex];
          return next;
        });
      }
    } catch (err) {
      console.error("Failed to delete note", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full min-h-[32rem] flex-col rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-elevated">
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="rounded-md border border-border px-2 py-1 font-mono">
            {language}
          </span>
          <span>Study Mode</span>
        </div>
        <div className="text-sm text-muted">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading notes...
            </span>
          ) : (
            <span>{Object.keys(notes).length} notes</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-[#0d1117] font-mono text-sm leading-6">
        {lines.map((line, index) => {
          const isEditing = editingLine === index;
          const note = notes[index];
          const hasNote = !!note;

          return (
            <div key={index} className="group flex flex-col hover:bg-white/5 transition-colors rounded-md -mx-2 px-2 py-0.5">
              <div className="flex items-start">
                <div className="w-8 shrink-0 text-right pr-4 text-muted/50 select-none">
                  {index + 1}
                </div>
                <div className="flex-1 whitespace-pre break-all">
                  {line || " "}
                </div>
                <div className="w-8 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-muted hover:text-accent transition-colors p-1"
                      title={hasNote ? "Edit Note" : "Add Note"}
                    >
                      {hasNote ? <MessageSquare className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Note Display */}
              {hasNote && !isEditing && (
                <div className="mt-1 mb-2 ml-8 pl-3 border-l-2 border-accent/50 text-muted-foreground bg-accent/5 rounded-r-md p-2 text-sm font-sans flex justify-between items-start group/note">
                  <div className="whitespace-pre-wrap">{note.note}</div>
                  <div className="flex gap-2 opacity-0 group-hover/note:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-muted hover:text-accent p-1"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index, note.id)}
                      className="text-muted hover:text-danger p-1"
                      title="Delete"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Note Editor */}
              {isEditing && (
                <div className="mt-2 mb-3 ml-8 font-sans">
                  <textarea
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Write your note for this line..."
                    className="w-full min-h-[80px] bg-surface-elevated border border-border rounded-md p-3 text-sm focus:border-accent outline-none resize-y"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        handleSave(index);
                      } else if (e.key === "Escape") {
                        handleCancel();
                      }
                    }}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted">Ctrl+Enter to save, Esc to cancel</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={handleCancel} disabled={saving}>
                        <X className="w-4 h-4 mr-1.5" /> Cancel
                      </Button>
                      <Button onClick={() => handleSave(index)} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
                        Save Note
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
