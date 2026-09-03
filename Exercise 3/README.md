# ApplianceWatt — COS30045 Data Visualisation

A small multi-page website exploring household appliance energy use in Australia, built across
Exercise 0.2 (site foundations) and Exercise 3 (communicating data insights) for **COS30045
Data Visualisation**, Swinburne University of Technology.

**Pages**
- `index.html` — home page: why appliance running cost matters, FAQ accordion
- `televisions.html` — example TV models and an interactive running-cost calculator
- `story.html` — **Data Story**: the Exercise 3 storytelling deliverable (see below)
- `about.html` — project background and GenAI use

---

## Data Story

**Audience.** Everyday Australian shoppers weighing up a new television — the same audience the
rest of the ApplianceWatt site is written for. They're not after a spreadsheet; they want three
plain answers before they walk into a store: *what size is normal, how much more does a bigger
screen cost to run, and does the panel technology (LCD/LED-LCD/OLED) change that.*

**What they want to know.** Three questions carried over from Exercise 2's exploration of the
Australian TV energy register:

1. How frequent is each size of TV on the market?
2. How does screen size impact energy consumption?
3. How does screen type affect energy consumption?

**The story.** `story.html` walks through those three questions in order, each with its own
chart and a short "what this means" callout, then lands on one takeaway: **screen size — not
brand or panel technology — is what really drives a TV's running cost**, and stepping up a
single size bracket can add well over $100 a year to the power bill. The page closes with a
short "before you buy" checklist and a link back to the running-cost calculator on the
Televisions page, so the story ends in something the reader can actually use.

The storyboard for this page (audience → three questions → twist → call to action) was planned
before building, following the six-beat storyboard approach from the Week 3 lecture
(Knaflic, 2015).

---

## About the data

**Data source.** The dataset (`tv_2026_02_15.csv`) is an extract from the Australian
Government's Energy Rating regulatory register (`reg.energyrating.gov.au`), which lists
televisions registered under the *Greenhouse and Energy Minimum Standards (Televisions)
Determination 2013*. It is the same register manufacturers must submit to before a TV model can
be legally sold in Australia. The extract used here is dated 15 February 2026 and contains
4,724 model records with 32 fields (brand, model number, country sold in, screen size and area,
screen technology, standby/active power draw, star rating, and labelled annual energy
consumption, among others).

**Data processing.** Cleaning and shaping was done in KNIME (`Exercise2.knwf`) before this
story was written:
- Rows were filtered to models whose `SoldIn` field includes Australia (accepting the
  Australia / Australia+Fiji / Australia+NZ / Australia+Fiji+NZ combinations recorded in the
  register).
- Brand names (`Brand_Reg`) were cleaned and standardised — trimmed of stray characters and
  merged where the register listed inconsistent variants of the same brand (e.g. "samsung
  electronics" → "samsung") — before being used in brand-level grouping/counting views.
- The working table was narrowed to the columns needed for analysis (`screensize`,
  `Screen_Tech`, `Labelled energy consumption (kWh/year)`), then grouped, sorted and pivoted to
  produce the bar/pie/histogram/scatter views explored in Exercise 2.
- For the Data Story page, `screensize` (recorded in centimetres, diagonal) was converted to
  inches and bucketed into six market-standard size brackets (Under 32", 32"–42", 43"–54",
  55"–64", 65"–74", 75"+), and `Screen_Tech` values were grouped into three panel families
  (LCD, LED-LCD, OLED) matching the register's own category labels. Summary figures (counts,
  means, and the size↔energy correlation) were computed from the full 4,724-row cleaned table
  and are the fixed numbers shown in the `story.html` charts.

**Privacy.** This is product registration data, not personal data — each row describes a TV
model that a manufacturer or importer is required to register, not an individual person or
household. No customer, purchaser, or household-level information is present anywhere in the
dataset, so none of the sensitive/personal-data categories covered in the Week 3.2 lecture
(name, address, biometric data, etc.) apply here. The one privacy-adjacent judgement call was
brand-name cleaning: standardising near-duplicate brand strings could, in principle, make a
smaller brand's registration volume easier to read at a glance — a minor consideration for a
public regulatory register, but noted here in the spirit of the "who does this data affect"
question from the governance lecture.

**Accuracy and limitations.**
- Figures are *labelled* energy consumption under the standard AS/NZS 62087.1:2010 test
  method, not measured real-world household use — actual consumption depends on picture
  settings, ambient light, and viewing habits.
- The register captures models *submitted for sale*, not units actually sold — a screen size
  with many registered models isn't necessarily the size Australians buy most; it's the size
  manufacturers offer most.
- `Screen_Tech` collapses some manufacturing variation into three labels (LCD, LED-LCD, OLED),
  which is enough resolution for this story but hides finer distinctions (e.g. Mini-LED, QLED
  branding) that the register itself doesn't separate out.
- The per-inch energy comparison in the Q3 section is a simple ratio (average annual kWh ÷
  average screen inches per technology group), which is a reasonable normalisation for this
  story but isn't a controlled comparison — it doesn't hold brand, resolution, or refresh rate
  constant.
- Star ratings and the exact energy price (illustrative $0.30/kWh, matching the rest of the
  ApplianceWatt site) are indicative, not a substitute for checking the specific plan and model
  a reader is considering.

**Ethics.** The story deliberately avoids the "storytelling flattens the data" trap raised in
the Week 3.1 lecture (Katz, 2013; Krzywinski & Cairo, 2013): the headline claim (size drives
cost, panel technology doesn't add much on top) is checked against a size-normalised figure
(kWh per inch) before being stated, rather than only showing the raw comparison that looks more
dramatic. The recommendation section stops short of telling readers what to buy — it gives them
the running-cost pattern and a calculator, and leaves the size/budget trade-off to them.

---

## AI Declaration

Generative AI (Claude, Anthropic) was used across this project as follows:

- **Exercise 0.2 (site foundations):** Claude helped draft the initial HTML/CSS/JS structure
  for `index.html`, `televisions.html`, `about.html`, and the shared stylesheet/calculator
  script, which was then reviewed, tested, and adjusted.
- **Exercise 3 (this Data Story):** Claude was given the three data questions carried over from
  Exercise 2, the KNIME workflow, and the underlying CSV, and used them to compute the summary
  statistics quoted on `story.html` (size-bracket counts, average annual kWh by size and by
  screen technology, the size↔energy correlation, and the per-inch normalisation). Claude then
  drafted `story.html`, `assets/js/story-charts.js`, the CSS additions for the story page, and
  this README's Data Story / About the data / AI Declaration sections, matching the visual
  language already established in Exercise 0.2.
- All AI-assisted figures were derived directly from the provided dataset (not invented), and
  all narrative claims (e.g. "panel technology matters less than screen size") were checked
  against the underlying grouped statistics before being written into the page.
- The storyboard structure, the choice of the three charts, and the final wording were reviewed
  and are presented here as part of the submitted work.
