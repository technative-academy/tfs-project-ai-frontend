const AI_BASE_URL = "https://ai-project.technative.dev.f90.co.uk";
const AI_TEAM = "board-games";

const normalise = (query) => (query ? query.trim() : "");

// converts a value to a positive integer, or null
const positiveInteger = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

// builds the URL for the API
const buildAiUrl = (query, team) =>
  `${AI_BASE_URL}/ai/${encodeURIComponent(team)}?query=${encodeURIComponent(
    query
  )}`;

const buildTheProductsUrl = ({ team, query, sort, pageSize, page }) => {
  const url = new URL(`${AI_BASE_URL}/products/${encodeURIComponent(team)}`);
  const trimmedQuery = normalise(query);
  if (trimmedQuery) {
    url.searchParams.set("query", trimmedQuery);
  }
  if (typeof sort === "string" && sort.trim().length > 0) {
    url.searchParams.set("sort", sort.trim());
  }
  const safePageSize = positiveInteger(pageSize);
  if (safePageSize) {
    url.searchParams.set("page-size", String(safePageSize));
  }
  const safePage = positiveInteger(page);
  if (safePage) {
    url.searchParams.set("page", String(safePage));
  }
  return url.toString();
};

// parses the error message from the API
const parseErrorMessages = async (response) => {
  try {
    const data = await response.json();
    console.log("data:", data);
    if (data && typeof data.error === "string" && data.error.length > 0) {
      return data.error;
    }
  } catch (error) {}
  return `Response status: ${response.status}`;
};

// fetches results from the API
export const fetchAiResults = async ({ query, team = AI_TEAM }) => {
  const trimmedQuery = normalise(query);
  if (!trimmedQuery) {
    throw new Error("Query is required");
  }

  const response = await fetch(buildAiUrl(trimmedQuery, team), {
    method: "GET",
  });

  if (!response.ok) {
    const message = await parseErrorMessages(response);
    throw new Error(message);
  }

  const data = await response.json();
  if (!data || !Array.isArray(data.results)) {
    throw new Error("Unexpected response from the API!");
  }

  return data.results;
};

export const fetchProducts = async ({
  query,
  team = AI_TEAM,
  sort,
  pageSize,
  page,
} = {}) => {
  const response = await fetch(
    buildTheProductsUrl({ query, team, sort, pageSize, page }),
    { method: "GET" }
  );

  if (!response.ok) {
    const message = await parseErrorMessages(response);
    throw new Error(message);
  }

  const data = await response.json();
  const products = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data?.results)
    ? data.results
    : null;

  if (!products) {
    throw new Error("Unexpected response from Products API");
  }

  return products;
};

export { AI_BASE_URL, AI_TEAM };
