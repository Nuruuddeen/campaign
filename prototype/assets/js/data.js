/* ============================================================
   Sample data — ILLUSTRATIVE ONLY.
   Structural placeholders for design review. Not approved
   policies, commitments, costs, dates, or endorsements.
   The production system will load approved records from the
   database; this file exists only to drive the prototype UI.
   ============================================================ */

window.PROTO_DATA = {
  policies: [
    {
      id: "education-access",
      title: "Education access",
      category: "Education",
      summary:
        "Example record for documenting a proposed education initiative and its evidence.",
      issue:
        "Documented challenges in access to and quality of education. Supporting sources will be attached here (e.g. a relevant official education report).",
      proposedAction: "To be supplied and approved by the candidate.",
      evidence: "Attach a relevant official education report.",
      costFunding: "Pending documented assessment.",
      indicators: "To be defined after the proposal is specified.",
      status: "Demonstration record; not an official commitment.",
      publicationDate: "(sample date)"
    },
    {
      id: "agricultural-services",
      title: "Agricultural services",
      category: "Agriculture",
      summary:
        "Example record for documenting agricultural service options and their estimated costs.",
      issue:
        "Documented challenges in agricultural support services. Supporting sources will be attached here (e.g. a relevant official agricultural report).",
      proposedAction: "To be supplied and approved by the candidate.",
      evidence: "Attach a relevant official agricultural report.",
      costFunding: "Pending documented assessment.",
      indicators: "To be defined after the proposal is specified.",
      status: "Demonstration record; not an official commitment.",
      publicationDate: "(sample date)"
    },
    {
      id: "primary-healthcare",
      title: "Primary healthcare",
      category: "Healthcare",
      summary:
        "Example record for documenting proposed healthcare improvements and performance indicators.",
      issue:
        "Documented challenges in primary healthcare delivery. Supporting sources will be attached here (e.g. a relevant official health-sector report).",
      proposedAction: "To be supplied and approved by the candidate.",
      evidence: "Attach a relevant official health-sector report.",
      costFunding: "Pending documented assessment.",
      indicators: "To be defined after the proposal is specified.",
      status: "Demonstration record; not an official commitment.",
      publicationDate: "(sample date)"
    },
    {
      id: "public-infrastructure",
      title: "Public infrastructure",
      category: "Infrastructure",
      summary:
        "Example record for documenting infrastructure priorities and implementation considerations.",
      issue:
        "Documented challenges in public infrastructure. Supporting sources will be attached here (e.g. a relevant official infrastructure assessment).",
      proposedAction: "To be supplied and approved by the candidate.",
      evidence: "Attach a relevant official infrastructure assessment.",
      costFunding: "Pending documented assessment.",
      indicators: "To be defined after the proposal is specified.",
      status: "Demonstration record; not an official commitment.",
      publicationDate: "(sample date)"
    }
  ],
  categories: ["All", "Education", "Agriculture", "Healthcare", "Infrastructure"]
};
