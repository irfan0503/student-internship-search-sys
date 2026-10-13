"use client";

import {
  ArrowDownWideNarrow,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { Internship } from "@/lib/internships";

type View = "discover" | "saved";
type CategoryFilter = "All roles" | "Engineering" | "Design" | "Product" | "Marketing";

const categories: CategoryFilter[] = ["All roles", "Engineering", "Design", "Product", "Marketing"];
const modes = ["Any work mode", "Remote", "Hybrid", "On-site"] as const;

function postedLabel(days: number) {
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("discover");
  const [category, setCategory] = useState<CategoryFilter>("All roles");
  const [mode, setMode] = useState<(typeof modes)[number]>("Any work mode");
  const [sort, setSort] = useState("recent");
  const [paidOnly, setPaidOnly] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [locationDraft, setLocationDraft] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedLoaded, setSavedLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const savedIdsKey = activeView === "saved" ? savedIds.join(",") : "";

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem("fieldwork:saved") ?? "[]");
      if (Array.isArray(stored)) {
        setSavedIds(stored.filter((id): id is string => typeof id === "string"));
      }
    } catch {
      setSavedIds([]);
    }
    setSavedLoaded(true);
  }, []);

  useEffect(() => {
    if (savedLoaded) {
      window.localStorage.setItem("fieldwork:saved", JSON.stringify(savedIds));
    }
  }, [savedIds, savedLoaded]);

  useEffect(() => {
    if (activeView === "saved" && !savedLoaded) return;

    const controller = new AbortController();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    if (category !== "All roles") params.set("category", category);
    if (mode !== "Any work mode") params.set("mode", mode);
    if (paidOnly) params.set("paid", "true");
    if (sort === "pay") params.set("sort", "pay");
    if (activeView === "saved") {
      params.set("savedOnly", "true");
      params.set("ids", savedIdsKey);
    }

    setIsLoading(true);
    setError("");
    fetch(`/api/internships?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("The listings could not be loaded.");
        return (await response.json()) as { internships: Internship[] };
      })
      .then((data) => setInternships(data.internships))
      .catch((fetchError: unknown) => {
        if (fetchError instanceof Error && fetchError.name === "AbortError") return;
        setError("We couldn’t load the listings. Try again in a moment.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [activeView, category, location, mode, paidOnly, query, savedIdsKey, savedLoaded, sort]);

  useEffect(() => {
    if (!selectedInternship) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedInternship(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedInternship]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(searchDraft.trim());
    setLocation(locationDraft.trim());
  }

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }

  function clearFilters() {
    setSearchDraft("");
    setLocationDraft("");
    setQuery("");
    setLocation("");
    setCategory("All roles");
    setMode("Any work mode");
    setPaidOnly(false);
    setSort("recent");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="Fieldwork home">
          <span className="brand-symbol"><Compass size={19} strokeWidth={2.1} /></span>
          <span>fieldwork<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button
            className={`nav-item ${activeView === "discover" ? "active" : ""}`}
            onClick={() => setActiveView("discover")}
            aria-current={activeView === "discover" ? "page" : undefined}
          >
            <BriefcaseBusiness size={17} />
            <span>Discover</span>
            <span className="nav-count">12</span>
          </button>
          <button
            className={`nav-item ${activeView === "saved" ? "active" : ""}`}
            onClick={() => setActiveView("saved")}
            aria-current={activeView === "saved" ? "page" : undefined}
          >
            <Bookmark size={17} />
            <span>Saved roles</span>
            <span className="nav-count">{savedIds.length}</span>
          </button>
        </nav>

        <div className="sidebar-season">
          <div className="season-icon"><GraduationCap size={18} /></div>
          <span className="season-overline">YOUR NEXT CHAPTER</span>
          <strong>Make this season count.</strong>
          <span className="season-caption">Spring · Summer 2026</span>
          <div className="season-mark" aria-hidden="true">FW<span>26</span></div>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar" aria-hidden="true">JM</div>
          <div className="profile-copy"><strong>Jordan Miller</strong><span>Student account</span></div>
          <span className="profile-status" aria-label="Online" />
        </div>
      </aside>

      <main className="workspace" id="top">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{activeView === "saved" ? "Saved roles" : "Discover"}</strong></div>
          <div className="topbar-right"><span className="season-pill"><span /> FALL 2026 INTAKE</span><button className="avatar-small" aria-label="Jordan Miller profile">JM</button></div>
        </header>

        <div className="content-wrap">
          <section className="intro-row">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> INTERNSHIP BOARD <span>·</span> 2026</div>
              <h1>{activeView === "saved" ? "Your shortlist." : "Good work starts here."}</h1>
              <p className="intro-copy">{activeView === "saved" ? "A considered list of roles for your next chapter." : "A handpicked starting point for what comes next."}</p>
            </div>
            <div className="intro-note"><span className="note-rule" /><span>12 curated opportunities<br />across 4 disciplines</span></div>
          </section>

          <form className="search-form" onSubmit={submitSearch}>
            <label className="search-field role-search">
              <Search size={19} aria-hidden="true" />
              <span className="visually-hidden">Search by role, company, or skill</span>
              <input value={searchDraft} onChange={(event) => setSearchDraft(event.target.value)} placeholder="Role, company, or skill" />
              {searchDraft && <button type="button" className="clear-search" aria-label="Clear role search" onClick={() => setSearchDraft("")}><X size={16} /></button>}
            </label>
            <span className="search-divider" />
            <label className="search-field location-search">
              <MapPin size={18} aria-hidden="true" />
              <span className="visually-hidden">City, state, or remote</span>
              <input value={locationDraft} onChange={(event) => setLocationDraft(event.target.value)} placeholder="City, state, or remote" />
            </label>
            <button className="search-submit" type="submit"><Search size={17} /><span>Search roles</span></button>
          </form>

          <div className="category-row" role="group" aria-label="Filter by discipline">
            {categories.map((item) => (
              <button key={item} className={`category-tab ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>
                {item}
                {item === "All roles" && <span className="category-count">12</span>}
              </button>
            ))}
          </div>

          <section className="results-section" aria-live="polite">
            <div className="results-heading">
              <div className="results-title-wrap">
                <span className="results-kicker"><SlidersHorizontal size={14} /> THE BOARD</span>
                <h2>{activeView === "saved" ? "Saved internships" : "Open internships"}<span className="results-total">{isLoading ? "…" : internships.length}</span></h2>
              </div>
              <div className="results-controls">
                <label className="mode-select-wrap">
                  <span className="visually-hidden">Work mode</span>
                  <select value={mode} onChange={(event) => setMode(event.target.value as (typeof modes)[number])}>
                    {modes.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  <ChevronDown size={15} aria-hidden="true" />
                </label>
                <label className="paid-filter"><input type="checkbox" checked={paidOnly} onChange={(event) => setPaidOnly(event.target.checked)} /><span className="checkmark"><Check size={12} /></span><span>Paid only</span></label>
                <label className="sort-select-wrap">
                  <ArrowDownWideNarrow size={15} aria-hidden="true" />
                  <span className="visually-hidden">Sort internships</span>
                  <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Most recent</option><option value="pay">Highest pay</option></select>
                  <ChevronDown size={14} aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className="sample-note"><span className="sample-dot" /> DEMO DATA <span className="sample-separator">/</span> Sample roles are illustrative, not live postings.</div>

            {error ? (
              <div className="state-panel"><div className="state-icon error-icon"><X size={19} /></div><h3>That search didn’t come through.</h3><p>{error}</p><button className="text-action" onClick={clearFilters}>Reset search <ArrowUpRight size={15} /></button></div>
            ) : isLoading ? (
              <div className="role-list" aria-label="Loading internships"><div className="skeleton-card" /><div className="skeleton-card" /><div className="skeleton-card" /></div>
            ) : internships.length ? (
              <div className="role-list">
                {internships.map((internship, index) => {
                  const isSaved = savedIds.includes(internship.id);
                  return (
                    <article className="role-card" key={internship.id} style={{ animationDelay: `${index * 45}ms` }}>
                      <div className={`company-mark tone-${internship.brandTone}`} aria-hidden="true">{internship.brand}</div>
                      <div className="role-card-content">
                        <div className="role-card-title-row">
                          <button className="role-title" onClick={() => setSelectedInternship(internship)}>{internship.title}</button>
                          <span className="posted-label">{postedLabel(internship.postedDaysAgo)}</span>
                        </div>
                        <div className="company-line"><strong>{internship.company}</strong><span className="company-dot" />{internship.employment}<span className="company-dot" />{internship.duration}</div>
                        <p className="role-summary">{internship.summary}</p>
                        <div className="role-tags">{internship.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                        <div className="role-card-meta"><span><MapPin size={14} />{internship.location}</span><span className={`mode-label mode-${internship.mode.toLowerCase().replace("-", "")}`}>{internship.mode}</span><span><Clock3 size={14} />{internship.stipend}</span></div>
                      </div>
                      <button className={`save-button ${isSaved ? "is-saved" : ""}`} onClick={() => toggleSaved(internship.id)} aria-label={isSaved ? `Remove ${internship.title} from saved roles` : `Save ${internship.title}`} title={isSaved ? "Remove from saved roles" : "Save role"}>
                        {isSaved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="state-panel"><div className="state-icon"><Bookmark size={19} /></div><h3>{activeView === "saved" ? "Your shortlist is clear." : "No roles match this search."}</h3><p>{activeView === "saved" ? "Saved roles will show up here." : "Try a broader title, location, or discipline."}</p><button className="text-action" onClick={activeView === "saved" ? () => setActiveView("discover") : clearFilters}>{activeView === "saved" ? "Explore internships" : "Clear filters"} <ArrowUpRight size={15} /></button></div>
            )}

            {!isLoading && !error && internships.length > 0 && <div className="list-footer"><span><span className="footer-spark">✳</span> Thoughtful work. Real experience.</span><span>SHOWING {internships.length} OF 12</span></div>}
          </section>

          <footer className="page-footer"><span>FIELDWORK <span>© 2026</span></span><span>Made for the in-between, and what comes after.</span><a href="mailto:hello@fieldwork.example">CONTACT <ArrowUpRight size={12} /></a></footer>
        </div>
      </main>

      {selectedInternship && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedInternship(null); }}>
          <section className="role-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <button className="dialog-close" onClick={() => setSelectedInternship(null)} aria-label="Close internship details"><X size={19} /></button>
            <div className={`company-mark dialog-mark tone-${selectedInternship.brandTone}`} aria-hidden="true">{selectedInternship.brand}</div>
            <span className="dialog-eyebrow">{selectedInternship.category} · {selectedInternship.mode}</span>
            <h2 id="dialog-title">{selectedInternship.title}</h2>
            <p className="dialog-company">{selectedInternship.company} <span className="company-dot" /> {selectedInternship.location}</p>
            <p className="dialog-summary">{selectedInternship.summary}</p>
            <div className="dialog-facts"><div><span>COMPENSATION</span><strong>{selectedInternship.stipend}</strong></div><div><span>TERM</span><strong>{selectedInternship.duration}</strong></div><div><span>EMPLOYMENT</span><strong>{selectedInternship.employment}</strong></div></div>
            <div className="dialog-skills">{selectedInternship.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <a className="company-link" href={selectedInternship.companyUrl} target="_blank" rel="noreferrer">Explore {selectedInternship.company} careers <ArrowUpRight size={17} /></a>
            <p className="dialog-disclaimer">This sample listing is illustrative. Confirm current openings and details with the employer.</p>
          </section>
        </div>
      )}
    </div>
  );
}