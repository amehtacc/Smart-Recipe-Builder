import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownPreview({ markdown }) {
  const renderedMarkdown = useMemo(() => {
    return markdown || "*No instructions added yet*";
  }, [markdown]);

  return (
    <div>
      <ReactMarkdown>{renderedMarkdown}</ReactMarkdown>
    </div>
  );
}

export default MarkdownPreview;
