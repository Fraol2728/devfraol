import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Command, ArrowRight } from "lucide-react";
import { searchData } from "@/config/searchData";

const isMac = () =>
  typeof navigator !== "undefined" &&
  (/Mac|iPod|iPhone|iPad/.test(navigator.platform) ||
    navigator.userAgentData?.platform === "macOS");

const SearchDialog = ({ iconOnly = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(searchData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mac, setMac] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMac(isMac());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (e.key === "Escape") setIsOpen(false);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
      }

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        navigate(results[selectedIndex].path);
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchData.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchLower),
          )
        );
      });
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults(searchData);
    }
  }, [searchQuery]);

  if (!isOpen) {
    if (iconOnly) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>
      );
    }

    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between gap-2 px-4 py-1.5 w-56 lg:w-72 xl:w-80 text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 hover:border-white/20"
      >
        <span className="flex items-center gap-2">
          <Search className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Search ...</span>
        </span>
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white/10 rounded flex-shrink-0">
          {mac ? (
            <>
              <Command className="w-3 h-3" />
              <span>K</span>
            </>
          ) : (
            <span>Ctrl+K</span>
          )}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
        <div className="inline-block w-full max-w-2xl mt-24 text-left align-middle transition-all transform">
          <div className="relative bg-gray-900 rounded-xl shadow-2xl">
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                className="w-full px-4 py-4 text-white bg-transparent border-0 focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <div className="flex items-center px-1.5 py-0.5 text-xs text-gray-400 bg-white/10 rounded">
                <span>Esc</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">
                  No results found.
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.path}
                      className={`w-full px-4 py-3 text-left hover:bg-white/5 flex items-center justify-between ${
                        index === selectedIndex ? "bg-white/10" : ""
                      }`}
                      onClick={() => {
                        navigate(result.path);
                        setIsOpen(false);
                      }}
                    >
                      <div>
                        <div className="text-white font-medium">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {result.description}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-gray-400 ${
                          index === selectedIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
