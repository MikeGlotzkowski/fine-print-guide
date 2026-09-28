# Concept

## The problem

US insurance is split into dozens of products with their own codes (HO-3, DP-3, CGL, BOP), coverage letters (A–F) and exclusions. People usually meet it at a stressful moment: after something happened, when a lender or landlord demands proof, or right after moving to the US. Existing sources are either accurate but dense (state department PDFs) or mixed with selling (comparison sites).

## Who it's for

1. **"I have a policy."** They want to know what it covers and doesn't, and what the codes mean.
2. **"Something happened."** They want the usual answer to "is this covered?" and what decides it.
3. **"My situation changed."** Newcomers to the US, renters, first-time buyers, people starting a business or hiring. They want to know what to sort out, in what order, and what's actually required.

The home page offers exactly these three doors. The full map of personal and business lines is a secondary link, not a fourth door, so first-time visitors aren't split across too many choices.

## Principles and how the site applies them

**Answer first (for readers who skim).** Most readers scan headings and first lines and stop once they have an answer. So every page opens with one plain sentence. Every example shows its verdict (usually covered / usually not / it depends) before the explanation. Headings carry the meaning ("Usually not covered"), not a teaser ("What about…?").

**Never hide the catch.** An NAIC study found readers stop at the first coverage statement and miss the exception after it. So "usually not covered" always sits next to "usually covered", never inside a fold. A test enforces this.

**Progressive disclosure, two levels at most.** Level 1 is the answer, the covered and not-covered lists, and the examples. Level 2 is the coverage parts, "Good to know" and scenario explanations, in native `<details>` with clear labels and an "Open all" button. Nothing is nested deeper.

**Jargon explained in place.** Insurance terms are dotted-underlined. Tapping one shows a short definition where you are; without JavaScript it links to the glossary.

**Concrete examples everywhere.** Each policy has real-life examples. Each peril has an example and a "watch for" note. The basics use worked numbers, such as a deductible on a $6,000 roof claim.

**Honest about uncertainty.** "Usually" means under a typical standard form. Health and immigration rules carry a date and point to HealthCare.gov. The wording avoids telling people what to buy ("higher limits cost more but protect more", not "you should"), because the site isn't a licensed adviser.

**Calm, not "template".** Warm paper background, one accent color, serif headings, no stock illustrations, gradients or emoji. Colored verdict badges always carry an icon and words too, not color alone.

## Structure

```
Home: three doors + the six basics
├── Personal: home and things · car · health, life and income · travel and pets · extra protection
├── Business: the basics (BOP, liability, property, income) · employees and management · vehicles, tools and data · professional work
├── Is it covered? (43 examples, filterable, grouped by area)
├── Situations (7 step-by-step guides with required/optional labels)
├── Basics · Perils · How to read your policy · The whole map · Glossary · Search · About
```

## Build and quality

- A dependency-free Node build renders the pages from data files. Every page of a kind has the same structure.
- It works without JavaScript. The script only adds definitions in place, filters, "Open all" and search.
- Tests check links and anchors, headings, the search index, and leftover markup. In a browser they run axe WCAG 2.1 AA checks in light and dark mode, check 360px phones for sideways scrolling, and exercise the interactive parts.
- The content was reviewed by an insurance-accuracy pass and a UX pass before release.
