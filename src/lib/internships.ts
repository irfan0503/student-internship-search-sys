export type InternshipCategory = "Engineering" | "Design" | "Product" | "Marketing";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type BrandTone = "mint" | "blue" | "peach" | "yellow" | "pink" | "ink";

export type Internship = {
  id: string;
  title: string;
  company: string;
  brand: string;
  brandTone: BrandTone;
  location: string;
  mode: WorkMode;
  category: InternshipCategory;
  employment: string;
  duration: string;
  stipend: string;
  hourlyPay: number;
  postedDaysAgo: number;
  summary: string;
  skills: string[];
  companyUrl: string;
};

export const internships: Internship[] = [
  {
    id: "stripe-software-engineer",
    title: "Software Engineer Intern",
    company: "Stripe",
    brand: "S",
    brandTone: "ink",
    location: "San Francisco, CA",
    mode: "Hybrid",
    category: "Engineering",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$52–58 / hr",
    hourlyPay: 55,
    postedDaysAgo: 1,
    summary: "Build reliable payments infrastructure alongside the teams shaping internet commerce.",
    skills: ["TypeScript", "APIs", "Distributed systems"],
    companyUrl: "https://stripe.com/jobs",
  },
  {
    id: "figma-product-design",
    title: "Product Design Intern",
    company: "Figma",
    brand: "f",
    brandTone: "pink",
    location: "New York, NY",
    mode: "Hybrid",
    category: "Design",
    employment: "Full-time",
    duration: "10 weeks",
    stipend: "$42–48 / hr",
    hourlyPay: 45,
    postedDaysAgo: 2,
    summary: "Help make collaborative tools feel more intuitive, inclusive, and a little more joyful.",
    skills: ["Figma", "Prototyping", "User research"],
    companyUrl: "https://www.figma.com/careers/",
  },
  {
    id: "duolingo-growth-marketing",
    title: "Growth Marketing Intern",
    company: "Duolingo",
    brand: "D",
    brandTone: "mint",
    location: "Pittsburgh, PA",
    mode: "On-site",
    category: "Marketing",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$28–32 / hr",
    hourlyPay: 30,
    postedDaysAgo: 3,
    summary: "Turn creative experiments into learning experiences used around the world.",
    skills: ["Analytics", "Campaigns", "Experimentation"],
    companyUrl: "https://careers.duolingo.com/",
  },
  {
    id: "notion-product-operations",
    title: "Product Operations Intern",
    company: "Notion",
    brand: "N",
    brandTone: "yellow",
    location: "San Francisco, CA",
    mode: "Hybrid",
    category: "Product",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$40–46 / hr",
    hourlyPay: 43,
    postedDaysAgo: 4,
    summary: "Connect customer insights to the systems that help product teams do their best work.",
    skills: ["Research", "SQL", "Roadmapping"],
    companyUrl: "https://www.notion.com/careers",
  },
  {
    id: "adobe-frontend-engineer",
    title: "Frontend Engineering Intern",
    company: "Adobe",
    brand: "A",
    brandTone: "peach",
    location: "Seattle, WA",
    mode: "Hybrid",
    category: "Engineering",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$38–44 / hr",
    hourlyPay: 41,
    postedDaysAgo: 5,
    summary: "Ship accessible creative tools used by designers, artists, and storytellers.",
    skills: ["React", "CSS", "Accessibility"],
    companyUrl: "https://careers.adobe.com/",
  },
  {
    id: "shopify-product-design",
    title: "Product Design Intern, Checkout",
    company: "Shopify",
    brand: "S",
    brandTone: "mint",
    location: "Remote, North America",
    mode: "Remote",
    category: "Design",
    employment: "Full-time",
    duration: "16 weeks",
    stipend: "$36–42 / hr",
    hourlyPay: 39,
    postedDaysAgo: 6,
    summary: "Explore how thoughtful checkout experiences help independent businesses grow.",
    skills: ["Interaction design", "Commerce", "Prototyping"],
    companyUrl: "https://www.shopify.com/careers",
  },
  {
    id: "canva-brand-marketing",
    title: "Brand Marketing Intern",
    company: "Canva",
    brand: "C",
    brandTone: "blue",
    location: "Austin, TX",
    mode: "Hybrid",
    category: "Marketing",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$30–35 / hr",
    hourlyPay: 32,
    postedDaysAgo: 7,
    summary: "Bring a global creative community closer through memorable, useful campaigns.",
    skills: ["Brand strategy", "Writing", "Social media"],
    companyUrl: "https://www.canva.com/careers/",
  },
  {
    id: "spotify-data-engineer",
    title: "Data Engineering Intern",
    company: "Spotify",
    brand: "S",
    brandTone: "mint",
    location: "New York, NY",
    mode: "Hybrid",
    category: "Engineering",
    employment: "Full-time",
    duration: "10 weeks",
    stipend: "$40–48 / hr",
    hourlyPay: 44,
    postedDaysAgo: 8,
    summary: "Make the data foundations behind discovery and listening experiences more powerful.",
    skills: ["Python", "SQL", "Data pipelines"],
    companyUrl: "https://www.lifeatspotify.com/jobs",
  },
  {
    id: "airtable-product-intern",
    title: "Associate Product Intern",
    company: "Airtable",
    brand: "A",
    brandTone: "peach",
    location: "San Francisco, CA",
    mode: "Remote",
    category: "Product",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$38–44 / hr",
    hourlyPay: 41,
    postedDaysAgo: 9,
    summary: "Help teams turn their most important workflows into products people love using.",
    skills: ["Customer interviews", "Analytics", "Communication"],
    companyUrl: "https://www.airtable.com/careers",
  },
  {
    id: "webflow-software-intern",
    title: "Software Engineering Intern",
    company: "Webflow",
    brand: "W",
    brandTone: "blue",
    location: "Remote, US",
    mode: "Remote",
    category: "Engineering",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$35–40 / hr",
    hourlyPay: 37,
    postedDaysAgo: 10,
    summary: "Help creators build for the web with tools that make code feel more approachable.",
    skills: ["JavaScript", "React", "Testing"],
    companyUrl: "https://webflow.com/careers",
  },
  {
    id: "headspace-content-design",
    title: "Content Design Intern",
    company: "Headspace",
    brand: "H",
    brandTone: "yellow",
    location: "Los Angeles, CA",
    mode: "Hybrid",
    category: "Design",
    employment: "Full-time",
    duration: "10 weeks",
    stipend: "$29–34 / hr",
    hourlyPay: 31,
    postedDaysAgo: 11,
    summary: "Shape clear, compassionate product language that helps people build healthy habits.",
    skills: ["UX writing", "Content strategy", "Research"],
    companyUrl: "https://www.headspace.com/careers",
  },
  {
    id: "khan-academy-product-marketing",
    title: "Product Marketing Intern",
    company: "Khan Academy",
    brand: "K",
    brandTone: "ink",
    location: "Remote, US",
    mode: "Remote",
    category: "Marketing",
    employment: "Full-time",
    duration: "12 weeks",
    stipend: "$26–31 / hr",
    hourlyPay: 28,
    postedDaysAgo: 12,
    summary: "Make free, world-class education easier for learners and teachers to discover.",
    skills: ["Messaging", "Education", "Go-to-market"],
    companyUrl: "https://www.khanacademy.org/careers",
  },
];

export function searchInternships(params: URLSearchParams): Internship[] {
  const query = params.get("q")?.trim().toLowerCase() ?? "";
  const location = params.get("location")?.trim().toLowerCase() ?? "";
  const category = params.get("category") ?? "";
  const mode = params.get("mode") ?? "";
  const paidOnly = params.get("paid") === "true";
  const savedOnly = params.get("savedOnly") === "true";
  const savedIds = new Set((params.get("ids") ?? "").split(",").filter(Boolean));

  const results = internships.filter((internship) => {
    const searchableText = [
      internship.title,
      internship.company,
      internship.category,
      internship.location,
      internship.summary,
      ...internship.skills,
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || searchableText.includes(query)) &&
      (!location || internship.location.toLowerCase().includes(location)) &&
      (!category || internship.category === category) &&
      (!mode || internship.mode === mode) &&
      (!paidOnly || internship.hourlyPay > 0) &&
      (!savedOnly || savedIds.has(internship.id))
    );
  });

  if (params.get("sort") === "pay") {
    results.sort((first, second) => second.hourlyPay - first.hourlyPay);
  } else {
    results.sort((first, second) => first.postedDaysAgo - second.postedDaysAgo);
  }

  return results;
}