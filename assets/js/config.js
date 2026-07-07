// ============================================================
// Site configuration.
//
// The site is progressive: it is fully functional as a static
// page (GitHub Pages / S3) and upgrades itself when the AWS
// serverless backend is deployed. After `terraform apply`,
// paste the output URLs below (the CI pipeline can also inject
// them — see .github/workflows/deploy-aws.yml).
// ============================================================
window.SITE_CONFIG = {
  githubUser: "Ben-levi",
  repo: "Ben-levi/Ben-levi",

  // Lambda Function URL of the BenBot chat backend ("" = offline fallback mode)
  chatApiUrl: "",

  // Lambda Function URL of the status endpoint (live AWS cost + metrics)
  statusApiUrl: "",

  // URL of the aggregated news feed produced by the news pipeline.
  // Falls back to the Hacker News Algolia API (CORS-enabled) when empty.
  newsFeedUrl: "",

  // Repos to pin first in the projects grid (order preserved)
  featuredRepos: ["AWS_APP", "Ben-levi"],

  // YouTube video IDs for the demos section ("" entries render a placeholder)
  videos: [
    { id: "", title: "🎥 AWS To-Do App — architecture & live demo walkthrough" },
    { id: "", title: "🎥 This portfolio's CI/CD pipeline — from git push to CloudFront" },
  ],
};
