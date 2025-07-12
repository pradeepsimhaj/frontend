import { RefreshCw } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const BackgroundType = {
  dots: "Dots",
  lines: "Lines",
  cross: "Cross",
};


const Navbar = () => {
  const { nodes, edges } = useAppContext();
  const [isErrorBoxShow, setIsErrorBoxShow] = useState(false);

  const {
      settings,
      setSettings,
    } = useAppContext();


  
    const BackgroundButtons = () => {
        return (
          <div className="flex gap-2">
            {Object.entries(BackgroundType).map(([type, value]) => (
              <button
                key={type}
                onClick={() =>
                  setSettings((prev) => ({ ...prev, backgroundType: type }))
                }
                className={`flex justify-center items-center ${
                  settings.backgroundType === type ? "bg-[#324B5A]" : "bg-[#1B3C53]"
                } text-white rounded-md p-2`}
              >
                {value}
              </button>
            ))}
          </div>
        );
      };


  const saveFlow = useCallback(() => {
    if(nodes.length === 1) {
      toast.error("Cannot save flow");
      setIsErrorBoxShow(true);
      return;
    }
    const nodesWithoutTarget = nodes.filter(node => {
      // Check if this node has any outgoing edges (as source)
      const hasOutgoingEdge = edges.some(edge => edge.source === node.id);
      return !hasOutgoingEdge;
    });

    if (nodesWithoutTarget.length > 1) {
      toast.error(`Cannot save flow`);
      setIsErrorBoxShow(true);
      return;
    }

    if (nodesWithoutTarget.length <= 0) {
      toast.error(`Cannot save flow`);
      setIsErrorBoxShow(true);
      return;
    }

    // If validation passes, proceed with save
    toast.success("Flow Saved Successfully");
    setIsErrorBoxShow(false);
  }, [nodes, edges]);

  return (
    <div className="relative">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '400',
          },
          error: {
            duration: 2000,
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
          },
          success: {
            background: '#F9F3EF',
            color: '#000',
            border: '2px solid #1B3C53',
            borderRadius: '8px',
          },
        }}
      />
      <div className="bg-gray-800 text-white">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">ChatBot Flow Builder</h1>
          <div className="flex items-center gap-4">
            <BackgroundButtons />
            </div>
          <button
            onClick={saveFlow}
            className="flex justify-center gap-2 items-center bg-white text-gray-800 font-semibold text-lg rounded-md px-2 py-2 ml-4 hover:bg-[#456882] hover:text-white transition-colors"
          >
            <RefreshCw size={18}/> Save
          </button>
        </div>
      </div>
    </div>
  );
};  

export default Navbar;