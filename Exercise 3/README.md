# ApplianceWatt — COS30045 Data Visualisation

A small multi-page website exploring household appliance energy use in Australia, built across
Exercise 0.2 (site foundations) and Exercise 3 (communicating data insights) for **COS30045
Data Visualisation**, Swinburne University of Technology.

**Pages**
- `index.html` — home page: why appliance running cost matters, FAQ accordion
- `televisions.html` — example TV models and an interactive running-cost calculator
- `story.html` — **Data Story**: the Exercise 3 storytelling deliverable, containing **two**
  independent data stories (see below)
- `about.html` — project background and GenAI use

---

## Data Story

`story.html` contains **two separate stories**, each answering a different subset of the three
data questions explored in Exercise 2, for a different audience, and each with its own six-beat
storyboard (Issue → Demonstrate issue → Dig deeper → Explain the factor → Before/after →
Recommendation), following the storyboard approach shown in the Week 3 lecture (Knaflic, 2015).

### Story 1 — "Bigger screen, bigger bill" (`#story-size`)

**Audience.** Everyday Australian shoppers weighing up a new television. They're not after a
spreadsheet — they want to know whether the size they're eyeing is "normal" and whether a bigger
screen meaningfully costs more to run.

**Questions answered (from Exercise 2).**
1. How frequent is each size of TV on the market?
2. How does screen size impact energy consumption?

**The story.** The market has quietly shifted: 75"+ is now the single most common size bracket
on the register (27% of models), ahead of the traditional "mid-size" 43"–54" bracket. Running
cost tracks screen size almost perfectly (r = 0.86), climbing from ~93 kWh/year for the smallest
sets to ~768 kWh/year for 75"+ sets. The story's before/after beat compares the cost of
defaulting to today's most common size (75"+, ~$231/year) against sizing to a typical living
room (55"–64", ~$115/year) — almost half the running cost for a still-large screen. It closes
with a "before you buy" checklist and a link to the running-cost calculator.

### Story 2 — "Does panel technology change the bill?" (`#story-tech`)

**Audience.** Shoppers choosing between LCD, LED-LCD and OLED, who are budget- or
eco-conscious and want to know whether the premium OLED panel carries a real running-cost
penalty.

**Question answered (from Exercise 2).**
3. How does screen type affect energy consumption? (including its two sub-questions: which
   panel type is most frequent, and what is the average screen size of each type)

