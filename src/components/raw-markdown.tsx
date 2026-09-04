"use client";

import CopyIcon from "@/components/ui/copy-icon";
import ExternalLinkIcon from "@/components/ui/external-link-icon";
import { Check } from "lucide-react";
import { useState } from "react";

interface RawMarkdownProps {
  slug: string;
  content: string;
}

export function RawMarkdown({ slug, content }: RawMarkdownProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-foreground">
        View Raw (for LLMs)
      </h3>
      <div className="space-y-2">
        <a
          href={`/api/posts/${slug}/raw`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLinkIcon size={16} />
          View raw markdown
        </a>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-start"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon size={16} />
              Copy raw content
            </>
          )}
        </button>
      </div>
    </div>
  );
}
