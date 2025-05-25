import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface EditorPaneProps {
  code: string;
  onChange: (newCode: string) => void;
}

const EditorPane: React.FC<EditorPaneProps> = ({ code, onChange }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-0 rounded-none">
      <div className="bg-gray-50 text-gray-700 px-4 py-3 text-sm font-medium flex items-center border-b border-gray-200">
        <span className="font-medium">HTML Editor</span>
        <div className="ml-auto text-xs text-gray-500">
          Auto-saving changes
        </div>
      </div>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-white border-0 focus:outline-none focus:ring-0 resize-none overflow-auto"
          spellCheck={false}
          wrap="off"
          placeholder="Edit your HTML code here..."
        />
      </CardContent>
    </Card>
  );
};

export default EditorPane;