**The story.** Raw averages make OLED (489 kWh/year) look like a clearly worse choice than LCD
(335 kWh/year). Digging deeper shows two confounds: LED-LCD dominates the market (81% of
models, vs 6% OLED), and OLED models registered for sale run far bigger on average (65.4" vs
51.0" for LCD) — and Story 1 already shows size alone drives most of the cost difference. The
fix is to compare panel types **within** the same size class (small/medium/large — the same
grouping method used to explore Data Question 3 in Exercise 2). Once matched for size, the gap
mostly disappears: in the medium class all three panel types sit within ~30 kWh/year of each
other, and in the large class — where most OLEDs actually sit — OLED (723 kWh/year) uses *less*
energy on average than LED-LCD (760 kWh/year). Only the small-screen OLED group looks notably
higher, and that group is just 17 models, too thin to generalise from. The story recommends
choosing panel type on picture quality and budget, not energy anxiety, and points back to Story
1 if running cost is the real priority.

---

## About the data

**Data source.** The dataset (`tv_2026_02_15.csv`) is an extract from the Australian
Government's Energy Rating regulatory register (`reg.energyrating.gov.au`), which lists
televisions registered under the *Greenhouse and Energy Minimum Standards (Televisions)
Determination 2013*. It is the same register manufacturers must submit to before a TV model can
be legally sold in Australia. The extract used here is dated 15 February 2026 and contains 4,724
raw model records with 32 fields (brand, model number, country sold in, screen size and area,
screen technology, standby/active power draw, star rating, and labelled annual energy
consumption, among others).

**Data processing.** All figures quoted in both stories were computed directly from
`tv_2026_02_15.csv` (the same file underlying `Exercise2.knwf`), following the same steps as the
Exercise 2 KNIME workflow:
- **Country filter.** Rows were filtered to the 4,522 models whose `SoldIn` field includes
  Australia (accepting the Australia / Australia+Fiji / Australia+NZ / Australia+Fiji+NZ
  combinations recorded in the register, and excluding the 202 models sold only in New Zealand
  or Fiji+New Zealand). *Note: this filter exists as a node in the Exercise 2 workflow, but it
  sat on a separate branch used only for the brand-frequency exploration — the screensize/energy
  charts in Exercise 2 were built from the unfiltered 4,724-row table. For the Data Story, the
  filter was applied consistently across every figure, since a story written for Australian
  shoppers should only describe TVs actually sold in Australia. This is the one substantive
  correction made while rebuilding this page for Exercise 3.*
- **Size conversion.** `screensize` (recorded in centimetres, diagonal) was converted to inches
  (× 0.393701) and rounded to the nearest whole inch, matching the Number Rounder step in the
  Exercise 2 workflow.
- **Size brackets (Story 1).** Rounded inches were bucketed into six market-standard brackets:
  Under 32", 32"–42", 43"–54", 55"–64", 65"–74", 75"+.
  **Size classes (Story 2).** The same rounded inches were also grouped into the three classes
  used in Exercise 2's Data Question 3 (small < 43", medium 43"–65", large > 65"), to allow a
  size-matched comparison across panel types.
- **Screen technology.** `Screen_Tech` register values were relabelled for readability: `LCD` →
  LCD, `LCD (LED)` → LED-LCD, `OLED` → OLED.
- **Summary figures.** Counts, means (energy by size bracket, energy and screen size by panel
  type, and energy by panel type within each size class) and the size↔energy correlation were
  computed from the filtered 4,522-row table in pandas and are the fixed numbers shown in the
  `story.html` charts.

**Privacy.** This is product registration data, not personal data — each row describes a TV
model that a manufacturer or importer is required to register, not an individual person or
household. No customer, purchaser, or household-level information is present anywhere in the
dataset, so none of the sensitive/personal-data categories covered in the Week 3.2 lecture
(name, address, biometric data, etc.) apply here.

**Accuracy and limitations.**
- Figures are *labelled* energy consumption under the standard AS/NZS 62087.1:2010 test method,
  not measured real-world household use — actual consumption depends on picture settings,
  ambient light, and viewing habits.
- The register captures models *submitted for sale*, not units actually sold — a screen size
  with many registered models isn't necessarily the size Australians buy most; it's the size
  manufacturers offer most.
- `Screen_Tech` collapses some manufacturing variation into three labels (LCD, LED-LCD, OLED),
  which is enough resolution for these stories but hides finer distinctions (e.g. Mini-LED, QLED
  branding) that the register itself doesn't separate out.
- Story 2's size-matched comparison is the fairer of the two views used, but the small-screen
  OLED group is only 17 models (versus 199 LCD and 594 LED-LCD) — that comparison point is
  flagged in the story itself as indicative rather than conclusive.
- Star ratings and the exact energy price (illustrative $0.30/kWh, matching the rest of the
  ApplianceWatt site) are indicative, not a substitute for checking the specific plan and model
  a reader is considering.

**Ethics.** Both stories deliberately avoid the "storytelling flattens the data" trap raised in
the Week 3.1 lecture (Katz, 2013; Krzywinski & Cairo, 2013). Story 2 in particular states its
headline claim (panel technology matters less than screen size once size is controlled for)
only after checking it against a size-matched breakdown, rather than reporting only the raw,
more dramatic-looking comparison — and it explicitly flags the one data point (small OLEDs)
where the sample is too small to trust. Neither story tells the reader exactly what to buy; both
give a running-cost pattern and a calculator, leaving the size/budget/picture-quality trade-off
to the reader.

---

## AI Declaration

Generative AI (Claude, Anthropic) was used across this project as follows:

- **Exercise 0.2 (site foundations):** Claude helped draft the initial HTML/CSS/JS structure for
  `index.html`, `televisions.html`, `about.html`, and the shared stylesheet/calculator script,
  which was then reviewed, tested, and adjusted.
- **Exercise 3 (these two Data Stories):** the site originally submitted a single combined story
  covering all three Exercise 2 questions. After feedback that the exercise required **two**
  separate stories, Claude was given the original site files, the Exercise 2 instructions, and
  the actual `Exercise2.knwf` KNIME workflow (including its embedded `tv_2026_02_15.csv`
  dataset). Claude opened the workflow to check how the data had actually been filtered and
  processed, and in doing so found that the size/energy figures used in the original story had
  not been computed from the real dataset and that the "sold in Australia" filter described in
  the README had not actually been applied to those figures. Claude recomputed every statistic
  used in both stories directly from `tv_2026_02_15.csv` in pandas, applying the Australia
  filter consistently and matching the size-conversion and rounding steps from the Exercise 2
  workflow, then rebuilt `story.html` as two independent stories (each with its own audience,
  storyboard, charts and recommendation), rewrote `assets/js/story-charts.js`, added the
  supporting CSS, and rewrote this README's Data Story / About the data / AI Declaration
  sections.
- All figures shown in both stories are derived directly from the dataset (not invented), and
  the narrative claims in Story 2 (that panel technology matters far less once screen size is
  controlled for) were checked against the size-matched breakdown before being written into the
  page, including flagging the one comparison (small-screen OLEDs) with too small a sample to
  generalise from.
- The storyboard structure for each story, the choice and grouping of charts, and the final
  wording were reviewed and are presented here as part of the submitted work.
