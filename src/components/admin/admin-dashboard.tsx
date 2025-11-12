import { useState } from "react";
import { Headphones, Tag, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { HeadphonesTable } from "./headphone-table";
import { BrandsGrid } from "./brand-grid";
import { TypesGrid } from "./type-grid";

type TabType = "headphones" | "brands" | "types";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("headphones");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="glass glass-hover rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Headphone Admin
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your headphone inventory, brands, and categories
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="glass glass-hover border-glass-border bg-transparent"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="glass rounded-xl p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("headphones")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === "headphones"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Headphones className="h-4 w-4" />
              Headphones
              {/* <Badge variant="secondary" className="ml-1">
                8
              </Badge> */}
            </button>
            <button
              onClick={() => setActiveTab("brands")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === "brands"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Tag className="h-4 w-4" />
              Brands
              {/* <Badge variant="secondary" className="ml-1">
                5
              </Badge> */}
            </button>
            <button
              onClick={() => setActiveTab("types")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === "types"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
              Types
              {/* <Badge variant="secondary" className="ml-1">
                4
              </Badge> */}
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="glass rounded-xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-glass-border bg-transparent"
              />
            </div>
          </div>

          {activeTab === "headphones" && <HeadphonesTable />}
          {activeTab === "brands" && <BrandsGrid />}
          {activeTab === "types" && <TypesGrid />}
        </div>
      </div>
    </div>
  );
}
