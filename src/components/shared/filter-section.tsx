"use client";

import { Search, Filter, X } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  filterOptions: {
    label: string;
    key: string;
    options: FilterOption[];
  }[];
  activeFilters?: Record<string, string>;
  placeholder?: string;
}

export function FilterSection({ 
  onSearch, 
  onFilterChange, 
  filterOptions, 
  activeFilters: externalFilters,
  placeholder = "Search..." 
}: FilterSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const activeFilters = externalFilters || internalFilters;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterSelect = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (value === "all") {
      delete newFilters[key];
    }
    
    if (!externalFilters) {
      setInternalFilters(newFilters);
    }
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    if (!externalFilters) {
      setInternalFilters({});
    }
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        <div className="relative group flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder} 
            className="h-12 w-full pl-12 pr-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm"
          />
        </div>
        <Button 
          variant={isFilterOpen ? "default" : "outline"}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`h-12 rounded-2xl font-bold px-6 transition-all ${isFilterOpen ? 'shadow-lg shadow-primary/20' : 'border-slate-200'}`}
        >
          <Filter className="h-5 w-5 mr-2" /> 
          Filters
          {Object.keys(activeFilters).length > 0 && (
            <span className="ml-2 bg-white text-primary rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-black">
              {Object.keys(activeFilters).length}
            </span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-4xl bg-slate-50 border border-slate-100 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterOptions.map((section) => (
                <div key={section.key} className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">{section.label}</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterSelect(section.key, "all")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        !activeFilters[section.key] 
                          ? 'bg-primary text-white shadow-md shadow-primary/20' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/50'
                      }`}
                    >
                      All
                    </button>
                    {section.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterSelect(section.key, option.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          activeFilters[section.key] === option.value
                            ? 'bg-primary text-white shadow-md shadow-primary/20' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-rose-500 font-bold"
                >
                  <X className="h-4 w-4 mr-2" /> Clear All Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
