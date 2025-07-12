import React, { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";

const MessageNode = ({ id, data, type }) => {
  const { getEdges } = useReactFlow();
  const [message, setMessage] = useState(data.message);
  const { selectedNode, setSelectedNode, setActivePane, setIsSidebarOpen, nodes } = useAppContext();

  const isValidSourceConnection = (connection) => {
    const edges = getEdges();
    const hasSourceConnection = edges.some(edge => edge.source === id);
    return !hasSourceConnection;
  };

  useEffect(() => {
    if (selectedNode?.id === id) {
      setActivePane('settings');
    }
  }, [selectedNode, id, setActivePane]);

  // Update local message when node data changes
  useEffect(() => {
    const node = nodes.find(n => n.id === id);
    if (node) {
      setMessage(node.data.message);
    }
  }, [nodes, id]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: "10px", height: "10px", background: "#FF6347" }}
      />
      
      <div 
        className={`flex flex-col rounded-md w-[200px] h-full ${
          selectedNode?.id === id ? 'bg-[#E6DFD8]' : 'bg-[#F9F3EF]'
        } border-2 border-[#1B3C53] gap-1`}
        onClick={() => {
          setSelectedNode({ id, data: { ...data, message } });
          setIsSidebarOpen(true);
          setActivePane('settings');
        }}
      >
        <div className="flex bg-[#456882] rounded-x-md text-gray-100 text-m border-b-2 border-[#1B3C53] justify-start items-center px-2 py-1 gap-1">
          <MessageSquare size={16} className="text-gray-100" />
          <span> {type}</span>
        </div>
        <div className="flex flex-wrap px-2 py-3 text-sm w-full h-full rounded-b-md">
          {message}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isValidConnection={isValidSourceConnection}
        style={{ width: "10px", height: "10px", background: "#32CD32" }}
      />
    </>
  );
};

export default MessageNode;
